const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { port, db } = require('./config');
const router = require('./router');

const app = express();
mongoose.connect(db, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(morgan('combined'));
app.use(cors());
app.enable('trust proxy');
app.use(bodyParser.json({type: '*/*'}));

router(app);

app.use('/home', require('./routes/userroute'));
app.use('/leave', require('./routes/leaveroute'));

app.listen(port, () => {
  console.log(`Server started on port  + ${port}`);
});
