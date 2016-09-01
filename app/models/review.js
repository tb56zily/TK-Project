var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var autoIncrement = require('mongoose-auto-increment');


// set up a mongoose model
var ReviewSchema = new Schema({


  _id:{ type: Number , unique: true },
  assignment_id: { type: Number, required: true,trim: true },
  submission_id : {type: Number, required: true,  trim: true},
  rvExp: {type: String,trim: true},
  ovrEval:{type: String, lowercase: true,  trim: true},
  summary:{type: String, trim: true},
  major_strong_points: {type: String, trim: true},
  major_weak_points :{type: String, trim: true},
  detailed_comments:{type: String, trim: true},
});

ReviewSchema.pre('save', true, function(next, done) {
  // calling next kicks off the next middleware in parallel
  next();
  setTimeout(done, 100);
});


ReviewSchema.statics.findReviewBySubmissionID = function (subId, cb) {
  this.find({ submission_id: subId }, cb);
};


ReviewSchema.plugin(autoIncrement.plugin, 'Review');
module.exports = mongoose.model('Review', ReviewSchema);
