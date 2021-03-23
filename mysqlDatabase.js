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
  SET FirstName = ?
  WHERE id = ?
  `

  let params = [data.FirstName, id]

  connection.query(query, params, (error, result) => {
    callback(error, result)
  })

}
exports.updateUser = updateUser
