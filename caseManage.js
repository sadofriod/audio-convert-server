const express = require('express');
const util = require('util');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'audio_convert',
    port: 3306
});
app.listen(5020, '0.0.0.0', function () {//服务器运行端口设置为5010
    console.log('server start');
});
const allowCrossDomain = function (req, res, next) {//允许跨域连接
    res.header('Access-Control-Allow-Origin', '*');//允许所有IP连接
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
const urlencodeParser = bodyParser.urlencoded({//数据内容的限制
    extended: true,//任意格式
    limit: '500mb',//最大单次上传数据内容
});
const query = util.promisify(connection.query).bind(connection);
app.post('/signIn', urlencodeParser,async function (req, res) {
    let e = req.body;
    try {
        let result = await query('select * from user account = ' + e.acccount + ' and password = ' + e.password);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }

});
app.post('/signUp', urlencodeParser,async function (req, res) {
    let e = req.body;
    e.user_id = null;
    try {
        let result = await query('insert into user set ?', e);
        res.send(result.result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
app.post('/getUsers', urlencodeParser,async function (req, res) {
    try {
        let result = await query('select * from user');
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
app.post('/getCases', urlencodeParser,async function (req, res) {
    try {
        let result = await query('select * from case_data');
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
app.post('/submitCases', urlencodeParser,async function (req, res) {
    let e = req.body;
    e.case_id = null;
    try {
        let result = await query('insert into case_data set ? ',e);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
app.post('/deleteCases',urlencodeParser,async function(req,res){
    try {
        let result = await query('delete from cases where case_id='+req.body.case_id);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
app.post('/updateCases', urlencodeParser,async,function(req,res){
    try {
        let result = await query('update case_data set ? where case_id='+req.body.case_id,req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});