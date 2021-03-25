const express = require('express')
const database = require('./mysqlDatabase')


const app = express()
app.use('/', function (req, res, next) {
  //var allowedOrigins = ['http://localhost:3000', 'http://localhost:6006', "https://*"];
  var origin = req.headers.origin;
  //console.log(origin);
  /*if(allowedOrigins.indexOf(origin) > -1){
  }*/

  res.setHeader('Access-Control-Allow-Origin', origin || "*");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(express.json())


// USERS DATABASE

app.get('/api/users', (req, res) => {
  database.allUsers((error, users) => {
    // 2
    if (error) {
      res.send({ error })
      return
    }
    // 3
    res.send({ users })
  })
})

const port = process.env.PORT || 3306
app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})


app.post('/api/users/', (req, res) => {
  const user = req.body
  // 1
  database.createUser(user, (error, userId) => {
    const user = req.body
    // 2
    if (error) {
      res.send({ error })
      return
    }

    user.id = userId;

    // 4
    res.send({ user })
  })
})


app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  database.deleteUser(id, (error, result) => {
    // 2
    if (error) {
      res.send({ error })
      return
    }

    //4
    res.send({ result })
  })
})

app.use(express.json())
app.patch('/api/users/:id', (req, res) => {
  const id = req.params.id
  const userData = req.body

  database.updateUser(id, userData, (error, result) => {
    // 2
    if (error) {
      res.send({ error })
      return
    }
    //4
    res.send({ result })
  })
})



// POSTS DATABASE

app.get('/api/posts', (req, res) => {
  database.allPosts((error, posts) => {
    // 2
    if (error) {
      res.send({ error })
      return
    }
    // 3
    res.send({ posts })
  })
})

app.post('/api/posts/', (req, res) => {
  const post = req.body
  // 1
  database.createPost(post, (error, postId) => {
    const post = req.body
    // 2
    if (error) {
      res.send({ error })
      return
    }

    post.id = postId;

    // 4
    res.send({ post })
  })
})

app.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  database.deletePost(id, (error, result) => {
    // 2
    if (error) {
      res.send({ error })
      return
    }

    //4
    res.send({ result })
  })
})

app.use(express.json())
app.patch('/api/posts/:id', (req, res) => {
  const id = req.params.id
  const postData = req.body

  database.updateUser(id, postData, (error, result) => {
    // 2
    if (error) {
      res.send({ error })
      return
    }
    //4
    res.send({ result })
  })
})