const express = require('express')
const app = express()
const port = 4000

const bodyParser = require('body-parser')

const scrapers = require('./scrapers')
const db = require('./db')

app.use(bodyParser.json())
app.use(function(req,res, next){
    res.header("Access-Control-Allow-Origin","*") // disabled for security on local
    res.header("Access-Control-Allow-Headers","Content-Type");
    next();
})

app.get('/', (req,res) => {
    res.send('success')
})

app.get('/creators', async (req, res) => {
    // const creators = [
    //     {name: 'Code Drip', img: 'https://'},
    //     {name: 'Dave Lee', img: 'https://'},
    //     {name: 'MKBHD', img: 'https://'},
    // ];
    const creators = await db.getAllCreators();
    res.send(creators)
})

app.post('/creators', async (req, res) => {
    console.log(req.body)
    const channelData = await scrapers.scrapeChannel(req.body.channelURL)
    console.log('debugging', channelData);
    const creators = await db.insertCreator(channelData.name, channelData.avatarUrl, req.body.channelURL, channelData.subscribers)
    res.send(creators);
    
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))