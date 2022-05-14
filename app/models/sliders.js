const { default: mongoose } = require('mongoose');



const schema = mongoose.Schema({

    title: { type: String },
    text: { type: String },
    image: { type: String, required: true },
    types: { type: String, default: "base" }

})

module.exports = {
    SliderModel: mongoose.model("slider", schema)
}