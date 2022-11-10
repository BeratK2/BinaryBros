import React, { useState, useEffect} from 'react'
import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'

const ChatDisplay = ({user, clickedUser}) => {
  const userId = user?.user_id
  const clickedUserId = clickedUser?.user_id
  const [usersMessages, setUsersMessages] = useState(null)

  console.log(userId);
  
  /*
  const getUsersMessages = async () => {
    try{
      const response = await axios.get('http://localhost:8000/messages', {
      params: {userId: userId, correspondingUserId: clickedUserId}
    })
    setUsersMessages(response.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getUsersMessages()
  }, [])

  console.log(usersMessages);
*/
  return (
    <>
        <Chat/>
        <ChatInput/>
    </>
  
  )
}

export default ChatDisplay