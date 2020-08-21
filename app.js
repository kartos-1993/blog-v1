const express = require('express')
const ejs = require("ejs");
const bodyParser = require('body-parser')
const _ = require('lodash')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static("public"))

const posts = []

app.get('/', (req, res) => {
    res.render('home', { posts: posts })
})

app.get('/compose', (req, res) => {
    res.render('compose')
})

app.post(('/compose'), (req, res) => {
    const postTitle = req.body.title
    const postContent = req.body.content

    const post = {
        title: postTitle,
        content: postContent
    }

    posts.push(post)
    res.redirect('/')

})

app.get('/posts/:postTitle', (req, res) => {
    const requestTitle = _.lowerCase(req.params.postTitle)

    posts.forEach((post) => {
        const storedtitle = _.lowerCase(post.title)
        if (requestTitle === storedtitle) {
            res.render('post', {
                title: post.title,
                content: post.content
            })
        }
    })
})


app.listen(3000, () => {
    console.log('server is running on port 3000')
})