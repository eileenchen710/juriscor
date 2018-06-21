var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser');



var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())



app.use(express.static('public'));
app.use(express.static('src'));

//注册ejs模板为html页。简单的讲，就是原来以.ejs为后缀的模板页，现在的后缀名可以//是.html了
app.engine('.html', require('ejs').__express);
//设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
app.set('view engine', 'html');


app.use(express.static(__dirname + '/public'));


app.get('/', function getState(req,res,next){
    res.setHeader('Content-Type', 'text/html');
    res.sendfile('index.html')
})

app.get('/index.html', function getState(req,res,next){
    res.setHeader('Content-Type', 'text/html');
    res.sendfile('index.html')
})

app.get('/services.html', function getState(req,res,next){
    res.setHeader('Content-Type', 'text/html');
    res.sendfile('services.html')
})

app.get('/team.html', function getState(req,res,next){
    res.setHeader('Content-Type', 'text/html');
    res.sendfile('team.html')
})

app.get('/case.html', function getState(req,res,next){
    res.setHeader('Content-Type', 'text/html');
    res.sendfile('case.html')
})

app.post('/test', function(req, res, next) {

    var options = {
        from        : '"Client" 446207590@qq.com',
        to          : '"Server" info.sydney@juriscorlegal.com.au',
        // cc         : ''  //抄送
        // bcc      : ''    //密送
        subject        : req.body.subject,
        text          : '一封来自网站用户的邮件',
        html           : '网站用户: ' + req.body.name + '\n邮箱: ' + req.body.email + '\n信息: ' + req.body.message,

    };

    var nodemailer  = require('nodemailer');

    var mailTransport = nodemailer.createTransport({
        host : 'smtp.qq.com',
        secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
        auth : {
            user : '446207590@qq.com',
            pass : 'mpzomllhydjibjgb'
        },
    });

    mailTransport.sendMail(options, function(err, msg){
        if(err){
            console.log(err);
            res.sendfile('index.html', { title: err });
        }
        else {
            console.log(msg);
            rres.sendfile('index.html', { title: "已接收："+msg.accepted});
        }
    });
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
