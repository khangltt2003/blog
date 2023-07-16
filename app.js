const express = require('express')
const bodyParser = require("body-parser")
const ejs = require('ejs')
const app = express()
const port = 3000
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://test123:test123@cluster0.c5buque.mongodb.net/blogDB')

app.use(express.static(__dirname + '/public'), bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const blogSchema = mongoose.Schema({
    title: String,
    content: String
})

const blogsList = mongoose.model("blogs", blogSchema);

const home = new blogsList({
    title: "Home",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
})
const day1 = new blogsList({
    title: "Day 1",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
})
const day2 = new blogsList({
    title: "Day 2",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
})
const day3 = new blogsList({
    title: "Day 3",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
})
const day4 = new blogsList({
    title: "Day 4",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
})

let blogsArray = [home, day1, day2, day3, day4]

const insertDefaultBlog = async()=>{
    const list = await blogsList.find();
    if(list.length === 0){
        await blogsList.insertMany(blogsArray);
    }
}

const getData = async (option)=>{
    return await blogsList.find(option);
}

const findAndUpdateBlog = async(_id, newTitle, newContent)=>{
    await blogsList.updateOne({_id: _id}, {$set:{title: newTitle, content:newContent}});
}

const deleteBlog = async(_id)=>{
    await blogsList.deleteOne({_id: _id});
}

app.get('/', (req,res)=>{
    const blogList = getData({}).then((blogsList)=>{
        res.render('home',{Title: "Home", blogsArray: blogsList});
    });
})

app.get('/createBlog', (req,res)=>{
    insertDefaultBlog().then(()=>{
        res.render('createBlog',{Title: "Create New Blog"});
    });
})

app.post('/createBlog', (req, res)=>{
    const newBlog = new blogsList({
        title: req.body.newBlogTitle,
        content: req.body.newBlogContent
    })
    const saveItem = async ()=>{
        await newBlog.save();
    }
    saveItem().then(()=> res.redirect('/'))
})

app.get('/post/:title', (req, res)=>{ //route param
    let option = {
        title: req.params.title
    }
    const targetBlog = getData(option).then((targetBlog)=>{
        res.render('post',{Title: req.params.title, blog: targetBlog[0]});
    });
})

app.get('/post/:title/edit', (req,res)=>{
    let option = {
        title: req.params.title
    }
    const targetBlog = getData(option).then((targetBlog)=>{
        res.render('edit',{Title: "Edit Blog", blog: targetBlog[0]});
    });
})

app.post('/post/:title/edit',(req,res)=>{
    const newTitle = req.body.newBlogTitle;
    const newContent = req.body.newBlogContent;
    const _id = req.body._id;
    findAndUpdateBlog(_id, newTitle, newContent).then(()=>{
        res.redirect("/post/" + newTitle);
    })
})

app.post('/delete', (req,res)=>{
    const _id = req.body._id;
    deleteBlog(_id).then(()=> res.redirect("/"))
})

app.get('/about', (req,res)=>{
    res.render('about',{Title: "About"});
})

app.get('/contact', (req,res)=>{
    res.render('contact',{Title: "Contact"});
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


