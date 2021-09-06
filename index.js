const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/read', (req, res) => {
    fs.readFile('./message.txt', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        if(data){
            data = JSON.parse(data)
        }
        res.status(200).send({status: true, message: "Data fetched successfully", data});
    })
})

app.post('/api/write', async (req, res) => {
    let preData = []
    fs.readFile('./message.txt', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        if(data){
            preData = [...JSON.parse(data)]
        }
        let body = req.body;
        preData.push(body)
        fs.writeFile('./message.txt', JSON.stringify(preData), (err) => {
            if (err) {
                throw err
            }
            res.status(201).send({ "status": true, "message": "File updated successfully" })
        })

    })
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})