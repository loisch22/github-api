$(function(){

  $("#submit").click(function(){

    let username = $("#username").val();
    $("#username").val("");

    let promiseRepo = new Promise(function(resolve,reject)
    {
      let xhr = new XMLHttpRequest();
      let url = `https://api.github.com/users/${username}/repos`;
      xhr.onload = function()
      {
        if(xhr.status === 200)
        {
          resolve(xhr.response);
        }
        else
        {
          reject(Error(xhr.statusText));
        }
      };
      xhr.open("GET", url,true);
      xhr.send();
    });

    promiseRepo.then(function(response){
      let body = JSON.parse(response);
      console.log("this is" );
      for(var i=0; i<body.length; i++)
      {
          $("#repos table").append("<tr>");
          $("#repos table").append("<td>");
          $("#repos table").append(body[i].id);
          $("#repos table").append("</td>");
          $("#repos table").append("<td>");
          $("#repos table").append(body[i].name);
          $("#repos table").append("</td>");
          $("#repos table").append("</tr>");
        }
      },
      function(error)
      {
        $("#errorRepos").append(`Your repository code has some error : ${error.message}`);
      }).then(function(){
          var promiseFollowers = new Promise(function(resolve, reject) {
          let xhr = new XMLHttpRequest();
          let url = `https://api.github.com/users/${username}/followers`;
          xhr.onload = function() {
            if (xhr.status === 200) {
              resolve(xhr.response);
            } else {
              reject(Error(xhr.statusText));
            }
          };
          xhr.open("GET", url, true);
          xhr.send();
        });

        promiseFollowers.then(function(response) {
          let body = JSON.parse(response);
          for (let i=0; i<body.length; i++) {
            $("#followers").append("<tr>");
            $("#followers").append("<td>");
            $("#followers").append("<a><div class='followerId'>" + body[i].login + " " + "</div></a>");

            $("#followers").append("</td>");
            $("#followers").append("<td>");
            $("#followers").append(body[i].id);
            $("#followers").append("</td>");
            $("#followers").append("<td>");
            $("#followers").append(body[i].html_url);
            $("#followers").append("</td>");
            $("#followers").append("</tr>");
            console.log($(".followerId").text());
          }
        },
        function(error) {
          $("#errorFollowers").append(`Your follower code has some error : ${error.message}`);
        }).then(function(){
          $(".followerId").click(function(){
          var clicked = $(this).text();
          $("#repos table").html("");
          $("#followers").html("");
          let promiseFollowersId = new Promise(function(resolve,reject){
          let xhr = new XMLHttpRequest();
          let url = `https://api.github.com/users/${clicked}/repos`;
          xhr.onload=function()
          {
            if (xhr.status === 200) {
              resolve(xhr.response);
            } else {
              reject(Error(xhr.statusText));
            }
          };
          xhr.open("GET", url, true);
          xhr.send();
        });
        promiseFollowersId.then(function(response){
          let body = JSON.parse(response);
          for(var i=0; i<body.length; i++)
          {
            $("#repos table").append("<tr>");
            $("#repos table").append("<td>");
            $("#repos table").append(body[i].id);
            $("#repos table").append("</td>");
            $("#repos table").append("<td>");
            $("#repos table").append(body[i].name);
            $("#repos table").append("</td>");
            $("#repos table").append("</tr>");
          }
        },
        function(error)
        {
          $("#errorRepos").append(`Your repository code has some error : ${error.message}`);
        }).then(function(response){
          let body = JSON.parse(response);
          for (let i=0; i<body.length; i++) {
            $("#followers").append("<tr>");
            $("#followers").append("<td>");
            $("#followers").append("<a><div class='followerId'>" + body[i].login + " " + "</div></a>");

            $("#followers").append("</td>");
            $("#followers").append("<td>");
            $("#followers").append(body[i].id);
            $("#followers").append("</td>");
            $("#followers").append("<td>");
            $("#followers").append(body[i].html_url);
            $("#followers").append("</td>");
            $("#followers").append("</tr>");
            console.log($(".followerId").text());
          }
        },
        function(error) {
          $("#errorFollowers").append(`Your follower code has some error : ${error.message}`);
        })

        });
      });
  });
});
});
