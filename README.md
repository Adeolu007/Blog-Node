
**Description**
This project implements a basic blog application using Node.js, Express.js, and MongoDB. It allows users to create posts, add comments to posts, and manage user accounts.

**Features**
User Authentication: Users can register, log in, and log out securely.
Post Management: Create, read, update, and delete posts.
Comment System: Users can comment on posts.
Authorization: Differentiates between regular users and administrators (admin privileges).
Validation: Validates user input to ensure data integrity.

**Technologies Used**
Node.js: JavaScript runtime for server-side development.
Express.js: Web application framework for Node.js.
MongoDB: NoSQL database for storing application data.
Mongoose: MongoDB object modeling tool for Node.js.
bcryptjs: Library for hashing passwords.
jsonwebtoken: Library for generating and verifying JSON Web Tokens (JWT).
Express Validator: Middleware for input validation.
Helmet: Middleware to secure Express apps by setting various HTTP headers.
Morgan: HTTP request logger middleware.
dotenv: Module for loading environment variables from a .env file.

**Project Structure**
models/: Contains Mongoose schemas and models.
Comment.js: Defines the schema for comments on posts.
Post.js: Defines the schema for blog posts.
User.js: Defines the schema for user accounts.
routes/: Contains route handlers for different parts of the application.
auth.js: Handles user authentication and authorization.
posts.js: Manages CRUD operations for posts.
comments.js: Manages CRUD operations for comments.

middleware/: Contains custom middleware functions.
authMiddleware.js: Middleware for verifying JWT tokens.
adminMiddleware.js: Middleware for restricting access to admin users.
config/: Configuration files, including database connection setup (db.js), and environment variables (config.js).
controllers/: Business logic for handling various operations.
authController.js: Functions for user authentication.
postController.js: Functions for managing posts.
commentController.js: Functions for managing comments.
helpers/: Utility functions used across the application.

**Usage**
User Registration: Sign up for a new account using a valid email address and password.
User Login: Log in with your registered credentials.
Create a Post: Once logged in, create a new post by providing a title and content.
Add Comments: View existing posts and add comments to any post.
Admin Features: Admin users have additional privileges like deleting posts or comments.

**Contributing**
Contributions are welcome! Please fork the repository and submit pull requests to contribute new features, improvements, or fixes.
