import mongoose, {Schema} from 'mongoose';

const User = mongoose.model('User');


export function getAllUsers(req, res) {
    User.find()
        .then((users) => res.send(users))
        .catch((err) => res.send(err));

}



export function addUser(req, res) {
    const user = new User({
        name: req.query.name
    });

    if(user.name) {
        user.save();
        res.end('created !!');
    }
   else{
        res.end('Error');
    }
}