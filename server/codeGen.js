const path = require('path');
const download = require('download');
const decompress = require('decompress');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const Headers = fetch.Headers;

const root = path.join(__dirname, '../');
const swaggerJsonUrl = 'http://192.168.100.122:8000/swagger/swagger-ui/swagger/xyl2.0.json';
const genUrl = 'http://192.168.100.122:1080/api/gen/clients/typescript-xyl';

const tempDir = path.join(root, './', 'temp');
const swaggerDir = path.join(tempDir, './typescript-xyl-client');
const modelDir = path.join(root, './src', 'model');

const headers = new Headers();
headers.set('Content-Type', 'application/json');

fetch(swaggerJsonUrl).then(res => res.json()).then(function (data) {
    fetch(genUrl, {
        headers: headers,
        method: 'post',
        body: JSON.stringify({
            spec: data
        })
    }).then(res => res.json()).then(function (response) {
        download(response.link).then(data => {
            decompress(data, tempDir).then(() => {
                fse.copy(swaggerDir, modelDir, function (error) {
                    if (error) {
                        showError('copy')(error)
                    } else {
                        fse.remove(tempDir);
                        console.log('done')
                    }
                })
            }).catch(showError('decompress'))
        }).catch(showError('download'))
    }).catch(showError('fetch typescript-xyl'));
}).catch(showError('fetch swagger'));


function showError(fn) {
    return function (error) {
        console.log(fn, error);
    }
}