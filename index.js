const express=require("express");
const app=express();
const port =8080;
const path =require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        username : "apnacollege",
        content : "I am learning web dev"
    },
    {
        id: uuidv4(),
        username : "Ankita Deori",
        content : "Manifesting my 1st internship"
    },
];

app.get("/posts",(req,res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
});

app.post("/posts",(req, res)=>{
    let{ username, content }=req.body;
    let id= uuidv4();
    posts.push({id,username, content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req, res)=>{
    let {id} =req.params;
    let post= posts.find((p) => id=== p.id);
    res.render("show.ejs",{post});
});

app.listen(port , () =>{
    console.log("Listening to port: 8080");
});