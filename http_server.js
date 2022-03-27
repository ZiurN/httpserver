import express from 'express';
const app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import http from 'http';
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));

// Use JSON file for storage
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();

db.data ||= { users: [] }
await db.write();
app.get('/', function (req, res) {
	res.send('Hello World');
});
app.get('/data', function (req, res) {
	console.log(db.data.users);
	res.send(db.data.users);
});
app.post('/test', function (req, res) {
	console.log(req.body.username, req.body.password);
	res.send('Ok');
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);