const connection = require("../config/connection.js");
const { query } = require("express");

function printQuestionMarks(num) {
    var arr = [];

    for (var i=0; i<num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        arr.push(key + "=" + ob[key]);
      }
    
      return arr.toString();

    // for (var key in ob) {
    //     var value = ob[key];
    //     if(Object.hasOwnProperty.call(ob.key)) {
    //         if (typeof value === "string" && value.indexOf(" ") >= 0) {
    //             value = "'" + value + "'";
    //         }
    //         return arr.toString();
    //     }
    // }
}

const orm = {

    selectAll: function(table, cb) {
        const queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne : function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }



    // selectAll: function () {
    //     let queryString = "SELECT * FROM burgers";
    //     connection.query(queryString, function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //     });
    // },
    // insertOne: function (burger_name) {
    //     let queryString = "INSERT INTO burgers (burger_name) VALUES ??";
    //     connection.query(queryString, burger_name, function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //     })
    // },
    // updateOne: function (isDevoured) {
    //     let queryString = "UPDATE burgers SET ?? WHERE devoured";
    //     connection.query(queryString, isDevoured, function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //     })
    // }

};

module.exports = orm;