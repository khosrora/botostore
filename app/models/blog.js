const { default: mongoose } = require('mongoose');



const schema = mongoose.Schema({

    author: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, required: true },
    comments: { type: [], default: [] },
    like: { type: [mongoose.Types.ObjectId], default: [] }, 
    desLike: { type: [mongoose.Types.ObjectId], default: [] }, 
    bookMark: { type: [mongoose.Types.ObjectId], default: [] }, 

})

module.exports = {
    BlogModel: mongoose.model("blog", schema)
}