const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    contactNumber: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    username: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 55
    }
});

UserSchema.pre('save', async function(next){
    const user = this;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

UserSchema.methods.generateToken = function(){
    return jwt.sign(_.pick(this, ['_id', 'email', 'name']), config.get('jwtPrivateKey'));
}

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        username: Joi.string().min(5).max(255).required(),
    })
    return schema.validate(user);
}
exports.User = mongoose.model('User', UserSchema);
exports.validate = validateUser