const express = require('express')
const jwt = require('./jwt')
const cors = require('cors')
const database = require('./mysqlDatabase')
const bcrypt = require('bcrypt')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const app = express()
app.use('/', function (req, res, next) {
  // var allowedOrigins = ['http://localhost:3000', 'http://localhost:6006', 'http://localhost:8080', "https://*"];
  // var origin = req.headers.origin;
  // console.log(origin);
  // if(allowedOrigins.indexOf(origin) > -1){}

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000, http://localhost:3001, http://localhost:6006, http://localhost:8080, https://*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(express.json())

app.post('/api/users/login', async (req, res) =>{
  try {
    const hashedPassword = await bcrypt.hash(req.body.Pass, 10)
    const user = {Email: req.body.Email, Pass: hashedPassword}
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})


app.post('/login', async (req, res) =>{

      const user = users.find(user => users.Email === req.body.Email)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.Pass, users.Pass)) {
        res.sendStatus('Success')
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
  // get the user from the database
  // const username = req.body.Username
  // const user = {Username:Username}

  // Create an jwt from the user details and send the token back to the client
  const accessToken = jwt.generateToken({Email: user.Email, Pass: user.Pass})
  res.send({ accessToken: accessToken })
})






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


app.post('/api/users', (req, res) => {
  const user = req.body
  // 1
  database.createUser(user, (error, userID) => {
    // const user = req.body
    // 2
    if (error) {
      res.send({ error })
      return
    }

    user.id = userID;

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

app.post('/api/posts', (req, res) => {
  const post = req.body
  // 1
  database.createPost(post, (error, postID) => {
    // const post = req.body
    // 2
    if (error) {
      res.send({ error })
      return
    }

    post.id = postID;

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
app.use(express.json())
app.get('/api/photos', (req, res) => {

})

app.post('/api/photos', upload.single('image'), (req, res) => {
  console.log(req.file)
  const description = req.body.description
  res.send("jazz")
})

// const port = process.env.PORT || 8080
// app.listen(port, () => {
//   console.log(`listening on port ${port}`)
// })
// update of photos get&post
// app.get('/api/photos', (req, res) => {
//   database.allPhotos((error, photos) => {
//     // 2
//     if (error) {
//       res.send({ error })
//       return
//     }
//     // 3
//     res.send({ photos })
//   })
// })

// app.post('/api/photos', (req, res) => {
//   const photo = req.body
//   // 1
//   database.createPhoto(photo, (error, photoId) => {
//     // const photo = req.body
//     // 2
//     if (error) {
//       res.send({ error })
//       return
//     }

//     photo.id = photoId;

//     // 4
//     res.send({ photo })
//   })
// })

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

app.get('/api/comments/:postID', (req, res) => {
  const {postID} = req.params;
  database.allComments(postID, (error, comments) => {
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

  //get the userId from the token, get the post id from the frontend/req.body/comment
  //jwt to verify token to get userId,

  const userID = 1; //replace with token user id when verifying token is complete
  database.createComment(comment, userID, (error, commentId) => {
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