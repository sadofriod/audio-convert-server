const express = require('express');
const util = require('util');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const mysql = require('mysql');
const cookieParser = require('cookie-parser')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'audio_convert',
    port: 3306
});
const query = util.promisify(connection.query).bind(connection);
const stat = util.promisify(fs.stat)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/static/default');
    },
    filename: function (req, file, cb) {
        cb(null, /\s/.test(file.originalname) ? file.originalname.split(' ').join('') : file.originalname)
    }
})
const upload = multer({ limits: { fieldSize: 1024 * 1024 * 1024 }, storage: storage });
const Convert = require('./convert')
const app = express();
const exec = util.promisify(require('child_process').exec)
const urlencodeParser = bodyParser.urlencoded({
    extended: true,
    limit: '500mb',
});
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials',true)
    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(__dirname+'/audio_static_source'));
app.use(cookieParser());
app.listen(5000, '0.0.0.0', function () {
    console.log('server start');
});
app.get('/',function(req,res){
	res.sendFile(__dirname+'/audio_static_source/index.html');
})
//  function convertCMD(convert,res){
//     let convertCommand = "ffmpeg -i " + convert.inputPath + " -ar " + convert.sampleRate + " -ac " + convert.channelCount +  "  " + convert.outputPath;
//     let getAudioHeader = "sox -V " + convert.outputPath + " -n"
//     console.log(convertCommand, getAudioHeader);
//     try {
//         exec(convertCommand).then(async function (data) {
//             console.log(data.stdout.length)
//             const { stdout, stderr} = await exec(getAudioHeader);
//             // ↵
//             res.send(JSON.stringify({ stdout: stdout.split('\n'), stderr: stderr.split('\n') }));
//         })    
//     } catch (error) {
//         console.log('错误')
//     }
    
// }
async function convertCMD(req,isMulitple,index){
    let filePath = isMulitple?req.files[index].path:req.file.path;
    let outputName = filePath.substring(0, filePath.lastIndexOf('.') + 1) + req.body.format.split('/')[1];
    let result = {};
    console.log(outputName)
    let convert = Convert.Convert({
        channelCount: req.body.countOfChannel,
        sampleRate: req.body.sampleRate,
        bitdpth: req.body.bitdpth,
        inputPath: filePath,
        outputPath: outputName
    });
    let convertCommand = "ffmpeg -i " + convert.inputPath + " -ar " + convert.sampleRate + " -ac " + convert.channelCount +  "  " + convert.outputPath;
    let getAudioHeader = "sox -V " + convert.outputPath + " -n"
    console.log(convertCommand, getAudioHeader);
    try {
        const convertInfo = await exec(convertCommand);
        const { stdout, stderr} = await exec(getAudioHeader);
        if(!isMulitple){
            console.log(stdout,stderr)
            return JSON.stringify({ stdout: stdout.split('\n'), stderr: stderr.split('\n') })
        }else{
            result[filePath.substring(filePath.lastIndexOf('/'),filePath.length)] = { stdout: stdout.split('\n'), stderr: stderr.split('\n') };
            return JSON.stringify(result);
        }
           
    } catch (error) {
        
        console.log('错误'+error);
    }
    
}
app.post('/uploadConvert', upload.single('file'), async function (req, res) {
    const result = await convertCMD(req,false);
    res.send(result);
});
app.post('/signIn', urlencodeParser, async function (req, res) {
    let u = req.body;
    console.log(u)
    try{
        const result = await query('select root,user_id,user_name,account from user where account = "' + u.account + '" and password = "' + u.password + '"');
        console.log(result);
        res.cookie('username',result[0].user_name)
        res.cookie('user_id',result[0].user_id)
        res.cookie('account',result[0].account)
        res.cookie('root',result[0].root)
        res.send(JSON.stringify(result));
    }catch(e){
        console.log(e);
        res.send('User search failur');
    }
    
});
app.post('/mulitpleAudioConvert',upload.array('files',300),async function(req,res){
    const files = req.files;
    let result = [];
    if(files instanceof Array){
        for(let i = 0;i <= files.length; i++){
            if(i === files.length){
                console.log('result'+result);
                res.send(JSON.stringify(result))
                break;                       
            }else{
                result.push(await convertCMD(req,true,i));
            }
        }
    };
})
