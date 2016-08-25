var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


// set up a mongoose model
var ConferenceSchema = new Schema({

  _id:{ type: Number , unique: true},
  topic: { type: String, required: true,trim: true },
  sub_status : {type: String, required: true,  trim: true},
  review_status: {type: String, required: true, trim: true},
  chair:{type: String, required: true,  lowercase: true,  trim: true},
  detail:{type: String, required: true,  trim: true},
  sub_start_date :{type: String, required: true,  trim: true},
  sub_end_date:{type: String, required: true,  trim: true},
  review_start_date:{type: String, required: true,  trim: true},
  review_end_date:{type: String, required: true,  trim: true}

});

ConferenceSchema.pre('save', true, function(next, done) {
  // calling next kicks off the next middleware in parallel
  next();
  setTimeout(done, 100);
});


ConferenceSchema.statics.findConferenceByTopic = function (id,cb) {
  console.log("topic inside db:" + id);
  this.find({ topic: id },cb);
};

module.exports = mongoose.model('Conference', ConferenceSchema);
