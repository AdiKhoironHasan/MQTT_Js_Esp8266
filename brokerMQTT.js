const express = require('express')
const app = express()
const port = 3000
var mosca = require('mosca')
var settings = {
    http: {
        port: 1884,
        bundle: true,
        static: './'
    }
};
//here we start mosca
var server = new mosca.Server(settings);
server.on('ready', setup);

app.set('view engine', 'ejs');
app.use(express.static('public'))

// index page
app.get('/', function (req, res) {
    res.render('pages/index');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running')
}

// fired whena  client is connected
server.on('clientConnected', function (client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
    if (packet.cmd === 'publish') {
        //Qui uso mongo DB 
        console.log('Published: ', packet.payload.toString('utf8'));
    }
});

// fired when a client subscribes to a topic
server.on('subscribed', function (topic, client) {
    console.log('subscribed : ', topic);
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function (topic, client) {
    console.log('unsubscribed : ', topic);
});

// fired when a client is disconnecting
server.on('clientDisconnecting', function (client) {
    console.log('clientDisconnecting : ', client.id);
});

// fired when a client is disconnected
server.on('clientDisconnected', function (client) {
    console.log('clientDisconnected : ', client.id);
});

// print data published
server.on('published', (packet) => {
    message = packet.payload.toString()
    console.log(message)
})