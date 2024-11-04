const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');  // Ensure this points to routes/index.js

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);  // This should work if routes/index.js exports the router correctly

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});
