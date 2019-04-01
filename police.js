const express = require('express');
const util = require('util');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({ //连接数据库，进行配置
    host: '127.0.0.1',//本地数据库服务地址
    user: 'root',//数据库用户名
    password: '123456',//数据库密码
    database: 'police_system'//数据库名称
})
const urlencodeParser = bodyParser.urlencoded({//数据内容的限制
    extended: true,//任意格式
    limit: '500mb',//最大单次上传数据内容
});
const allowCrossDomain = function (req, res, next) {//允许跨域连接
    res.header('Access-Control-Allow-Origin', '*');//允许所有IP连接
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
// app.use(allowCrossDomain);
app.use(bodyParser.json({ limit: '50mb' }));//使用内容限制
// app.use(express.static(__dirname))
app.listen(5010, '0.0.0.0', function () {//服务器运行端口设置为5010
    console.log('server start');
})
app.post('/signUp', urlencodeParser, function (req, res) {//接受注册请求
    console.log('process')
    let e = req.body;
    const pro = new Promise((resolve, rej) => {
        connection.query('select idtenfiy from user where idtenfiy = ' + e.idtenfiy, function (err, result) {//操作数据库，使用身份证号查询用户
            if (err) {//如果查询出错
                res.send(JSON.stringify({//返回错误信息
                    msg: 'select fail'
                }))
            } else { resolve(result); }//如果没错误
        })
    }).then(data => {
        // console.log(data.result);
        const userData = {//定义用户的数据结构
            user_id: null,
            account: e.account,
            password: e.password,
            real_name: e.realname,
            idtenfiy: e.idtenfiy
        }
        if (data.length === 0) {//如果用户不存在
            connection.query('insert into user set ?', userData, function (err, result) {//将用户信息插入数据库
                if (err) {
                    console.log(err)
                    res.send(JSON.stringify({
                        msg: 'insert fail'
                    }))
                } else {
                    res.send(JSON.stringify({ userState: true }))
                }
            })
        } else {//如果用户存在
            res.send(JSON.stringify({ msg: '用户已存在' }))
        }
    })
});
app.post('/signIn', urlencodeParser, function (req, res) {//接受用户登录请求
    console.log('process')
    let e = req.body;
    const pro = new Promise((resolve, rej) => {
        connection.query('select user_id from user where (idtenfiy = ' + e.account + ' or account=' + e.account + ') and password=' + e.password, function (err, result) {//使用账号或身份号查询群众表
            if (err) {//如果出错
                console.log(err)
                res.send(JSON.stringify({
                    msg: 'select fail'
                }));
                return
            }
            if (result.length === 0) {//如果在群众表中不存在，执行下一步
                resolve(result);
            }else{//如果存在返回群众的权限和ID
                res.send(JSON.stringify({ userRoot: false, id:result[0].user_id }))
            }
        })
    }).then(data => {

        connection.query('select police_id,name from police where police_num=' + e.account + ' and password=' + e.password, function (err, result) {//使用账号查询警察表
            if (err) {//如果出错
                console.log(err)
                res.send(JSON.stringify({
                    msg: 'select fail'
                }))
            } else if (result.length !== 0) {//如果警察存在，返回警察的权限、名字和id
                res.send(JSON.stringify({ userRoot: true,id:result[0].police_id,name:result[0].name }))
            } else {
                res.send(JSON.stringify({//如果不存在返回当前用户不存在
                    msg: '用户不存在'
                }))
            }
        })

    })
});
