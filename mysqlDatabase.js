// 1
const mysql = require('mysql')

// 2
const dbDetails = {
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || 'u6354r3es4optspf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: process.env.MYSQL_USERNAME || 'a5x2thquaj2um5zi',
  password: process.env.MYSQL_PASSWORD || 'gafbqpgs2c9ti0vb',
  database: process.env.MYSQL_DATABASE || 'e5yaaez27szadgdz'
}
const connection = mysql.createConnection(dbDetails);

// USERS DATABASE

// 3
function allUsers(callback) {
  const query = `
    SELECT * 
    FROM Users
  `
  connection.query(query, null, (error, results) => {
    callback(error, results)
  })
}
exports.allUsers = allUsers


function createUser(user, callback) {
  // 1
  const query = `
    INSERT INTO Users (FirstName, LastName, Email, Pass, Username, Birthday, FavoritePlant)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `

  // 2
  const params = [user.FirstName, user.LastName, user.Email, user.Pass, user.Username, user.Birthday, user.FavoritePlant]

  // 3
  connection.query(query, params, function (error, result) {
    callback(error, result)
  })
}
exports.createUser = createUser


function deleteUser(userId, callback) {

  //1
  let query = `
  DELETE FROM Users
  WHERE id = ?
  `

  //2
  let params = [userId, callback]

  //3
  connection.query(query, params, (error, result) => {
    callback(error, result)
  })
}
exports.deleteUser = deleteUser


function updateUser(id, data, callback) {

  let query = `
  UPDATE Users
  SET FirstName = ?, LastName = ?, Email = ?, Pass = ?, Username = ?, Birthday = ?, FavoritePlant = ?
  WHERE id = ?
  `

  let params = [data.FirstName, data.LastName, data.Email, data.Pass, data.Username, data.Birthday, data.FavoritePlant, id]

  connection.query(query, params, (error, result) => {
    callback(error, result)
  })

}
exports.updateUser = updateUser


// POSTS DATABASE

// 3
function allPosts(callback) {
  const query = `
    SELECT * 
    FROM Posts
  `
  connection.query(query, null, (error, results) => {
    callback(error, results)
  })
}
exports.allPosts = allPosts


function createPost(post, callback) {
  // 1
  const query = `
    INSERT INTO Posts (PostDate, UserID)
    VALUES (?, ?)
  `

  // 2
  const params = [post.PostDate, user.UserID]

  // 3
  connection.query(query, params, function (error, result) {
    callback(error, result)
  })
}
exports.createPost = createPost


function deletePost(postID, callback) {

  //1
  let query = `
  DELETE FROM Posts
  WHERE id = ?
  `

  //2
  let params = [postID, callback]

  //3
  connection.query(query, params, (error, result) => {
    callback(error, result)
  })
}
exports.deletePost = deletePost


function updatePost(id, data, callback) {

  let query = `
  UPDATE Posts
  SET PostDate = ?, UserID = ?
  WHERE id = ?
  `

  let params = [data.PostDate, data.UserID, id]

  connection.query(query, params, (error, result) => {
    callback(error, result)
  })

}
exports.updatePost = updatePost



// PHOTOS DATABASE

// 3
function allPhotos(callback) {
  const query = `
    SELECT * 
    FROM Photos
  `
  connection.query(query, null, (error, results) => {
    callback(error, results)
  })
}
exports.allPhotos = allPhotos


function createPhoto(photo, callback) {
  // 1
  const query = `
    INSERT INTO Photos (PhotoUrl, PhotoCaption, PostID)
    VALUES (?, ?, ?)
  `

  // 2
  const params = [photo.PhotoUrl, photo.PhotoCaption, post.PostID]

  // 3
  connection.query(query, params, function (error, result) {
    callback(error, result)
  })
}
exports.createPhoto = createPhoto


function deletePhoto(photoId, callback) {

  //1
  let query = `
  DELETE FROM Photo
  WHERE id = ?
  `

  //2
  let params = [photoId, callback]

  //3
  connection.query(query, params, (error, result) => {
    callback(error, result)
  })
}
exports.deletePhoto = deletePhoto


function updatePhoto(id, data, callback) {

  let query = `
  UPDATE Photo
  SET PhotoUrl = ?, PhotoCaption = ?, PostID = ?
  WHERE id = ?
  `

  let params = [data.PhotoUrl, data.PhotoCaption, data.PostID, id]

  connection.query(query, params, (error, result) => {
    callback(error, result)
  })

}
exports.updatePhoto = updatePhoto



// // LIKES DATABASE

// // 3
// function allLikes(callback) {
//   const query = `
//     SELECT * 
//     FROM likes
//   `
//   connection.query(query, null, (error, results) => {
//     callback(error, results)
//   })
// }
// exports.allLike = allLike


// function createLike(like, callback) {
//   // 1
//   const query = `
//     INSERT INTO likes (LikeNumber, PostID, UserID)
//     VALUES (?, ?, ?)
//   `

//   // 2
//   const params = [like.LikeNumber, post.PostID, user.UserID]

//   // 3
//   connection.query(query, params, function (error, result) {
//     callback(error, result)
//   })
// }
// exports.createLike = createLike


// function deleteLike(likeId, callback) {

//   //1
//   let query = `
//   DELETE FROM like
//   WHERE id = ?
//   `

//   //2
//   let params = [likeId, callback]

//   //3
//   connection.query(query, params, (error, result) => {
//     callback(error, result)
//   })
// }
// exports.deleteLike = deleteLike


// function updateLike(id, data, callback) {

//   let query = `
//   UPDATE like
//   SET LikeNumber = ?, PostID = ?, UserID = ?
//   WHERE id = ?
//   `

//   let params = [data.LikeNumber, data.PostID, data.UserID, id]

//   connection.query(query, params, (error, result) => {
//     callback(error, result)
//   })

// }
// exports.updateLike = updateLike




// COMMENTS DATABASE

// 3
function allComments(postID, callback) {
  const query = `
    SELECT * 
    FROM Comments
    WHERE PostID = ?
  `
  connection.query(query, [postID], (error, results) => {
    callback(error, results)
  })
}
exports.allComments = allComments


function createComment(comment, userID, callback) {
  // 1
  const query = `
    INSERT INTO Comments (CommentContent, PostID, UserID)
    VALUES (?, ?, ?)
  `

  // 2
  const params = [comment.CommentContent, comment.postID, userID]

  // 3
  connection.query(query, params, function (error, result) {
    callback(error, result)
  })
}
exports.createComment = createComment


function deleteComment(commentId, callback) {

  //1
  let query = `
  DELETE FROM Comment
  WHERE id = ?
  `

  //2
  let params = [commentId, callback]

  //3
  connection.query(query, params, (error, result) => {
    callback(error, result)
  })
}
exports.deleteComment = deleteComment


function updateComment(id, data, callback) {

  let query = `
  UPDATE Comment
  SET CommentContent = ?, CommentDate = ?, UserID = ?, PostID = ?
  WHERE id = ?
  `

  let params = [data.CommentContent, data.CommentDate, data.UserID, data.PostID, id]

  connection.query(query, params, (error, result) => {
    callback(error, result)
  })

}
exports.updateComment = updateComment