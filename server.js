var express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  error = require('./error'),
  routes = require('./routes'),
  app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());


app.use(express.static('path/to/png/gif/and/js/files'));

//app.set('view engine', 'ejs');

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.set('views', __dirname + '/app');

routes(app);

app.use(express.static(path.join(__dirname, 'app')));

error(app);

app.set('port', 4000);

var server = app.listen(4000, function () {
  console.log('Express server listening on port ' + server.address().port);
});