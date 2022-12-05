# importing module
from pandas import *
 
# reading CSV file
data = read_csv("Schools.csv")
 
# converting column data to list
schools = data['Schools'].tolist()
 
# printing list data
print(schools)

