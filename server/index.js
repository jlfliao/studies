const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
<<<<<<< HEAD
=======
const db = require('./db/index');
>>>>>>> e4fcf42e56e667dd3b6e6f12d90a51f0f9e313fd

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve contents in public
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const initApp = async () => {
  try {
<<<<<<< HEAD
=======
    await db.sync();

>>>>>>> e4fcf42e56e667dd3b6e6f12d90a51f0f9e313fd
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server: ', err);
  }
};

initApp();

module.exports = app;
