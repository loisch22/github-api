var PromiseRepo = require('../js/github.js').promiseRepoModule;

$(function(){
  $("#submit").click(function(){
    $("#repos table").empty();
    $("#followers").empty();
    let username = $("#username").val();
    $("#username").val("");
    let newUser = new PromiseRepo();
    console.log("front end user name: " + newUser);
    newUser.promiseRepo(username);
    newUser.promiseFollowers(username);
  });
});
