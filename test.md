const user = require('./src/routes/user');
const ticketsRoute = require('./src/routes/ticket');

const io = require('socket.io')(http);
const adminsRoom = 'admins'; // this room have all the admins
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(cors());
app.use(user);
app.use(ticketsRoute)
io.listen(server); // io listening to the server