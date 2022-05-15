const { default: mongoose } = require('mongoose');



const schema = mongoose.Schema({

    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    phone: { type: String, required: true },
    otp: { type: Object, default: { code: 0, expiresIn: 0 } },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    roles: { type: [String], default: ["USER"] }

})

module.exports = {
    UserModel: mongoose.model("user", schema)
}