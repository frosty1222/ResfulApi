const path = require('path');
const express = require('express');
var cors = require('cors');
const app = express();
const db =require('./dbconnect');
const route = require('./routes');
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    }),
);
// app.use('/api', route);
db.connect();
app.use(cors({
    origin:'*'
}));
app.use(express.static('uploads'));
route(app);
app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})