// MQTT subscriber
var mqtt = require('mqtt')
var client = mqtt.connect('ws://localhost:1884/mqtt')
var topic = '/World'

client.on('message', (topic, message) => {
    message = message.toString()
    console.log(message)
})

client.on('connect', () => {
    let no = 1
    setInterval(() => {
        data = no.toString()
        client.publish(topic, data)
        client.subscribe(topic)
        console.log('Message sent!', data)
        no++
        if (no > 1) {
            no = 0;
        }
    }, 2000)
    console.log("connected")
})