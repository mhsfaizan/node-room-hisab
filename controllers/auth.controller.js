const Joi = require('joi');
const { User } = require('../model/user');
const bcrypt = require('bcrypt'); 



class AuthController{
    authenticate = async (req, res) => {
        const { error } = this.validateBody(req.body);
        if (error) return res.status(400).json({message: error.details[0].message, error: error.details, result: null});
        try{
            let user = await User.findOne({email: req.body.email});
            if (!user) return res.status(400).json({message: 'Invalid email or password', statusCode: 400, error:[], result: null});

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: 'Invalid email or password', statusCode: 400, error:[], result: null});
            }

            // send json web token
            const token = user.generateToken();
            res.status(200).json({message: 'Successfully login', result: {
                token
            }, error: [], statusCode: 200});
        } catch(err) {
            res.status(500).json({message: err.message, error:[], statusCode: 500, result: null});
        }

    }
    validateBody (user) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required(),
        });
        return schema.validate(user);
    }
}
module.exports = new AuthController();