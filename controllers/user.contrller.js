const { User, validate } = require('../model/user');
const _ = require('lodash');


class UserController {
    async getUsers(req, res) {
        try{
            const users = await User.find();
            res.status(200).json({message: "Success", result: users, error: [], statusCode: 200}) 
        }catch(er) {
            res.status(500).json({message: er.message, result: users, error: er, statusCode: 500}) 
        }
    }
    async addUser(req, res) {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message, statusCode: 400, result: null, errors: error.details });
        }
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ message: 'User already exist', statusCode: 400, result: null, errors: [] });
            }

            user = new User({
                ...req.body
            });
            let result = await user.save();
            result = _.pick(result, ['name', 'email', '_id']);
            const token = user.generateToken();
            res.header('x-auth-token', token).status(201).json({ message: 'Succefully added user', statusCode: 201, result, error: [] });
        } catch (err) {
            res.status(500).json({ message: err.message, statusCode: 201, result: null, error: err });
        }
    }
    getUser(req, res) {
        res.json({ message: 'successfully get user' });
    }
}


module.exports = new UserController();
