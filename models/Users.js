const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is Required!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is Required!"]
    },
    password: {
        type: String,
        required: [true, "Password is Required!"],
        min: 8,
        max: 128
    },
    role: {
        type: String,
        enum: ['user', 'admin'], default: 'user'
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}); 

userSchema.pre('save', function (next) {
    userSchema.modifiedAt = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
