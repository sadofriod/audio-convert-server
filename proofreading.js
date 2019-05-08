const express = require('express');
const util = require('util');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const multer = require('multer');
const currentURL = 'http://112.74.165.209:5025/'
const connection = mysql.createConnection({ //连接数据库，进行配置
    host: '127.0.0.1',//本地数据库服务地址
    user: 'root',//数据库用户名
    password: '123456',//数据库密码
    database: 'proofreading'//数据库名称
})
const urlencodeParser = bodyParser.urlencoded({//数据内容的限制
    extended: true,//任意格式
    limit: '500mb',//最大单次上传数据内容
});
const query = util.promisify(connection.query).bind(connection);
const allowCrossDomain = function (req, res, next) {//允许跨域连接
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');//允许所有IP连接
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/static');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({
    // dest:__dirname,
    limits: { fieldSize: 1024 * 1024 * 1024 },
    storage: storage
});
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(bodyParser.json({ limit: '50mb' }));//使用内容限制
app.use(express.static('/root/audio_convert/proofreading/build'))
app.listen(5025, '0.0.0.0', function () {//服务器运行端口设置为5010
    console.log('server start');
});
app.post('/signIn', urlencodeParser, async function (req, res) {
    let e = req.body;
    try {
        let result = await query('select * from user where account="' + e.account + '" and password="' + e.password + '"');
        console.log(result);
        if(result.length){
            console.log('set cookie');
            res.cookie('username', result[0].user_name)
            res.cookie('userID', result[0].user_id)
            res.cookie('account', result[0].account)
            res.cookie('root', result[0].user_root)
        }
        res.json({
            flag: true,
            result: result
        })
    } catch (error) {
        res.json({
            flag: false,
            error: error
        });
        console.log(error)
    }
});
app.post('/getHistoryList', urlencodeParser, async function (req, res) {
    let e = req.body;
    try {
        let result = await query('select * from words where user_id=' + e.userID);
        console.log(result);
        res.json({
            msg: 'success',
            result: result
        });
    } catch (error) {
        res.json({
            msg: 'fail',
            result: error
        });
        console.log(error);
    }
});
app.post('/getReviewLog', urlencodeParser, async function (req, res) {
    let e = req.body;
    try {
        let result = await query('select * from reviewLog');
        console.log(result);
        res.json({
            msg: 'success',
            result: result
        });
    } catch (error) {
        res.json({
            msg: 'fail',
            result: error
        });
        console.log(error);
    }
});
app.post('uploadWords', upload.single('file'), async function (req, res) {
    let e = req.body;
    e.path = currentURL + 'static/' + req.file.filename;
    try {
        let result = await query('insert into words set ?',e);
        console.log(result);
        res.json({
            msg: 'success',
            result: result
        });
    } catch (error) {
        res.json({
            msg: 'fail',
            result: error
        });
        console.log(error);
    }
});
app.post('updateWords',urlencodeParser,async function(req,res){
    let e = req.body;
    try {
        let result = await query('update words set ?',e);
        console.log(result);
        res.json({
            msg: 'success',
            result: result
        });
    } catch (error) {
        res.json({
            msg: 'fail',
            result: error
        });
        console.log(error);
    }
});
app.post('/reviewWords',urlencodeParser,async function(req,res){
    try {
        let result = await query('insert into review set ?',e);
        console.log(result);
        res.json({
            msg: 'success',
            result: result
        });
    } catch (error) {
        res.json({
            msg: 'fail',
            result: error
        });
        console.log(error);
    }
});