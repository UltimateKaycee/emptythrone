//jshint esversion:6
const express = require ("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public"));
// const ejsLint = require('ejs-lint');
const port = 3000;
const startSuccessMsg = "Server started successfully on port:";

// CONTENT
const postTitle1 = "Title of the largest display post";
const postBody1 = "Shaping a vision of academic success for all students Newcomers to the education discussion might find this puzzling: Hasn’t concern with the academic achievement of every student always topped principals’ agendas? The short answer is, no. Historically, public school principals were seen as school managers, and as recently as two decades ago, high standards were thought to be the province of the college bound. could be defined as entry-level manufacturing work for students.";

const dateLong = new Date();
const optionLong = {
  month: "long",
    day: "numeric",
    year: "numeric"
  };
const dateShort = new Date();
const optionShort = {
  month: "short",
    day: "numeric",
  };
const dateOnlyYear = new Date();
const optionOnlyYear = {
    year: "numeric"
    };

const postDateLong = dateLong.toLocaleDateString("en-US", optionLong);
const postDateShort = dateShort.toLocaleDateString("en-US", optionShort);
const pageOnlyYear = dateOnlyYear.toLocaleDateString("en-US", optionOnlyYear);

let allPostItem = [];
// var postItem = {
//   postTitle6: postTitle6,
//   postBody6: postBody6
// };



// app.get("/", function(request, response){
//   var postTitle1 = "";
//   var postBody1 = "";
//   response.render("index", {
//     // postTitle1: repPostTitle1,
//     // postBody1: repPostBody1,
//     spostDate: postDateShort,
//     lpostDate: postDateLong, mainBlogYear: pageOnlyYear,
//     allPostItem: allPostItem
//   });
// });

app.get("/publish", function(request, response){
  response.render("publish", {mainBlogYear: pageOnlyYear});
});

app.post("/publish", function(request, response){
  var postItem = {
    postTitle6: request.body.post_title,
    postCategory6: request.body.post_category,
    postImage6: request.body.post_image,
    postBody6: request.body.main_post
  };
    allPostItem.push(postItem);
    response.redirect("/");
});

app.get("/posts/:titlePost", function (request, response){
  var requestedTitle = _.lowerCase(request.params.titlePost);

  allPostItem.forEach(function(postItem){
    var storedTitle = _.lowerCase(postItem.postTitle6);

    if (storedTitle === requestedTitle){
      response.render("singlepost.ejs", {repPostTitle1: postTitle1,
        repPostBody1: postBody1, spostDate: postDateShort,
        lpostDate: postDateLong, mainBlogYear: pageOnlyYear,
        allPostItem: allPostItem, postTitle6: postItem.postTitle6,
      postCategory6: postItem.postCategory6,
      postImage6: postItem.postImage6,
    })
    }
  })

})


app.get("/", function(request, response){

  response.render("index", {
    postTitle6: postItem.postTitle6,
    postCategory6: postItem.postCategory6,
    postImage6: postItem.postImage6
    postBody6: postItem.postBody6
    spostDate: postDateShort,
    lpostDate: postDateLong, mainBlogYear: pageOnlyYear,
    allPostItem: allPostItem
  });
});


app.listen(3000, function(){
  console.log(startSuccessMsg + " " + port);
});



// const postTitle2 = "Title of Feature Post Under World Category";
// const postBody2 = "vision of academic success for all students Newcomers to the education discussion might find this puzzling: Hasn’t concern with the academic achievement of every student always topped principals’ agendas? The short answer is, no. Historically, public school principals were seen as school managers, and as recently as two decades ago, high standards were thought to be the province of the college bound. could be defined as entry-level manufacturing work for students who had followed a and low-skilled employment for dropouts. Only in the last few decades has the emphasis shifted to academic expectations for all. Having high expectations for all is one key to closing the achievement gap between advantaged and less advantaged students.";
//
// const postTitle3 = "Title of Post Under Design Category";
// const postBody3 = "academic success for all students Newcomers to the education discussion might find this puzzling: Hasn’t concern with the academic achievement of every student always topped principals’ agendas? The short answer is, no. Historically, public school principals were seen as school managers, and as recently as two decades ago, high standards were thought to be the province of the college bound. could be defined as entry-level manufacturing work for students who had followed a and low-skilled employment for dropouts. Only in the last few decades has the emphasis shifted to academic expectations for all. Having high expectations for all is one key to closing the achievement gap between advantaged and less advantaged students.";
//
// const postTitle4 = "Title of Sample Blog Post";
// const postBody4 = "success for all students Newcomers to the education discussion might find this puzzling: Hasn’t concern with the academic achievement of every student always topped principals’ agendas? The short answer is, no. Historically, public school principals were seen as school managers, and as recently as two decades ago, high standards were thought to be the province of the college bound. could be defined as entry-level manufacturing work for students who had followed a and low-skilled employment for dropouts. Only in the last few decades has the emphasis shifted to academic expectations for all. Having high expectations for all is one key to closing the achievement gap between advantaged and less advantaged students.";
//
// const postTitle5 = "Title of Another Blog Post";
// const postBody5 = "students Newcomers to the education discussion might find this puzzling: Hasn’t concern with the academic achievement of every student always topped principals’ agendas? The short answer is, no. Historically, public school principals were seen as school managers, and as recently as two decades ago, high standards were thought to be the province of the college bound. could be defined as entry-level manufacturing work for students who had followed a and low-skilled employment for dropouts. Only in the last few decades has the emphasis shifted to academic expectations for all. Having high expectations for all is one key to closing the achievement gap between advantaged and less advantaged students.";
//
// let postTitle6 = "";
// let postImage6 = "";
// let postCategory6 = "";
// let postBody6 = "";

//
// repPostTitle6: allPostItem[postItem.postTitle6], repPostBody6: allPostItem[postItem.postBody6],
// repPostImage6: allPostItem[postItem.postImage6], repPostCategory6: allPostItem[postItem.postCategory6]
//
// repPostTitle6: postItem.postTitle6, repPostBody6: postItem.postBody6,
// repPostImage6: postItem.postImage6, repPostCategory6: postItem.postCategory6
