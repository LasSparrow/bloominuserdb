const express = require('express')
const database = require('./mysqlDatabase')


const app = express()
app.use('/', function (req, res, next) {
  var allowedOrigins = ['http://localhost:3000', 'http://localhost:6006', 'http://localhost:8080', "https://*"];
  var origin = req.headers.origin;
  console.log(origin);
  if(allowedOrigins.indexOf(origin) > -1){}

  // res.setHeader('Access-Control-Allow-Origin', origin || "*");
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
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
    // const user = req.body
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
    // const post = req.body
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

  database.updatePost(id, postData, (error, result) => {
    // 2
    if (error) {
      res.send({ error })
      return
    }
    //4
    res.send({ result })
  })
})


// PHOTOS DATABASE

app.get('/api/photos', (req, res) => {
  database.allPhotos((error, photos) => {
    // 2
    if (error) {
      res.send({ error })
      return
    }
    // 3
    res.send({ photos })
  })
})

app.post('/api/photos/', (req, res) => {
  const photo = req.body
  // 1
  database.createPhoto(photo, (error, photoId) => {
    // const photo = req.body
    // 2
    if (error) {
      res.send({ error })
      return
    }

    photo.id = photoId;

    // 4
    res.send({ photo })
  })
})

app.delete('/api/photos/:id', (req, res) => {
  const id = req.params.id;

  database.deletePhoto(id, (error, result) => {
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
app.patch('/api/photos/:id', (req, res) => {
  const id = req.params.id
  const photoData = req.body

  database.updatePhoto(id, photoData, (error, result) => {
    // 2
    if (error) {
      res.send({ error })
      return
    }
    //4
    res.send({ result })
  })
})



// // LIKES DATABASE

// app.get('/api/likes', (req, res) => {
//   database.allLikes((error, likes) => {
//     // 2
//     if (error) {
//       res.send({ error })
//       return
//     }
//     // 3
//     res.send({ likes })
//   })
// })

// app.post('/api/likes/', (req, res) => {
//   const like = req.body
//   // 1
//   database.createLike(like, (error, likeId) => {
//     const like = req.body
//     // 2
//     if (error) {
//       res.send({ error })
//       return
//     }

//     like.id = likeId;

//     // 4
//     res.send({ like })
//   })
// })

// app.delete('/api/likes/:id', (req, res) => {
//   const id = req.params.id;

//   database.deleteLike(id, (error, result) => {
//     // 2
//     if (error) {
//       res.send({ error })
//       return
//     }

//     //4
//     res.send({ result })
//   })
// })

// app.use(express.json())
// app.patch('/api/likes/:id', (req, res) => {
//   const id = req.params.id
//   const likeData = req.body

//   database.updateLike(id, likeData, (error, result) => {
//     // 2
//     if (error) {
//       res.send({ error })
//       return
//     }
//     //4
//     res.send({ result })
//   })
// })



// COMMENTS DATABASE

app.get('/api/comments', (req, res) => {
  database.allComments((error, comments) => {
    // 2
    if (error) {
      res.send({ error })
      return
    }
    // 3
    res.send({ comments })
  })
})

app.post('/api/comments', (req, res) => {
  const comment = req.body
  // 1
  database.createComment(comment, (error, commentId) => {
    // const comment = req.body
    // 2
    if (error) {
      res.send({ error })
      return
    }

    comment.id = commentId;

    // 4
    res.send({ comment })
  })
})

app.delete('/api/comments/:id', (req, res) => {
  const id = req.params.id;

  database.deleteComment(id, (error, result) => {
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
app.patch('/api/comments/:id', (req, res) => {
  const id = req.params.id
  const commentData = req.body

  database.updateComment(id, commentData, (error, result) => {
    // 2
    if (error) {
      res.send({ error })
      return
    }
    //4
    res.send({ result })
  })
})