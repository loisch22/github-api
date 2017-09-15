let PromiseRepo = function() {
  // this.userName = userName;
  // this.abc = function()
  // {
  //   console.log("exec");
  // }
}

PromiseRepo.prototype.promiseRepo = function(userName) {

  let promiseRepo = new Promise(function(resolve,reject)
  {
    let xhr = new XMLHttpRequest();
    let url = `https://api.github.com/users/${userName}/repos`;
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
    // console.log("this is" );
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
    });
  }

PromiseRepo.prototype.promiseFollowers = function(userName)
    {
      console.log("I AM WORKING ON FOLLOWERS FOR " + userName );
      var promiseF = new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      let url = `https://api.github.com/users/${userName}/followers`;
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
      promiseF.then(function(response) {
        let body = JSON.parse(response);
        for (let i=0; i<body.length; i++) {
          //Place this in the UI logic, create an objectArr instead and return the objectArr to UI logic
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
          // console.log($(".followerId").text());
        }
        $(".followerId").click(function()
        {
          console.log("hello");
          var clicked = $(this).text();
          $("#repos table").html("");
          $("#followers").html("");

          let promiseFollowersRepos = new Promise(function(resolve,reject){

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
        promiseFollowersRepos.then(function(response){

        let body = JSON.parse(response);
        $("#repos table").empty();
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
          console.log("repo id is: " + body[i].id + "repo name is : " + body[i].name);
        }
        let newUser = new PromiseRepo();
        newUser.promiseFollowers(clicked);
      },
        function(error) {
          $("#errorRepos").append(`Your repository code has some error : ${error.message}`);
        });
      });

      },
      function(error) {
        $("#errorFollowers").append(`Your follower code has some error : ${error.message}`);
      });
}


exports.promiseRepoModule = PromiseRepo;
