'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaySchema = new Schema({
    result: [],
});

module.exports = mongoose.model('Play', PlaySchema);