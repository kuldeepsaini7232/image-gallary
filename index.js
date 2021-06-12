var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
const  imgModel = require('./model');
mongoose.connect('mongodb://localhost:27017/image',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err);
})
var fs = require('fs');
var path = require('path');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Set EJS as templating engine
app.set("view engine", "ejs");
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });
app.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('index', { items: items });
        }
    });
});
app.post('/', upload.single('image'), (req, res, next) => {
 
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/');
        }
    });
});
app.listen(1100,()=>{
    console.log("suceess");
})