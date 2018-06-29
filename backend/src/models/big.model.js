// big-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

//made a big model so that when we search for bigs/littles
//we dont have to search the whole contacts List
//instead we can just search thru big list and little list
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const big = new mongooseClient.Schema({
    name : {
        type: String,
        required: [true, 'Name is required']
    },
    list : {
      type: [String],
      required: [true, 'List is required']
    },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
  });

  return mongooseClient.model('big', big);
};
