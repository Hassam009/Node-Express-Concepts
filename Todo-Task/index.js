const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to display files and the form
app.get('/', (req, res) => {
  const filesDirectory = path.join(__dirname, 'files');  // Full path to 'files' folder

  fs.readdir(filesDirectory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);  // Log the error if the folder doesn't exist or another issue occurs
      res.status(500).send('Error reading directory');
      return;
    }

    console.log(files);  // Log the list of files
    res.render('index', { files });  // Pass the file list to the EJS template
  });
});

// Route to create a file from form data
app.post('/create', (req, res) => {
  const fileName = req.body.title.split(' ').join('');  // Remove spaces from the title
  const fileContent = req.body.body;  // Get content from textarea
  
  // Write the file in the 'files' folder
  fs.writeFile(`./files/${fileName}.txt`, fileContent, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).send('Error creating file');
    }
    res.redirect('/');  // Redirect back to the main page after file creation
  });
});

// Route to read the content of a file
app.get('/read-file/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'files', req.params.fileName);

  // Read the file content
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }
    res.json({ content: data });  // Send file content as JSON
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
