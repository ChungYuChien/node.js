const express = require('express'); 
const url = require('url');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const session = require('express-session');
const moment = require('moment-timezone');
const db = require(__dirname + '/_connect_db');

const upload = multer({dest: 'tmp_uploads/'});

const app = express(); 

app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({extended: false})); // top level middleware
app.use(bodyParser.json()); // top level middleware
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'skdfjhdksfj',
    cookie: {
        maxAge: 1200000
    }
}));

//取得登入狀態
app.use((req, res, next)=>{
    res.locals.isLogin = req.session.loginUser || false;
    res.locals.loginData = req.session.loginData || false;
    next();

})


app.get('/', function(request, response){ response.render('home', {name: 'Kalea', age: '25'}); }); 

app.get('/try-url', (req, res)=>{
    res.write(req.protocol + '://' + req.get('host') + req.url + '\n');
    res.write(req.protocol + '\n');
    res.write(req.get('host') + '\n');
    res.write(req.url + '\n');
    res.end('');
});


app.get('/sales', (req, res)=>{
    const sales = require(__dirname + '/../data/sales');
    console.log(sales);

    res.render('sales', {sales: sales});
})

app.get('/my-params/:action/:id',(req, res)=>{
    res.json(req.params);
})

app.get(/^\/09\d{2}\-?\d{3}\-?\d{3}$/, (req, res)=>{
    let mobile = req.url.slice(1);
    mobile = mobile.split('?')[0];
    mobile  = mobile.split('-').join('');

    res.json(mobile);
});


app.get('/try-qs', (req, res)=>{
    const urlParts = url.parse(req.url, true);
    console.log(urlParts);
    console.log(urlParts.query.name);
    res.json(urlParts);
})

app.get('/try-post-form', (req, res)=>{
    res.render('try-post-form');
});

app.post('/try-post-form', (req, res)=>{
    //console.log(req.body);
    //res.json(req.body);
    res.render('try-post-form', req.body);
})

app.get('/sync-async', (req, res)=>{
    setTimeout(()=>{
        res.send('hello 123');
    }, 5000);
})



app.post('/try-upload', upload.single('avatar'),(req, res)=>{
    const output ={
        success: false,
        url: '',
        msg: '沒有上傳檔案',
    }
    console.log(req.file);
    if(req.file && req.file.originalname){
        switch (req.file.mimetype) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
                fs.rename(req.file.path, './public/img/'+req.file.originalname, error=>{
                    if(error){
                        output.success = false;
                        output.msg = '無法搬動檔案';
                    }else{
                        output.success = true;
                        output.url = '/img/'+req.file.originalname;
                        output.msg = '';
                    }
                    res.json(output);
                })
                break;
            default:
                fs.unlink(req.file.path, error=>{
                    output.msg = '不接受式這種檔案格';
                    res.json(output);
                });
        }
    }else{
        res.send(output);
    }
    
});

app.get('/abc', function(request, response){ response.send('Hello!'); }); 


const admin1fn = require(__dirname + '/admins/admin1');
admin1fn(app);

app.use( require(__dirname+'/admins/admin2') );
app.use('/admin3/', require(__dirname+'/admins/admin3') );

app.get('/try-session',(req, res)=>{
    console.log(req.session);
    req.session.my_var = req.session.my_var || 0;
    req.session.my_var++;
    res.json({
        my_var: req.session.my_var,
        session :req.session
    });
});
app.use('/login', require(__dirname+'/routers/login') );

// 通訊錄
app.use('/address-book', require(__dirname+'/routers/address-book') );

app.get('/try-moment', (req, res)=>{
    const fm = 'YYYY-MM-DD HH:mm:ss';
    const m1 = moment(req.session.cookie.expires);
    const m2 = moment(new Date());
    const m3 = moment('2018-9-2');

    res.json({
        m1: m1.format(fm),
        m2: m2.format(fm),
        m3: m3.format(fm),
        m1_: m1.tz('Europe/London').format(fm),
        m2_: m2.tz('Europe/London').format(fm),
        m3_: m3.tz('Europe/London').format(fm),
    });
});

app.get('/try-db',(req, res)=>{
    const sql = "SELECT * FROM `address_book`";
    db.query(sql, (error, result, fields)=>{
        if(!error){
            res.json(result);
        } else {
            res.end(error);
        }
    });
});

app.use(express.static(__dirname + '/../public'));
//app.use(express.static('public'));也可以

app.use((req, res)=>{
    res.type('text/html'); 
    res.status(404); 
    res.send('<h2>404-找不到網頁</h2>');

})



app.listen(3000, function(){ console.log('啟動 server 偵聽埠號 3000'); });
