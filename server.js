/**
 * Created by Visal on 7/4/2017.
 */
var express = require('express')
var app = express()
var PORT = process.env.PORT || 3000
var db = require('./db')

app.get('/user/:userName', function (req, res) {
    var usrName = req.params.userName

    db.user.findAll({
        where: {user_Name: usrName}
    }).then(function (user) {
        res.json({
            data: user,
            message: 'success'
        })
    })
})

app.put('/user/age', function (req, res) {
    var age = req.param('age');
    var userName = req.param('userName');

    db.user.update(
        {age: age},
        {where: {user_Name: userName}}
    ).then(function (done) {
        if(done){
            res.json({
                message: true,
                result_message: 'Update age success.'
            })
        }
    })

    // db.user.find({where: {user_Name: userName}})
    //     .on('success', function (user) {
    //         if(user){
    //             user.updateAttributes({
    //                 age: age
    //             }).success(function (user) {
    //                 res.json(user)
    //             })
    //         }
    //     })
})

app.post('/user/update/password/', function (req, res) {
    var userName = req.param('userName')
    var oldPassword = req.param('oldPassword')
    var newPassword =  req.param('newPassword')

    db.user.update(
        {password: newPassword},
        {where: db.Sequelize.and(
            {user_Name: userName},
            {password: oldPassword}
        )}
    ).then(function (done) {
        if(done == 1){
            res.json({
                message: true,
                result_message: 'Update password successful.'
            })
        }else{
            res.json({
                message: true,
                result_message: 'Update password unsuccessful.'
            })
        }
    })
})

app.post('/user', function (req, res) {
    var firstName = req.param('firstName')
    var lastName = req.param('lastName')
    var age = req.param('age')
    var userName = firstName + lastName
    var pass = req.param('password')

    db.user.create({
        first_name: firstName,
        last_name: lastName,
        user_Name: userName,
        age: age,
        password: pass
    }).then(function (user) {
        console.log(user)
        var data = {
            data: {
                user_name: user.user_Name,
                password: user.password
            },
            message: 'success'
        }
        res.json(data)
    })
})

app.put('/user', function (req, res) {
    var fname = req.param('firstName')
    var lName = req.param('lastName')

    db.user.update(
        {last_name: 'ddfdfdf'},
        {where: {_id: 1}}
    ).then(function (user) {
        res.json(user)
    })
})

// db.sequelize.sync({force:true}).then(function () {
//     console.log("Database starts sync...!")
// })

app.listen(PORT, function () {
    console.log('Server started at port: ' + PORT)
})
