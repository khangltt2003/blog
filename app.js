const express = require('express')
const bodyParser = require("body-parser")
const ejs = require('ejs')
const app = express()
const port = 3000

app.use(express.static('public'), bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let blogsArray = [
    {
        blogTitle: "Home",
        blogContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."    
    },
    {
        blogTitle: "Day 1",
        blogContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."    
    },
    {
        blogTitle: "Day 2",
        blogContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."    
    },
    {
        blogTitle: "Day 3",
        blogContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."    
    },
    {
        blogTitle: "Day 4",
        blogContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."    
    }
]

app.get('/', (req,res)=>{
    res.render('home',{Title: "Home", blogsArray: blogsArray});
})

app.get('/about', (req,res)=>{
    res.render('about',{Title: "About"});
})

app.get('/contact', (req,res)=>{
    res.render('contact',{Title: "Contact"});
})

app.get('/createBlog', (req,res)=>{
    res.render('createBlog',{Title: "Create New Blog"});
})


app.post('/createBlog', (req, res)=>{
    console.log(req.body);
    let newBlog = {
        blogTitle: req.body.newBlogTitle,
        blogContent: req.body.newBlogContent
    }
    blogsArray.push(newBlog);
    res.redirect('/');
})

app.get('/post/:title', (req, res)=>{
    console.log(req.params);
    for(let i = 0; i < blogsArray.length; i++){
        if(blogsArray[i].blogTitle === req.params.title){
            res.render('post', {
                Title: blogsArray[i].blogTitle,
                blogTitle: blogsArray[i].blogTitle,
                blogContent: blogsArray[i].blogContent
            })
        }
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
