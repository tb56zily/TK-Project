var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');



// set up a mongoose model
var ReviewSchema = new Schema({


  _id:{ type: Number , unique: true },
  assignment_id: { type: Number, required: true,trim: true },
  submission_id : {type: Number, required: true,  trim: true},
  reviewer_experties: {type: String, required: true, trim: true},
  overall_evaluation:{type: String, required: true,  lowercase: true,  trim: true},
  summary:{type: String, required: true,  trim: true},
  major_strong_points: {type: String, required: true,  trim: true},
  major_strong_points :{type: String, required: true,  trim: true},
  detailed_comments:{type: String, required: true,  trim: true},


});

ReviewSchema.pre('save', true, function(next, done) {
  // calling next kicks off the next middleware in parallel
  next();
  setTimeout(done, 100);
});


ReviewSchema.statics.findReviewBySubmissionID = function (subId, cb) {
  this.find({ submission_id: subId }, cb);
};



module.exports = mongoose.model('Review', ReviewSchema);
