const express = require('express');
const util = require('util');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
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
    res.header('Access-Control-Allow-Origin', '*');//允许所有IP连接
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json({ limit: '50mb' }));//使用内容限制
// app.use(express.static(__dirname))
app.listen(5025, '0.0.0.0', function () {//服务器运行端口设置为5010
    console.log('server start');
});
app.post('/signIn',urlencodeParser,async function(req,res){
    let e = req.body;
    try {
        let result = await query('select * from usertable where account="'+e.account+'" and password="'+e.password+'"');
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