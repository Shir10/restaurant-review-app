let UserModel = require('../model/user');

module.exports = (app) => {
    app.get('/api/user/logout', logout);
    app.get('/api/user/users', get_all_users);
    app.get('/api/user/current', get_current_user);
    app.post('/api/user/register', register);
    app.post('/api/user/login', login);
    app.post('/api/user/update_user/:_id', update_user);
    app.post('/api/user/search_users', search_users);
    app.post('/api/user/check_register_username', check_register_username);
    app.post('/api/user/check_profile_username', check_profile_username);
};


function logout(req, res) {
    console.log('logout');
    try {
        res.clearCookie('userId');
        return res.json({userId: null});
    } catch (err) {
        return res.status(500).json({success: false});
    }
}

function get_all_users(req, res) {
    console.log('get all users');
    UserModel
        .find().then(users => {
            res.json(users)
        });
}

function get_current_user(req, res) {
    console.log('get current user', req.cookies.userId);
    const _id = req.cookies.userId;
    if (!_id) {
        return res.status(400).json({user: null})
    }
    UserModel
        .findOne({ _id })
        .then(user => {
            if (user) {
                return res.json({
                    user: user
                })
            }
            res.status(400).json({user: null})
        })
        .catch(err => {
            console.log('current', err.message);
            res.status(400).json({user: null});
        })
}

// if there is not another user with the same username - add the user
function register(req, res) {
    console.log('register');
    const inputUser = req.body;
    UserModel
        .findOne({username: inputUser.username})
        .then(user => {
            if (user !== null){
                res.json({
                    success: false
                })
            }
            else{
                const newUser = new UserModel(inputUser);
                newUser
                    .save()
                    .then(success => {
                        if (success === newUser) {
                            res.cookie('userId', newUser._id);
                            res.json({
                                success: true,
                                user: {
                                    ...newUser._doc
                                }
                            })
                        } else {
                            res.json({
                                success: false
                            })
                        }
                    }, err => {
                        console.log(err);
                    })
            }
        });
}

function login(req, res) {
    console.log('login');
    const userDetails = req.body;
    UserModel
        .findOne({username: userDetails.username, password: userDetails.password})
        .then(user => {
            if (user !== null){
                res.cookie('userId', user._id);
                res.json({
                    success: true,
                    user: user
                })
            }
            else{
                res.json({
                    success: false,
                })
            }
        });
}

// in case that we want to update the username:
// the update of the username will happen only if there is not another user with the same username
// in case that we want to update the location of the user - update
function update_user(req, res) {
    console.log('update user', req.params._id);
    const inputUser = req.body;
    UserModel
        .findOne({username: inputUser.username})
        .then(user => {
            if(user !== null && user._id.toString() !== req.params._id){ // there is other user with the same username
                res.json({
                    success: false
                })
            }
            else{
                UserModel
                    .updateOne({ _id: req.params._id }, { ...inputUser })
                    .then(() => {
                        res.json({
                            success: true
                        })
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function search_users(req, res) {
    console.log('search users');
    const query = req.body.query;
    UserModel
        .find(query)
        .then(users => {
            res.json(users)
        });
}

function check_register_username(req, res) {
    console.log('check register username');
    UserModel
        .findOne({username: req.body.username})
        .then(user => {
            res.json(user)
        });
}

function check_profile_username(req, res) {
    console.log('check profile username');
    const inputUser = req.body;
    UserModel
        .findOne({username: inputUser.username})
        .then(user => {
            if(user !== null && user._id.toString() !== inputUser._id){ // there is other user with the same username
                res.json({
                    success: false
                })
            }
            else{
                res.json({
                    success: true
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}