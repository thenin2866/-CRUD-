let mysql = require('mysql')
let connection = mysql.createConnection({
    host:"mysql.mysql.svc.cluster.local",
    user:"root",
    password:"HBAbXR7Vv7",
    database:"nodejs_crud",
    port:3306
})

connection.connect((error)=>{
    if (!!error){
        console.log(error);
    } else {
        console.log('Connected...')
    }
})

module.exports = connection;