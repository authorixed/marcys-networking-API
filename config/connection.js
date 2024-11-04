const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  // No need to specify `useNewUrlParser` or `useUnifiedTopology` as they are default settings now
});

module.exports = mongoose.connection;
