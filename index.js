import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
const app = express();
const port = 3000;
var blogsNumber = 0;
var blogs=[];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride('_method'));

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`);
});

app.get("/", (req, res) => {
    res.render("index.ejs", {blogs: blogs});
});

app.get("/new", (req, res) => {
    res.render("new.ejs", {blogsNumber:blogsNumber});
});

app.get("/show", (req, res) => {
    console.log(blogs[req.query.id]);
    res.render("showingBlog.ejs", {realBlog : blogs[req.query.id]});
});

app.post("/create", (req, res) =>{
    req.body['number']=blogsNumber;
    blogsNumber++;
    blogs.push(req.body);
    res.render("index.ejs", {blogs: blogs});
});

app.get("/edit", (req, res) => {
    res.render("showEdit.ejs", {blogs: blogs});
});

app.get("/editting", (req, res) => {
    res.render("edit.ejs", {realBlog : blogs[req.query.id]});
});

app.post("/edit", (req, res) =>{
    console.log(req.body);
    blogs[req.body.number]=req.body;
    res.render("index.ejs", {blogs: blogs});
});

app.get("/delete", (req, res) => {
    res.render("showDelete.ejs", {blogs: blogs});
});

app.get("/deleting", (req, res) => {
    res.render("deleted.ejs", {realBlog : blogs[req.query.id]});
});

app.delete("/deleted", (req, res) =>{
    var tempBlogsNumber=req.body.number;
    blogs.splice(tempBlogsNumber, 1);
    for (let i = tempBlogsNumber; i < blogs.length; i++) {
        blogs[i].number--;
    } 
    // blogs.forEach(here=>{
    //     here.number--;
    // })
    blogsNumber--;
    console.log(blogs);
    res.render("index.ejs", {blogs: blogs});
});
