// MQTT publisher
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')
const topic = 'lonelyside_test'
const inTopic = 'inTopic'
var message = 'Hello World!'
const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// })

client.on('connect', () => {
    let no = 1
    setInterval(() => {
        data = no.toString()
        client.publish(inTopic, data)
        client.subscribe(inTopic)
        console.log('Message sent!', data)
        no++
        if (no > 1) {
            no = 0;
        }
    }, 1000)
    console.log("connected")
})

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

// client.on('message', (topic, message) => {
//     message = message.toString()
//     console.log(message)
// })

// client.on('connect', ()=>{
//     client.subscribe(topic)
// })

