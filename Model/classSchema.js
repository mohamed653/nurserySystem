const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema({
    className: {type: String, required: true},
    supervisor: {type: Number, ref: "teachers", required: true},
    children: [{type: Number, ref: "children"}]
})


Schema.plugin(AutoIncrement, {inc_field: "classId"});
module.exports = mongoose.model("classes", Schema);