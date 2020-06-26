const mysql = require('mysql');
const config = require('./config.json');

const pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpass,
    database: config.dbname
});

function createResponse(body){
    let response = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {},
        "multiValueHeaders": {},
        "body": body
    };
    return response;
}

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    if(event.params.querystring.)
    pool.getConnection((err, connection) => {
        
        if (err) {
            callback(err);
        }
        let sqlString;
        
        // if(event.params.querystring == null){
        //     callback(null, "Hi");
        // }
        // if (event.params.querystring.type == 'search') {
        //     sqlString = 'SELECT * FROM vertices WHERE vertex_hidden = 0 AND vertex_name LIKE %'
        //         + event.params.querystring.query + '%;';
        // } else {
        //     sqlString = '';
        // }
        // connection.query(sqlString, (err, results, fields) => {
        //     if (err) {
        //         callback(err);
        //     }else {
        //         callback(null, results);
        //     }
        // });
        callback(null, "hi");
    });
};