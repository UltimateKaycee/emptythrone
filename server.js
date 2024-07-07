//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

const port = 3000;
const startSuccessMsg = "Server started successfully on port:";

// CONTENT
const postTitle1 = "Title of the largest display post";
const postBody1 = "Shaping a vision of academic success for all students...";

const dateLong = new Date();
const optionLong = {
  month: "long",
  day: "numeric",
  year: "numeric"
};
const dateShort = new Date();
const optionShort = {
  month: "short",
  day: "numeric"
};
const dateOnlyYear = new Date();
const optionOnlyYear = {
  year: "numeric"
};

const postDateLong = dateLong.toLocaleDateString("en-US", optionLong);
const postDateShort = dateShort.toLocaleDateString("en-US", optionShort);
const pageOnlyYear = dateOnlyYear.toLocaleDateString("en-US", optionOnlyYear);

let allPostItem = [];

app.get("/", function (request, response) {
  response.render("index", {
    postTitle1: postTitle1,
    postBody1: postBody1,
    spostDate: postDateShort,
    lpostDate: postDateLong,
    mainBlogYear: pageOnlyYear,
    allPostItem: allPostItem
  });
});

app.get("/publish", function (request, response) {
  response.render("publish", { mainBlogYear: pageOnlyYear });
});

app.post("/publish", function (request, response) {
  let newPostItem = {
    postTitle6: request.body.post_title,
    postCategory6: request.body.post_category,
    postImage6: request.body.post_image,
    postBody6: request.body.main_post
  };
  allPostItem.push(newPostItem);
  response.redirect("/");
});

app.get("/posts/:titlePost", function (request, response) {
  let requestedTitle = _.lowerCase(request.params.titlePost);

  allPostItem.forEach(function (postItem) {
    let storedTitle = _.lowerCase(postItem.postTitle6);

    if (storedTitle === requestedTitle) {
      response.render("singlepost.ejs", {
        repPostTitle1: postItem.postTitle6,
        repPostBody1: postItem.postBody6,
        spostDate: postDateShort,
        lpostDate: postDateLong,
        mainBlogYear: pageOnlyYear,
        postCategory6: postItem.postCategory6,
        postImage6: postItem.postImage6
      });
    }
  });
});

app.listen(port, function () {
  console.log(startSuccessMsg + " " + port);
});
