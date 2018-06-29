// backend/src/models/contact.model.js

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');

  const contact = new mongooseClient.Schema({
    name : {
        type: String,
        required: [true, 'Name is required']
    },
    list : {
      type: [String],
      required: [true, 'List is required']
    },
    isBig: {
      type: Boolean,
      required: [true, 'isBig is required']
    },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
  });

  return mongooseClient.model('contact', contact);
};
