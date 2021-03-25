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
    FROM users
  `
  connection.query(query, null, (error, results) => {
    callback(error, results)
  })
}
exports.allUsers = allUsers


function createUser(user, callback) {
  // 1
  const query = `
    INSERT INTO users (FirstName, LastName, Email, Password, Username, Birthday, FavoritePlant)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `

  // 2
  const params = [user.FirstName, user.LastName, user.Email, user.Password, user.Username, user.Birthday, user.FavoritePlant]

  // 3
  connection.query(query, params, function (error, result) {
    callback(error, result)
  })
}
exports.createUser = createUser


function deleteUser(userId, callback) {

  //1
  let query = `
  DELETE FROM users
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
  UPDATE users
  SET FirstName = ?, LastName = ?, Email = ?, Password = ?, Username = ?, Birthday = ?, FavoritePlant = ?
  WHERE id = ?
  `

  let params = [data.FirstName, data.LastName, data.Email, data.Password, data.Username, data.Birthday, data.FavoritePlant, id]

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
    FROM posts
  `
  connection.query(query, null, (error, results) => {
    callback(error, results)
  })
}
exports.allPosts = allPosts


function createPost(post, callback) {
  // 1
  const query = `
    INSERT INTO posts (PostDate, UserID)
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


function deletePost(postId, callback) {

  //1
  let query = `
  DELETE FROM posts
  WHERE id = ?
  `

  //2
  let params = [postId, callback]

  //3
  connection.query(query, params, (error, result) => {
    callback(error, result)
  })
}
exports.deletePost = deletePost


function updatePost(id, data, callback) {

  let query = `
  UPDATE posts
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
    FROM photos
  `
  connection.query(query, null, (error, results) => {
    callback(error, results)
  })
}
exports.allPhotos = allPhotos


function createPhoto(photo, callback) {
  // 1
  const query = `
    INSERT INTO photos (PhotoUrl, PhotoCaption, PostID)
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
  DELETE FROM photo
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
  UPDATE photo
  SET PhotoUrl = ?, PhotoCaption = ?, PostID = ?
  WHERE id = ?
  `

  let params = [data.PhotoUrl, data.PhotoCaption, data.PostID, id]

  connection.query(query, params, (error, result) => {
    callback(error, result)
  })

}
exports.updatePhoto = updatePhoto



// LIKES DATABASE

// 3
function allLikes(callback) {
  const query = `
    SELECT * 
    FROM likes
  `
  connection.query(query, null, (error, results) => {
    callback(error, results)
  })
}
exports.allLike = allLike


function createLike(like, callback) {
  // 1
  const query = `
    INSERT INTO likes (LikeNumber, PostID, UserID)
    VALUES (?, ?, ?)
  `

  // 2
  const params = [like.LikeNumber, post.PostID, user.UserID]

  // 3
  connection.query(query, params, function (error, result) {
    callback(error, result)
  })
}
exports.createLike = createLike


function deleteLike(likeId, callback) {

  //1
  let query = `
  DELETE FROM like
  WHERE id = ?
  `

  //2
  let params = [likeId, callback]

  //3
  connection.query(query, params, (error, result) => {
    callback(error, result)
  })
}
exports.deleteLike = deleteLike


function updateLike(id, data, callback) {

  let query = `
  UPDATE like
  SET LikeNumber = ?, PostID = ?, UserID = ?
  WHERE id = ?
  `

  let params = [data.LikeNumber, data.PostID, data.UserID, id]

  connection.query(query, params, (error, result) => {
    callback(error, result)
  })

}
exports.updateLike = updateLike