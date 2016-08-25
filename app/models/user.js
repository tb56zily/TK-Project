var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


// set up a mongoose model
var UserSchema = new Schema({

  _id:{ type: Number ,  unique: true  },
  username: { type: String, required: true, lowercase: true, trim: true, index: { unique: true } },
  password: {type: String, required: true,  trim: true},
  email: {type: String, required: true,  lowercase: true, trim: true},
  role:{type: String, required: true,  lowercase: true,  trim: true},
  firstname:{type: String, required: true,  trim: true},
  lastname: {type: String, required: true,  trim: true},
  address :{type: String, required: true,  trim: true},
  institute:{type: String, required: true,  trim: true},
  city:{type: String, required: true,  trim: true},
  country:{type: String, required: true,  trim: true},
  state: {type: String, required: true,  trim: true},


  name: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    }

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

module.exports = mongoose.model('User', UserSchema);
