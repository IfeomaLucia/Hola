var User = require('../Models/User');
var bcrypt = require('bcrypt')

exports.addUser = function(req, res){
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        DOB: req.body.DOB,
        status: req.body.status
    }
    try {
        User.findOne({$or: [{username: data.username}, {email: data.email}]}, function(err, user){
            if(user != null){
                res.status(409).json({message: 'Username/email already exists'})
            } else {
                bcrypt.hash(data.password, 10, (err, hash) =>{
                    data.password = hash;
                    User.create(data, (err) =>{
                        if(err){
                            res.status(500).json({Err: err, message: 'Error occured while creating user'})
                        } else {
                            res.status(201).json({message: 'User created successfully'});
                        }
                    })
                })
            }
        })
    } catch (exception) {
        console.log('Error: ' + exception)
    }
}

exports.getUsers = function(req, res){
    try {
        User.find((err, users) => {
            if(err){
                res.status(500).json({Err: err, message: 'Error occured'})
            } else if (users.length == 0){
                res.status(200).json({message: 'No user exists'})
            }else {
                res.status(200).json(users)
            }
        })
        .select('-__v')  
    } catch (exception) {
        console.log('Error: ' + exception)
    }
}