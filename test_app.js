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
        cb(null, __dirname + '/static/default');
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
    res.header('Access-Control-Allow-Credentials', true)
    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(__dirname + '/audio_static_source'));
app.use(express.static(__dirname));
app.use(cookieParser());
app.listen(5000, '0.0.0.0', function () {
    console.log('server start');
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/audio_static_source/index.html');
});
function isDirExit(path) {
    try {
        fs.accessSync(__dirname + path + '_endpoint', fs.F_OK);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
async function convertCMD(req, isMulitple, index) {
    let filePath = isMulitple ? req.files[index].path : req.file.path;
    let outputName = filePath.substring(0, filePath.lastIndexOf('.') + 1) + req.body.format.split('/')[1];
    let result = {};
    const param = {
        channelCount: req.body.countOfChannel,
        sampleRate: req.body.sampleRate,
        bitdpth: req.body.bitdpth,
        inputPath: filePath,
        outputPath: outputName
    }
    let convert = Convert.Convert(param);
    let convertCommand = "ffmpeg -i " + convert.inputPath + " -ar " + convert.sampleRate + " -ac " + convert.channelCount + "  " + convert.outputPath;
    let getAudioHeader = "sox -V " + convert.outputPath + " -n";
    try {
        const convertInfo = await exec(convertCommand);
        const { stdout, stderr } = await exec(getAudioHeader);
        let audioConvertStruct = {}, dbQuery = {};
        let audioSplitSaveDirname = filePath.substring(filePath.lastIndexOf('/'), filePath.lastIndexOf('.'))//Audio cutting result file dirname
        if (req.cookies.length) {
            audioConvertStruct = {
                audio_id: null,
                berfore_convert_path: filePath,
                after_convert_path: convert.outputPath,
                user_id: req.cookies.user_id,
                audio_name: filePath.substring(filePath.lastIndexOf('/'), filePath.lastIndexOf('.')),
                descripiton: JSON.stringify(param)
            }
            try {
                dbQuery = await query('insert into audio set ?', audioConvertStruct);
                audioSplitSaveDirname = req.cookies.account + audioSplitSaveDirname;
                console.log(dbQuery);
            } catch (error) {
                console.log(error);
                audioConvertStruct = { msg: 'sql failur' };
                dbQuery.insertId = -1;
            }
        } else {//当为游客时，音频存储
            audioConvertStruct = param;
            dbQuery.insertId = 0;
            audioSplitSaveDirname = audioSplitSaveDirname + '_temp_' + Date.now();
        }
        if (!isMulitple) {
            await endpointDetection(convert.outputPath, audioSplitSaveDirname, convert, dbQuery.insertId);
            return JSON.stringify(audioConvertStruct);
        } else {
            result[filePath.substring(filePath.lastIndexOf('/'), filePath.length)] = audioConvertStruct;
            await endpointDetection(convert.outputPath, audioSplitSaveDirname, convert, dbQuery.insertId);
            return JSON.stringify(result);
        }

    } catch (error) {

        console.log('错误' + error);
    }

}
async function endpointDetection(path, name, convert, audio_id) {
    let command = 'auditok -e 60 -i ' + path + ' -m 20 -n 2 --printf "{start}~{end}" --time-format "%h:%m:%s"'
    const pointTimes = await exec(command);
    let formatTimes = pointTimes.stdout.split('\n');
    console.log(path, name, convert, audio_id)
    if (audio_id === -1) {
        return;
    }
    if (!isDirExit(name)) {
        await exec('mkdir ./' + name + '_endpoint');
    }
    formatTimes.map((item, index) => {
        let start = item.split('~')[0], end = item.split('~')[1];
        const struct = {
            audio_split_id: null,
            audio_id: audio_id,
            path: name + '_endpoint/' + start + 'add' + end + '.wav'
        }
        try {
            query('insert into audio_split set ?', struct)
        } catch (error) {
            console.log(error)
        }
        if (start && end) {
            let pre = parseInt(start.substring(6, 8)), next = parseInt(end.substring(6, 8)), second = 0;
            if (pre > next) {
                second = next + 60 - pre;
            } else {
                second = next - pre;
            }
            if (second === 0) {
                return;
            }
            if (second < 10) {
                second = '0' + second
            }
            let cuttingCommand = 'ffmpeg -ss ' + start + ' -t 00:00:' + second + ' -i ' + path + ' -ar ' + convert.sampleRate + ' -ac ' + convert.channelCount + ' ' + __dirname + name + '_endpoint/' + start + 'add' + end + '.wav';
            exec(cuttingCommand);
        }

    })
}
app.post('/uploadConvert', upload.single('file'), async function (req, res) {
    const result = await convertCMD(req, false);
    res.send(result);
});
app.post('/signIn', urlencodeParser, async function (req, res) {
    let u = req.body;
    console.log(u)
    try {
        const result = await query('select root,user_id,user_name,account from user where account = "' + u.account + '" and password = "' + u.password + '"');
        console.log(result);
        res.cookie('username', result[0].user_name)
        res.cookie('user_id', result[0].user_id)
        res.cookie('account', result[0].account)
        res.cookie('root', result[0].root)
        res.send(JSON.stringify(result));
    } catch (e) {
        console.log(e);
        res.send('User search failur');
    }

});
app.post('/mulitpleAudioConvert', upload.array('files', 300), async function (req, res) {
    const files = req.files;
    let result = [];
    if (files instanceof Array) {
        for (let i = 0; i <= files.length; i++) {
            if (i === files.length) {
                console.log('result' + result);
                res.send(JSON.stringify(result))
                break;
            } else {
                result.push(await convertCMD(req, true, i));
            }
        }
    };
});
app.post('/manualCut', urlencodeParser, async function (req, res) {

    try {
        let audioDescription = await query('select  descripiton,after_convert_path,audio_name from audio where audio_id = ' + req.body.audioId);
        audioDescription = audioDescription[0]
        let convert = JSON.parse(audioDescription.descripiton), flag = isDirExit(audioDescription.audio_name);
        if (!flag) {
            await exec('mkdir ./' + audioDescription.audio_name + '_endpoint');
        }
        let start = req.body.start, end = req.body.end;
        const struct = {
            audio_split_id: null,
            audio_id: req.body.audioId,
            path: audioDescription.audio_name + '_endpoint/' + req.body.start + 'add' + req.body.end + '.wav'
        }
        try {
            query('insert into audio_split set ?', struct);
        } catch (error) {
            console.log(error)
        }
        if (start && end) {
            let pre = parseInt(start.substring(6, 8)), next = parseInt(end.substring(6, 8)), second = 0;
            if (pre > next) {
                second = next + 60 - pre;
            } else {
                second = next - pre;
            }
            if (second === 0) {
                return;
            }
            if (second < 10) {
                second = '0' + second
            }
            let cuttingCommand = 'ffmpeg -ss ' + start + ' -t 00:00:' + second + ' -i ' + audioDescription.after_convert_path + ' -ar ' + convert.sampleRate + ' -ac ' + convert.channelCount + ' ' + __dirname + audioDescription.audio_name + '_endpoint/' + req.body.start + 'add' + req.body.end + '.wav';
            exec(cuttingCommand);
        }
        res.send('cutted');
    } catch (error) {
        console.log(error);
        res.send('error')
    }

});
app.post('/getAudioList', urlencodeParser, function (req, res) {
    const result = {};
    try {
        const result = query('select * from audio');
        res.json({
            msg: 'success',
            result: result
        })
    } catch (error) {
        console.log(error);
        res.send(error);
    }

})