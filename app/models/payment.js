const { default: mongoose } = require('mongoose');



const schema = mongoose.Schema({




})

module.exports = {
    PaymentModel: mongoose.model("payment", schema)
}