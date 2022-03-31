const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  from: { type: String, requaired: true },
  to: { type: String, requaired: true, unique: true },
  code: { type: String, requaired: true, unique: true },
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: 'user' },
})

module.exports = model('Link', schema)
