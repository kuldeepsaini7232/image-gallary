
// Step 3 - this is the code for ./models.js
 
var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});


 
module.exports = new mongoose.model('Image', imageSchema);