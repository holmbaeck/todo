'use strict';

var Datastore = require('nedb');
console.log("Loading DB data");
var db = new Datastore({ filename: './db/todos.db', autoload: true });

exports.list_all_tasks = function (req, res) {
    console.log("Getting all tasks");
    res.json(db.getAllData());
};


exports.create_a_task = function (req, res) {
    db.insert(req.body, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_task = function (req, res) {
    db.findOne({ _id: req.params.taskId }, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.update_a_task = function (req, res) {
    db.update({ _id: req.params.taskId }, req.body, function (err, noOfUpdates) {
        if (err) {
            res.send(err);
        }
        res.json({message: "Updated " + noOfUpdates + " task(s)"});
    })

};


exports.delete_a_task = function (req, res) {
    db.remove({ _id: req.params.taskId }, function (err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};