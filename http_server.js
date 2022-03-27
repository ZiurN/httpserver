import express from 'express';
const app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));

// Use JSON file for storage
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();

db.data ||= { users: [] }

/*
db.data.posts.push('hello world')
db.data.posts[0]


const { posts } = db.data
posts.push('hello world')
*/
// Write db.data content to db.json
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
app.listen(3000, function () {
	console.log('Running on port 3000!');
});