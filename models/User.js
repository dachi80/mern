const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, requaired: true, unique: true},
    password: {type: String, requaired: true},
    links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)