var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sitearcheologiqueRouter=require('./routes/sitearcheologique');
var visiteRouter=require('./routes/visite');
var userRouter=require('./routes/user');
var likesCtrlRouter=require('./routes/likesCtrl');
var messagesCtrlRouter=require('./routes/messagesCtrl');
var likeRouter=require('./routes/like');
var dislikeRouter=require('./routes/dislike');
var commentRouter=require('./routes/comment');
var likecommentRouter=require('./routes/likecomment');
var dislikecommentRouter=require('./routes/dislikecomment');
var participantRouter=require('./routes/participant');
var postRouter=require('./routes/post');
var likepostRouter=require('./routes/likepost');
var dislikepostRouter=require('./routes/dislikepost');
var commentpostRouter=require('./routes/commentpost');
var signalisationRouter=require('./routes/signalisation');
var commentsignalRouter=require('./routes/commentsignal');

var app = express();
var db=require('./models');
db.sequelize.sync().then(()=>{
console.log('db connected')
});
// Body Parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/s', sitearcheologiqueRouter);
app.use('/v', visiteRouter);
app.use('/user', userRouter);
app.use('/l', likesCtrlRouter);
app.use('/message',messagesCtrlRouter);
app.use('/like', likeRouter);
app.use('/dislike', dislikeRouter);
app.use('/comment', commentRouter);
app.use('/likecomment', likecommentRouter);
app.use('/dislikecomment', dislikecommentRouter);
app.use('/participant', participantRouter);
app.use('/post', postRouter);
app.use('/likepost', likepostRouter);
app.use('/dislikepost', dislikepostRouter);
app.use('/commentpost', commentpostRouter);
app.use('/signalisation', signalisationRouter);
app.use('/commentsignal', commentsignalRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
