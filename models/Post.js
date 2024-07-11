const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      tags: {
        type: [String],
        default: []
      },
      date_created: {
        type: Date,
        default: Date.now
      },
      comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }]
})
postSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

postSchema.set('toJSON', {
    virtuals: true,
});


module.exports= mongoose.model('Post', postSchema)