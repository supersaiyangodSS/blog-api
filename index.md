## BLOG API

A blog API with role based authorization and authentication allows you to access, create, update, delete posts, post comments & more. made using node.js, express and mongodb.

# [live demo](https://blog-api.vedantsapalkar.repl.co)


## Features

- User authentication and authorization
- Role based authorization
- CRUD operation for blog posts (create, read, update, delete)
- Ability to add, remove, edit comments to blog posts
- Ability to like blog posts
- View counts per blog post visit
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
Some of the Endpoints are only accessible via admin account.


### User:
- GET /user - Get all users (requires authentication)
- POST /user - Create user
- GET /user/:id - Get one user (requires authentication)
- PUT /user/:id Edit user (requires authentication)
- DELETE /user/:id Delete user (requires authentication)
- POST /user/auth - User login
- POST /user/logout - User logout



### Posts:
- GET /post - Get all published posts
- GET /post/:post - Get a specific post by ID
- POST /post - Create a new post (requires authentication)
- PUT /post/:post - Update an existing post (requires authentication)
- DELETE /post/:post - Delete a post (requires authentication)
- POST /post/:post/like - Like a post (requires authentication)
- POST /post/:post/comments - Add a comment to a post (requires authentication)
- GET /post/:post/comments - Get all comments for a post


## Getting Started:

recommended tool: [Hoppscotch](https://hoppscotch.io/)


### Create Account

**username**
: usernames are case-sensitive

make a `POST` request to `/user`.
```
{ 
    "firstName": "yourfirstname",
    "lastName": "yourlastname",
    "email": "youremail@mail.com",
    "username": "yourusername",
    "password": "yourpassword"
}
```

**Response** :
```
{
  "message": "user yourusername has been created."
}
```


### Log in

After creating user login using **username** and **password**.

**Your account will be locked after 10 unsuccessfull attempts**

make a `POST` request to `/user/auth`.
```
{
    "username": "yourusername",
    "password": "yourpassword"
}
```
**Response** :
{
  "message": "Logged in successfull, Hello yourusername"
}


### See all users

You can access other user's information like id, first name, last name, username. But other information like email, password cannot be accessed.

make a `GET` request to `/user`.
**Response** :
```
{
    "_id": "userID",
    "firstName": "userfirstname",
    "lastName": "userlastname",
    "username": "username"
}
```


### See users info by id

Same as all users info but only one user will be shown based upon the id you entered.
(you can get any user's id by making `GET` request to `/user`)

make a `GET` request to `/user/enterUserIdHere`.
**Response** :
```
{
    "_id": "userID",
    "firstName": "userfirstname",
    "lastName": "userlastname",
    "username": "username"
}
```


### Edit your accounts information

You can only edit your own account's information, cannot edit information on other user's account.

make a `PUT` request to `/user/enterUserIdHere`.
```
{
    "firstName": "newFirstName",
    "lastName": "newLastName"
}
```
**Response** :
```
{
  "message": "Changes has been made to the user enteredUserIdWillBeShownHere"
}
```


### Delete your account

**Admins are authorized to delete user accounts.**

make a `DELETE` request to `/user/enterUserIdHere`.

**Response** :
```
{
  "message": "User enteredIdWillBeShownHere has been successfully deleted"
}
```


### Log out

If you don't log out the user session will automatically expires after one hour.

make a `POST` request to `/user/logout`.
User will be logged out and redirected to the home page.


### View all blog posts

make a `GET` request to `/post`, here you will be able to see all blog posts.


### View blog post with id

make a `GET` request to `/post/pastePostIdHere`


### Create blog post [ADMIN]

make a `POST` request to `/post`,
**All given fields are required**
**tags are seprated by commas**
```
{
    "title": "post title",
    "content": "post content",
    "tags": "tagOne, tagTwo, tagThree"
}
```
other info like author of post, post creation or updated time will be filled automatically.


### Edit blog post [ADMIN]

make a `PUT` request to `/post/pastePostIdHere`,
**Provide only those properties that you want to update else remove them**
```
{
    "title": "edited post title",
    "content": "edited post content"
}
```
other info like author of post, post creation or updated time will be filled automatically.


### Delete blog post [ADMIN]

make a `DELETE` request to `/post/pastePostIdHere`.


### Create comment on a post

make a `POST` request to `/post/pastePostIdHere/comments`.
```
{
    "text": "your comment text"
}
```


### Get comment on a post

make a `POST` request to `/post/pastePostIdHere/comments`.


### Edit comment on a post

make a `PUT` request to `/post/pastePostIdHere/pasteCommentIdHere`.
```
{
    "text": "your new comment text"
}
```


### Delete comment on a post [USER AND ADMIN]

make a `DELETE` request to `/post/pastePostIdHere/paseCommentIdHere`.


### Like the post

make a `PUT` request to `/post/pastePostIdHere/like`.
**If you are already liked the post and visiting this endpoint it will unlike the post and vice-versa**


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
This project is licensed under the [MIT License.](https://github.com/vedant8177/blog-api/blob/main/LICENSE)
