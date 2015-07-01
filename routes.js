var blogDB = require('./blogDB'),
  fs = require('fs');

module.exports = function (app) {

  app.get("/posts", function (req, res) {
    blogDB.posts(function (err, results) {
      console.log('Hello world! this is your data:', results);
      res.json(results);
    });
  });

  app.post("/posts", function (req, res) {
    blogDB.posts.insert(req.body, function (err, results) {
      res.json(results);
    });
  });

  app.put("/posts/:id", function (req, res) {
    blogDB.posts.update({
        postId: parseInt(req.params.id, 10)
      },
      req.body,
      function (err, result) {
        res.json(result);
      });
  });

  app.get("/posts/:id/comments", function (req, res) {
    blogDB.comments({
        postId: parseInt(req.params.id, 10)
      },
      function (err, results) {
        res.json(results);
      }
    );
  });

  app.post("/posts/:id/comments", function (req, res) {
    blogDB.comments.insert(req.body, function (err, result) {
      res.json(result);
    });
  });

  app.get(/^[^.]+$|\.(?!(js|gif|png|hbs)$)([^.]+$)/, function (req, res) {
    blogDB.posts(function (err, results) {
      res.render("index.html", {
        posts: JSON.stringify(results)
      });
    });
  });
};