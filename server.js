const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post')
const postRouter = require('./routes/posts');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blogpost', { useNewUrlParser: true, useUnifiedTopology: true })

app.set('view engine','ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/',async (req,res)=>{
    const posts = await Post.find();
    res.render("posts/index", {posts : posts}); 
})

app.use('/posts', postRouter);

app.listen(3000,()=>{
    console.log(`Server running on port: 3000`)
})