const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { PORT } = require('./config');
const db = require('./models');
const { USERROUTE } = require('./routes/userRoute');
const { AUTHROUTE } = require('./routes/authRoute');
const { CANDIDATESROUTE } = require('./routes/candidateRoute');
const { VOTESROUTE } = require('./routes/voteRoute');

const port = PORT || 5001;


app.use(cookieParser());

app.use(
  cors({
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTION', 'PUT'],
    credentials: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/api/v1/auth/', AUTHROUTE);
app.use('/api/v1/users', USERROUTE);
app.use('/api/v1/candidates', CANDIDATESROUTE);
app.use('/api/v1/vote', VOTESROUTE);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
  });
});
