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
  ovrEval:{type: String,  trim: true},
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

ReviewSchema.statics.updateReviewById = function (newReview, cb) {

this.findOneAndUpdate({ _id: newReview._id},
  { rvExp: newReview.rvExp, ovrEval :newReview.ovrEval , summary : newReview.summary, major_strong_points : newReview.major_strong_points,
  major_weak_points : newReview.major_weak_points, detailed_comments : newReview.detailed_comments  },
  function(err, updateRecord)
  {
  if (err) throw err;
  console.log(updateRecord);
});
};

ReviewSchema.plugin(autoIncrement.plugin, 'Review');
module.exports = mongoose.model('Review', ReviewSchema);
