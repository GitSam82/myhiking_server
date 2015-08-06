var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
fullName: {type:String, required:true},
email: {type:String, required:true, unique:true},
password : {type:String, required:true},
perm_stat: String,
perm_map : String
});
module.exports = mongoose.model('User', UserSchema);