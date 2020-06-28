const mysql = require('mysql');
const config = require('./config.json');
const Graph = require('node-dijkstra');

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
    let start, end;
    let nodes = [];
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err);
        }
        let sqlString = "SELECT * FROM vertices";
        let map = new Graph();
        connection.query(sqlString, (err, results, fields) => {
            if(err) {
                callback(err);
            }else{
                results.forEach(node => {
                    nodes.push(node.vertex_id);
                });
                nodes.forEach(node => {
                    sqlString = "SELECT * FROM edges WHERE edge_start = " + node.vertex_id + ";";
                    connection.query(sqlString, (err, results, fields) => {
                        let nodeToAdd = new Map();
                        let startNode;
                        results.forEach(edge => {
                            startNode = edge.edge_start;
                            nodeToAdd.set(toString(edge.edge_end), edge.edge_weight);
                        });
                        map.set(toString(startNode), nodeToAdd);
                    });
                });
                let path = map.path(start, end);
                callback(null, path);
            }
        })
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