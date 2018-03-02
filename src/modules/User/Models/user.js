import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
    email: {
      type: String,
      unique: 'user with email "VALUE" already exist',
      lowercase: true,
      required: 'Email is required',
      trim: true
    },
    password: {
      type: String,
      required: 'Password is required',
      trim: true
    },
    userName: {
      type: String,
      unique: 'user with username "VALUE" already exist',
      lowercase: true,
      required: 'Username is required',
      trim: true
    },
    boards: [{
      type: Schema.Types.ObjectId,
      required: 'Board is required',
      ref: 'Board'
    }]
  }, {
    timestamps: true
  }
);

UserSchema.statics.createFields = ['email', 'password', 'username'];

UserSchema.pre('save', function(next) {
  if(!this.isModified('password')){
    return next();
  }

  const salt = bcrypt.genSaltSync(10);

  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.findOneWithPublicFields = function(params, cb) {
  return this.findOne(params, cb).select({password: 0, __v: 0, createdAt: 0, updatedAt: 0});
};

export default mongoose.model('user', UserSchema);