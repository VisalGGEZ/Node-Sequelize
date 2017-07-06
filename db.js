/**
 * Created by Visal on 7/4/2017.
 */
var Sequelize = require('sequelize')
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': 'basic-sqlite-database.sqlite'
})

var db = {}

db.user = sequelize.import(__dirname + '/model/user-model.js')

db.sequelize = sequelize
db.Sequelize = Sequelize

// function syncDB() {
//     sequelize.sync({force: true}).then(function () {
//         console.log('Database is synced');
//     });
// }


module.exports = db;