var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    email: {
        type: String, 
        required: true,
        match:  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
        },
    password: {type: String, required: true},
    gender: String,
    DOB: Date,
    status: String
})

module.exports = mongoose.model('User', userSchema);