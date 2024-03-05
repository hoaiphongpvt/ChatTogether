const fs = require('fs');

exports.home = (req, res) => {
  fs.readFile('./views/index.html', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading HTML file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Send the HTML file as the response
    res.send(data);
  });
};
