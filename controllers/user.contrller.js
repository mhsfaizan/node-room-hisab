class UserController{
    getUsers(req, res) {
        return res.json({name: 'abc', age: 24});
    }
    addUser(req, res) {
        res.json({message: 'Succefully added user'});
    }
    getUser(req, res) {
        res.json({message: 'successfully get user'});
    }
}


module.exports = new UserController();
