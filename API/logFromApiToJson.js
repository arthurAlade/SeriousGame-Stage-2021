const fetch = require("node-fetch");
const fs = require('fs');

const url = "http://localhost:3301/api";

function request(req){

    var op = {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(req)
    };

    const reponse = fetch(url, op);

    return reponse;

}



function getLogsFromAPI(){

    const req = {
        query: `
            query {
                getLogs{id seance{id} description date}
            }
        `
    }

    return new Promise(function(resolve, reject) {
        request(req).then(function(value) {
            value.json().then(function(values) {
                console.log("log:" + JSON.stringify(values));
                resolve(values.data.getLogs);
            })
        });
    })

}

function writeIntoFile(data) {
    fs.writeFile('log.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("Completed !");
    });
}

function process(){
    getLogsFromAPI().then(function(data) {
        writeIntoFile(JSON.stringify(data, null, 4));
    })
}

process();
