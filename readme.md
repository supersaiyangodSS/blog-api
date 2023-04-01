A blog API with role based authorization and authentication allows you to access, create, update, delete posts, post comments & more. made using node.js, express and mongodb.

### live link here

## Features

- User authentication and authorization
- Role based authorization
- CRUD operation for blog posts (create, read, update, delete)
- Ability to add, remove, edit comments to blog posts
- Ability to like blog posts
- API versioning and backward compatibility
- Comprehensive documentation and developer resources
- Scalability and performance optimizations
- Secured API

## Installation
1. Clone the repository
2. Install dependencies using `npm install`
3. Set the following environment variables:
    - `MONGO_URI` - the MongoDB connection string
    - `SESSION_SECRET` - a secret string for session management
    - `PORT` - the port number the server will listen on
4. Start the server using npm start

## Endpoints

The following API endpoints are available:

### User:
GET /user - Get all users (requires authentication)
POST /user - Create user (requires authentication)
GET /user/:id - Get one user (requires authentication)
PUT /user/:id Edit user (requires authentication)
DELETE /user/:id Delete user (requires authentication)
POST /user/auth - User login
POST /user/logout - User logout


### Posts:
GET /post - Get all published posts
GET /post/:post - Get a specific post by ID
POST /post - Create a new post (requires authentication)
PUT /post/:post - Update an existing post (requires authentication)
DELETE /post/:post - Delete a post (requires authentication)
POST /post/:post/like - Like a post (requires authentication)
POST /post/:post/comments - Add a comment to a post (requires authentication)
GET /post/:post/comments - Get all comments for a post

## Authentication
This API uses session-based authentication. When a user logs in, a session is created on the server and a session ID is stored in a cookie on the client. This session ID is used to authenticate the user on subsequent requests.

## Contributing
Contributions are always welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the repository
- Create a new branch: git checkout -b feature/your-feature
- Make your changes and commit them: git commit -m 'Add some feature'
- Push to the branch: git push origin feature/your-feature
- Submit a pull request
- Please make sure to write clear and concise commit messages and follow the project's coding conventions.

## Error Handling
Errors are handled by returning a JSON response with an error message and an HTTP status code. The following status codes are used:

- 200 - OK
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Internal Server Error

## License
This project is licensed under the MIT License.