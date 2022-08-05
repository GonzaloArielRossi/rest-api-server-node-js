const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'el nombre es obligatorio']
  },
  mail: {
    type: String,
    required: [true, 'el mail es obligatorio'],
    unique: true
  },
  pwd: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function () {
  const { __v, pwd, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model('User', UserSchema);
