const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const authController = require('./controllers/auth.js');
const vinosController = require('./controllers/vinos.js');

const port = process.env.PORT || 3000;
const path = require('path')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const passUserToView = require('./middleware/pass-user-to-view.js');
app.use(passUserToView);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
    vinos: [],
  });
});

const usersController = require('./controllers/shaina.js')

app.use('/auth', authController);
const isSignedIn = require('./middleware/is-signed-in.js');
app.use('/users/:userId/vinos', vinosController);
app.use('/shaina', usersController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
// app.get('/vip-lounge', (req, res) => {
//   if (req.session.user) {
//     res.send(`Welcome to the party ${req.session.user.username}.`);
//   } else {
//     res.send('Sorry, no guests allowed.');
//   }
// });