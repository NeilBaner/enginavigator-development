const mysql = require('mysql');
const config = require('./config.json');

const pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpass,
    database: config.dbname
});

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err);
        }
        let sqlString;
        if (event.params.querystring.type == 'search') {
            sqlString = 'SELECT * FROM vertices WHERE vertex_hidden = 0 AND vertex_name LIKE %'
                + event.params.querystring.query + '%;';
        } else {
            sqlString = '';
        }
        connection.query(sqlString, (err, results, fields) => {
            if (err) {
                callback(err);
            }else {
                callback(null, results);
            }
        });
    });
};