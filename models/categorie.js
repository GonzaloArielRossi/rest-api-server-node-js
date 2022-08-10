const { Schema, model } = require('mongoose');

const CategorieSchema = Schema({
  name: {
    type: String,
    required: [true, 'La categoría es obligatorio'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

CategorieSchema.methods.toJSON = function () {
  const { __v, state, ...categorie } = this.toObject();
  return categorie;
};
module.exports = model('Categorie', CategorieSchema);
