import mongoose from "mongoose";

const Schema = mongoose.Schema;

const users = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    mail: {
        type: String,
        required: [true, 'Mail required']
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
});
const User = mongoose.model('users', users);
export default User;