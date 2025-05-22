Book Review Application

A versatile Book Review application built with Express, MongoDB, and EJS. Users can register, log in, add books (with optional cover images uploaded to Cloudinary), and post reviews.

Prerequisites

Node.js v14 or higher

MongoDB (either running locally or accessible via a connection URI)

A Cloudinary account for image storage

(Optional) A GitHub repository to host your code

Environment Variables

Create a .env file in the project root with your own values assigned. Do not include real secrets in version-controlled files.

# MongoDB database name
DB=<your_database_name>

# JWT secret for signing sessions
JWT_SECRET=<your_jwt_secret>

# Cloudinary credentials
CLOUDNAME=<your_cloudinary_cloud_name>
API_KEY=<your_cloudinary_api_key>
API_SECRET=<your_cloudinary_api_secret>

Note: Ensure .env is listed in .gitignore so that sensitive data never enters version control.

Project Setup

Clone the repository

git clone https://github.com/Shoaib-json/Book-Review.git
cd Book-Review

Install dependencies

npm install

Configure environment

Ensure your .env file matches the variables above.

Start MongoDB (local)

mongod

Running Locally

Start the server with one of these commands:

node app.js
# or, in the future, define a start script:
# npm start

By default, the application listens on port 8080. Open your browser at http://localhost:8080.

Example API Requests

Replace localhost:8080 with your server address.

Register a new user

curl -X POST http://localhost:8080/user/register \
  -H "Content-Type: application/json" \
  -d '{ "username": "testuser", "password": "password123" }'

Log in

curl -X POST http://localhost:8080/user/login \
  -H "Content-Type: application/json" \
  -d '{ "username": "testuser", "password": "password123" }'

Add a new book

Note: This endpoint accepts a multipart/form-data request and requires valid Cloudinary configuration.

curl -X POST http://localhost:8080/ \
  -F "title=My New Book" \
  -F "author=Jane Doe" \
  -F "coverImage=@/path/to/image.jpg"

List all books

curl http://localhost:8080/

Submit a review

curl -X POST http://localhost:8080/review \
  -H "Content-Type: application/json" \
  -d '{ "bookId": "<BOOK_ID>", "rating": 5, "comment": "Great read!" }'

Design Decisions & Assumptions

Authentication & Sessions: We use express-session to store a JWT in an HTTP-only cookie for authenticated routes. The JWT is signed with JWT_SECRET.

Templating: Server-side rendering is powered by EJS and ejs-mate for layout support.

File Uploads: Cover images are uploaded to Cloudinary using multer-storage-cloudinary for efficient, scalable storage.

Middleware: A custom auth middleware verifies sessions/JWT before granting access to protected routes.

Database Schema: Separate Mongoose models (User, Book, Review) maintain clear separation of concerns.

Assumptions:

There is a local MongoDB instance at mongodb://127.0.0.1:27017/Book.

Basic input validation is in place; for production, consider libraries like Joi or express-validator.

Error handling is minimal. In a real-world application, integrate centralized error middleware (e.g., express-async-errors and http-errors).

Author

Shoaib Khan

