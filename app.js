var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('sqlite://awesomeblog.db');
var blogs = require('./articles/blog-articles.js');
var path = require('path');
var app = express();
var port = 3000;

// app.use(express.static('public'));
app.set('views',path.resolve(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

var blogPosts = blogs.getBlogs();

app.get('/blog', (req,res) =>{
	Blog.findAll({}).then(function(rows){
		res.render("blog/index", {posts: rows});
		console.log("HERERERERERE >>>>>> ", rows[1].dataValues);
		// console.log("HERERERERERE >>>>>> ", rows[1].dataValues);
	})
});

app.get('/newpost',(req,res) =>{   // get form to enter new post
	res.render("blog/newpost");
});

app.post('/create', function(req,res){
	Blog.create({
		title:req.body.title,
		subtitle:req.body.subtitle,
		article:req.body.article,
		author:req.body.author,
		pub_date:req.body.date,
		auth_link:req.body.authlink
	}).then(function(post){
		  console.log(post);
		  res.json(post);
	});	
});

var Blog = sequelize.define('blogs', {
  title: {
    type: Sequelize.STRING
  },
  subtitle: {
    type: Sequelize.STRING
  },  
  article: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },  
  pub_date: {
    type: Sequelize.STRING
  },  
  authlink: {
    type: Sequelize.STRING
  }
},

{
  freezeTableName: true // Model tableName will be the same as the model name
});

app.listen(port, () =>{
	console.log("Server running on port " + port);
});
