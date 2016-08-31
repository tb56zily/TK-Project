var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var autoIncrement = require('mongoose-auto-increment');


// set up a mongoose model
var UserSchema = new Schema({
  password: {type: String, required: true,  trim: true},
  email: {type: String, required: true,  lowercase: true, trim: true, unique: true},
  firstname:{type: String, required: true,  trim: true},
  lastname: {type: String, required: true,  trim: true},
  address :{type: String, required: true,  trim: true},
  institute:{type: String, required: true,  trim: true},
  city:{type: String, required: true,  trim: true},
  country:{type: String, required: true,  trim: true},
  postCode: {type: Number, required: true,  trim: true},
  isReviewer: {type: Boolean, default: false},
  isChair: {type: Boolean, default: true}
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    console.log(err)
                    return next(err);

                }
                user.password = hash;
                next();
            });

        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.statics.getAllChair = function (cb) {
  this.find({isChair:true},cb);
};

UserSchema.statics.getAllReviewers = function (cb) {
  this.find({isReviewer:true},cb);
};

UserSchema.plugin(autoIncrement.plugin, 'User');
module.exports = mongoose.model('User', UserSchema);
