const port = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const uri =
 process.env.URI;
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello to my app");
});

//Sign up route
app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);

  //Get email and password from user response
  const { email, password } = req.body;

  //Generate user id randomly
  const generateduserID = uuidv4();

  //Encrypt user's submitted password
  const hashedpassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    //Check if there's a user with this email and throw an error if so
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    const sanitizedEmail = email.toLowerCase();

    //Data to insert into database
    const data = {
      user_id: generateduserID,
      email: sanitizedEmail,
      hashed_password: hashedpassword,
    };

    //Insert data into database
    const insertedUser = await users.insertOne(data);


    //Generate JWT token with response
    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ token, userId: generateduserID });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});


//Login route
app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ email });

    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: user.user_id });
    }
    res.status(400).json("Invalid Credentials");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
});


// Get individual User
app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});


//Add match to user's array
app.put("/addmatch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };

    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});


//Get users
app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();
    res.send(foundUsers);
  } finally {
    await client.close();
  }
});

//Route to get filtered users by school
app.get("/school-users", async (req, res) => {
  const client = new MongoClient(uri);
  const mySchool = req.query.school;

  try {
    //Connect to database and assign users to a variable
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const query = { school: { $eq: mySchool } };
    const foundUsers = await users.find(query).toArray();

    //Get all users and return them as an array
    res.json(foundUsers);

    console.log(foundUsers);
  } finally {
    await client.close();
  }
});


//Update user details 
app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };

    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
        school: formData.school
      },
    };

    const insertedUser = await users.updateOne(query, updateDocument);

    res.json(insertedUser);
  } finally {
    await client.close();
  }
});


//Get messages based on corresponding user
app.get("/messages", async (req, res) => {
  const { userId, correspondingUserId } = req.query;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };
    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } finally {
    await client.close();
  }
});


//Create a new message
app.post('/message', async (req, res) => {
    const client = new MongoClient(uri)
    const message = req.body.message

    try{
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')
        const insertedMessage = await messages.insertOne(message)
        res.send(insertedMessage)
    } finally{
        await client.close()
    }
})

app.listen(port, () => console.log("Server running on port " + port));
