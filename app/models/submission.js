var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');



// set up a mongoose model
var SubmissionSchema = new Schema({

  _id:{ type: Number , unique: true },
  title: { type: String, required: true,trim: true },
  authors : {type: String, required: true,  trim: true},
  abstract: {type: String, required: true, trim: true},
  keywords:{type: String, required: true,  lowercase: true,  trim: true},
  filename:{type: String, required: true,  trim: true},
  last_name: {type: String, required: true,  trim: true},
  status :{type: String, required: true,  trim: true},
  conferenceId:{type: String, required: true,  trim: true},
  username:{type: String, required: true,  trim: true},

});

SubmissionSchema.pre('save', true, function(next, done) {
  // calling next kicks off the next middleware in parallel
  next();
  setTimeout(done, 100);
});


SubmissionSchema.statics.findSubmissionByUserName = function (name, cb) {
  this.find({ username: name }, cb);
};

SubmissionSchema.statics.findAllSubmissions = function (cb) {
  this.find(cb);
};

SubmissionSchema.statics.findAllSubmittedUsers = function (cb) {
  this.distinct('username');
};

//To remove
SubmissionSchema.statics.removeSubmissionById = function (subId, cb) {
  this.remove( { _id:subId },cb);
};



module.exports = mongoose.model('Submission', SubmissionSchema);
