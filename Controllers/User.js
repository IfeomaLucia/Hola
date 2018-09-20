var User = require('../Models/User');
var bcrypt = require('bcrypt')

exports.addUser = function(req, res){
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        DOB: req.body.DOB
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
        console.log('Server error -> ' + exception);
    }
}

exports.getUsers = function(req, res){
    try {
        User.find((err, users) => {
            if(err){
                res.status(500).json({Err: err, message: 'Error occured'})
            } else if (users.length == 0){
                res.status(200).json({message: 'User list is empty'})
            }else {
                res.status(200).json(users)
            }
        })
        .select('-__v -password')  
    } catch (exception) {
        console.log('Server error ->' + exception)
    }
}

exports.loginUser = function(req, res){
    try {
        User.findOne({email: req.body.email}, (err, user) =>{
            if(err){
                res.status(500).json({Err: err, message: 'Couldn\'t find the user with given mail'})
            } else if(user == null){
                res.status(401).json({message: 'User does not exist'});
            } else {
                var validPassword = bcrypt.compareSync(req.body.password, user.password);
                if(user && validPassword){
                    res.status(200).json({userId: user._id, message:'Login successful'})
                }else{
                    res.json({message: 'Email/password incorrect'})
                }
            }
        }) 
    } catch (exception) {
        console.log('Server error -> ' + exception)
    }
}

exports.deleteUser = function(req, res){
    var id = {_id: req.params.id};
    User.remove(id, (err) => {
        if(err){
            res.status(500).json({Err: err, message: 'Error occured'});
        }else{
            res.status(200).json({message: 'User deleted successfully'})
        }
    })
}