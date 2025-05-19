# webProject

Product Management System (PMS)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Introduction
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Product Management System (PMS) is a full-stack CRUD web application developed using Node.js, Express, MongoDB, and Vanilla JavaScript (ES6). The system allows users to Create, Read, Update, and Delete product records with real-
time UI feedback, built-in total price calculations, and search capabilities.


Key Features
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-Product Management – Add, edit, and delete product entries.

-Real-time UI Updates – Immediate reflection of changes in the product table.

-Search Functionality – Dynamic filtering by title or category.

-Database-Driven – Integrated with MongoDB Atlas instead of local storage.

-Price Calculator – Automatically calculates total based on price, ads, taxes, and discount.

-RESTful API – Backend API built with Express.js.


Installation Guide
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Prerequisites
-Node.js (Latest LTS version)
-MongoDB (Local or Atlas Cloud)


Usage Guide
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Running the Application

1 Start the backend: npm start
2 Open http://localhost:5000 in the browser
3 Perform CRUD operations:

Create a product – Fill the form & click Create.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1-View products – Products appear in the table.
2-Update a product – Click Update, modify details, and save.
3-Delete a product – Click Delete next to any product.
4-Search – Use Search by Title or Search by Category.

API Documentation
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Base URL: http://localhost:5000

Method	Endpoint	Description
GET	        /api/products	       Get all products
POST	      /api/products	       Add new product
PUT	        /api/products/:id	   Update product by ID
DELETE    	/api/products/:id	   Delete product by ID


Chalenges and Soluations 
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1. Search Not Working After MongoDB Integration

-Problem: After integrating MongoDB, the search-by-title/category stopped.
-Cause: The frontend logic wasn't properly updated to sync with the database results.
   Fix:
-Restored the GetSearchMood() function and added JavaScript-based filtering to dynamically update the interface.

2. Problem: Team Members Unable to Access MongoDB Database

-Cause: the admin didn’t gave all users permission to access data 
   Fix: 
-Give all users permissions for the database they are trying to access
-Ensure the user’s IP is added to the MongoDB access list.

Contributors
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Student Name	               University ID
Omar Samir Salman Mansour	   443018814
Saud Mashary Aldlabahy 	     444001811
Abdullah Rasheed Altamimi	   443022779
Yasir Fahad Alateeq	         444002716
Omer Adel Elfaki	           443019505

