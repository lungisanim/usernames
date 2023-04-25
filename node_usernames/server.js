const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/saveUserData', (req, res) => {
  const { firstName, lastName, cellNumber } = req.body;

  if (!firstName || !lastName || !cellNumber) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  if (!/^(0\d{9})$/.test(cellNumber)) {
    return res.status(400).json({ error: 'Invalid cell number format.' });
  }

  const xmlData = `<user>
    <firstName>${firstName}</firstName>
    <lastName>${lastName}</lastName>
    <cellNumber>${cellNumber}</cellNumber>
  </user>`;

  fs.appendFile('user.xml', xmlData, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save data.' });
    }

    console.log('Data saved successfully.');
    res.sendStatus(200);
  });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
