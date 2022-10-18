
var express = require('express');
var path = require('path');

const Router = require('./router/router');
const PORT = process.env.PORT || 3000

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const fileUpload  = require('express-fileupload');
app.use(fileUpload());
app.use(Router);




app.listen(PORT,()=>{
    console.log(`Server is running http://localhost:${PORT}`);
})