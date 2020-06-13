const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimite = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const userRouter = require('./routes/userRoutes.js');
const cardRouter = require('./routes/cardRoutes.js');
const viewRouter = require('./routes/viewRoutes.js');

// démarage express
const app = express();

app.enable('trust proxy');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
//1 middleware globaux
// implementation cors
app.use(cors());

app.options('*', cors());
// fichier statique
app.use(express.static(path.join(__dirname, 'public')));

// mise en place des http headers sécurisé
app.use(helmet());

// developement loging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limitation des requete d'une même adresse ip
const limiter = rateLimite({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP , please try again in an hour!',
});

app.use('/api/', limiter);

// permet req.body
app.use(
  express.json({
    limit: '10kb',
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);
app.use(cookieParser());

// DATA sanitization contre NoSQL query injection
app.use(mongoSanitize());
// DATA sanitization contre XSS
app.use(xss());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use(compression());

// test midleware
app.use((req, res, next) => {
  req.resquestTime = new Date().toISOString();

  next();
});

// 3)  gestion des Routes
app.use('/', viewRouter);
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/users', userRouter);

// GESTION DES MAUVAISE ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
