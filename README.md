# Winstagram

Fullstack web application with a team of 3 developers to create a positive web application.

### Group Roles
Program Manager: [Sharrar Khan](https://github.com/SharrarKhan)

UI/UX: [Owen Jones](https://github.com/ojones311)

Tech Lead: [Jenesh Napit](https://github.com/jenesh)

# Group Project Repo Link
[Project Repo](https://github.com/joinpursuit/Pursuit-Core-Web-Express-Group-Project/blob/master/README.md)

## Back-End

Create a full RESTful API using the social media database structure described below, including an Express app and a Postgres database. This app should have the following routes, with corresponding SQL statements:

- **Users**
  - GET `/users` - Get all users.
  - GET `/users/:id` - Get single user.
  - POST `/users` - Add single user.
  - DELETE `/users/:id` - Delete user with the corresponding `id`.

- **Posts**
  - GET `/posts` - Get all posts.
  - GET `/posts/:id` - Get single post.
  - POST `/posts` - Add single post.
  - PATCH `/posts/:id` - Edit single post.
  - DELETE `/posts/:id` - Delete single post.

- **Likes**
  - GET `/likes/posts/:post_id` - Get all likes for a single post.
  - POST `/likes/posts/:post_id` - Add single like.
  - DELETE `/likes/:post_id/:liker_id` - Delete single like.

- **Comments**
  - GET `/comments/posts/:post_id` - Get all comments for a single post.
  - POST `/comments/posts/:post_id/:commenter_id` - Add single comment.
  - PATCH `/comments/:post_id/:commenter_id` - Edit single comment.
  - DELETE `/comments/:post_id/:commenter_id` - Delete single comment.

- **Albums**
  - GET `/albums/:owner_id` - Get all albums that belong to a user.
  - POST `/albums/:owner_id` - Create new empty album for user.

- **Pictures**
  - GET `/pictures/albums/:album_id` - Get all pictures for a single album.
  - POST `/pictures/albums/:album_id` - Add single picture to album.
  - DELETE `/pictures/:pic_id` - Delete single picture.

The responses from your Express app should have three keys: `status`, `message`, and `body`. For example, when I send a GET request for a single user, I should get back something that looks like this:

```js
{
  status: "success",
  message: "got single user",
  body: {
    id: 1,
    name: "Reed",
    age: 46
  }
}
```


## Front end

Your front end should have each of the following components.  Don't worry about authentication yet: anyone can make whatever REST calls they want to.

### Table of contents

Have a table of contents page that contains hyperlinks to all of the other pages

### Posts Feed

- Display all posts from all users in chronological order
- Include the number of likes in each post as well as the user
- Display all comments from each post
- Create a new post
- Create a new comment for a given post

### User Search

- Search for a user
- Create a new user
- Delete a user

### Albums

- See all existing albums
- Create a new album

### Photos

- See all photos 
- Create a single photo
- Delete a single photo