const mysql = require('mysql');
const config = require('./config.json');

const pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpass,
    database: config.dbname
});

class PriorityQueue{
    
}

class Graph {
    constructor(){
        this.nodes = [];
        this.adjacencyList = {};
    }
    addNode(node){
        this.nodes.push(node);
        this.adjacencyMatrix[node] = [];
    }
    addEdge(start, end, weight){
        if(!this.nodes.includes(start)){
            this.nodes.push(start);
        }
        if(!this.nodes.includes(end)){
            this.nodes.push(end);
        }
        this.adjacencyMatrix[start][end] = weight;
    }

}

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    let sqlString = "SELECT * FROM edges";
    let start, end;
    let map = Graph();
    try {
        start = parseInt(event.params.querystring.start);
        end = parseInt(event.params.querystring.end);
    } catch (err) {
        callback(null, "Bad Request: Start and End should be integers.");
    }
    pool.getConnection((err, connection) => {
        if (err) {
            callback(null, "Error getting connection: \n" + err);
        } else {
            connection.query(sqlString, (err, results, fields) => {
                if (err) {
                    callback(null, "Error making query: \n" + err);
                } else {
                    results.forEach(element => {
                        map.addEdge(element.edge_start, element.edge_end, element.edge_weight);
                    });
                }
            });
        }
    });
};