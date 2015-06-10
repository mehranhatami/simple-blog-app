var MongoClient = require('mongodb').MongoClient,
  format = require('util').format,
  mongodbUrl = 'mongodb://127.0.0.1:27017/blog-app',
  blogDB = {};

blogDB.findAll = function (collectionName, callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;

    var collection = db.collection(collectionName);

    collection.find().toArray(function (err, results) {
      callback(err, results);
      // Let's close the db
      db.close();
    });
  });
};

blogDB.find = function (collectionName, searchObject, callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;

    var collection = db.collection(collectionName);

    collection.find(searchObject).toArray(function (err, results) {
      callback(err, results);
      // Let's close the db
      db.close();
    });
  });
};

blogDB.insert = function (collectionName, insertObject, callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;

    var collection = db.collection(collectionName);

    collection.insert(insertObject, function (err, docs) {
      if (err) {
        callback(err, null);
      } else {
        // Locate all the entries using find
        collection.find().toArray(function (err, results) {
          callback(null, results);
          // Let's close the db
          db.close();
        });
      }
    });
  });
};

blogDB.update = function (collectionName, conditionObject, updateObject, callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;

    var collection = db.collection(collectionName);
    collection.update(conditionObject, updateObject, {upsert:true}, function(err, result) {
      if (err) throw err;
      callback(null, result);
      db.close();
    });
  });
};

blogDB.posts = function (callback) {
  blogDB.findAll('posts', callback);
};

blogDB.posts.insert = function (postObject, callback) {
  blogDB.insert('posts', postObject, callback);
};

blogDB.posts.update = function (searchObject, postObject, callback) {
  blogDB.update('posts', searchObject, postObject, callback);
};

blogDB.comments = function (searchObject, callback) {
  blogDB.find('comments', searchObject, callback);
};

blogDB.comments.insert = function (commentObject, callback) {
  blogDB.insert('comments', commentObject, callback);
};

module.exports = blogDB;