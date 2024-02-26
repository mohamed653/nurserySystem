const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const addressSchema = mongoose.Schema({
    city: {type: String},
    street: {type: String},
    building: {type: Number}
},
{_id: false})


const Schema = mongoose.Schema({
    cid: {type: Number, unique: true},
    fullName: {type: String,  required: true},
    age: {type: Number, required: true},
    level: {type: String, enum:["PreKG", "KG1", "KG2"], required: true},
    address: addressSchema
})
Schema.set('toObject', { virtuals: true });
Schema.set('toJSON', { virtuals: true });

Schema.virtual('id').get(function() {
    return this.cid;
});
Schema.plugin(AutoIncrement, { inc_field: 'cid' });
module.exports = mongoose.model("children", Schema);