const express = require('express');
const util = require('util');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'book',
    port: 3306
});
const query = util.promisify(connection.query).bind(connection);
const allowCrossDomain = function (req, res, next) {//允许跨域连接
    res.header('Access-Control-Allow-Origin', '*');//允许所有IP连接
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
// const upload = multer({limits: { fieldSize: 1024 * 1024 * 1024 }, storage: storage });
const urlencodeParser = bodyParser.urlencoded({//数据内容的限制
    extended: true,//任意格式
    limit: '500mb',//最大单次上传数据内容
});
app.use(bodyParser.json({ limit: '50mb' }));//使用内容限制
app.use(express.static('/root/audio_convert/bookManager'));
app.listen(5030, '0.0.0.0', function () {//服务器运行端口设置为5010
    console.log('server start');
});
app.post('/signIn',urlencodeParser,async function(req,res){
    let e = req.body;
    try {
        let result = await query('select * from usertable where usernumber="'+e.usernumber+'" and password="'+e.password+'"');
        console.log(result);
        res.json({
            flag:true,
            userId:result[0].userid
        })
    } catch (error) {
        res.send(error);
        console.log(error)
    }
});
app.post('/signUp',urlencodeParser,async function(req,res){
    let e = req.body;
    e.userid = null;
    try {
        let result = await query('insert into usertable set ?',e);
        res.json({
            flag:true,
            result:result
        })
    } catch (error) {
        res.send(error);
        console.log(error)
    }
});
app.post('/getList',urlencodeParser,async function (req,res) {
    try {
        let result = await query('select * from booktable' );
        res.json(result)
    } catch (error) {
        res.send(error);
        console.log(error)
    }
})
app.post('/getAction',urlencodeParser,async function (req,res) {
    console.log(req.body)
    try {
        let result = await query('SELECT * FROM booktable,(SELECT bookid FROM actiontable WHERE userid='+req.body.userId+') as temp WHERE id=temp.bookid' );
        res.json(result)
    } catch (error) {
        res.send(error);
        console.log(error)
    }
});
app.post('/getActionList',urlencodeParser,async function (req,res) {
    try {
        let result = await query('SELECT * FROM booktable,(SELECT * FROM actiontable) as temp,usertable WHERE booktable.id=temp.bookid or usertable.userid=temp.userid' );
        res.json(result)
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});
app.post('/submit',urlencodeParser,async function(req,res){
    let e = req.body;
    e.id = null;
    try {
        let select = await query('select * from actiontable where userid = '+e.userid+' and bookid='+e.bookid+' and ng="'+e.ng+'" and qd="'+e.qd+'" and zy="'+e.zy+'"');
        console.log(select);
        let result = {flag:false};
        if(!select.length){
            result = {flag:true}
            query('insert into actiontable set ? ',e);
        }
        res.json(result)
    } catch (error) {
        res.send(error);
        console.log(error);
    }
})
