const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Middleware to handle CORS
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Path to the db.json file
const dbFilePath = path.join(__dirname, 'db.json');

// Route to add a new endpoint
app.post('/add-endpoint', (req, res) => {
  const { endpoint, data } = req.body;

  fs.readFile(dbFilePath, 'utf8', (err, jsonString) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }
    try {
      const db = JSON.parse(jsonString);
      db[endpoint] = data;

      fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).send('Error writing file');
        }

        // Adding a slight delay and dummy write to ensure file change detection
        setTimeout(() => {
          fs.appendFile(dbFilePath, ' ', (err) => {
            if (err) {
              console.error('Error appending to file:', err);
              return res.status(500).send('Error appending to file');
            }
            console.log('Endpoint added successfully');
            res.send('Endpoint added successfully');
          });
        }, 100);

      });
    } catch (err) {
      console.error('Error parsing JSON:', err);
      res.status(500).send('Error parsing JSON');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
