let express = require('express');
let multer = require('multer');

var upload = multer({ storage: multer.memoryStorage() })

let app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');

    next();
};

app.use(allowCrossDomain);

app.post('/upload', upload.any(), function(req, res, next) {
  res.send(req.files[0].buffer);
  res.end();
});

app.listen(3000, () => {
	console.log('Server started on the port 3000');
});