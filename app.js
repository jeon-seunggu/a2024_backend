const express = require('express');
const app = express();
const logEvents = require('./middleware/logEvents'); 
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config(); 



/* 포트 설정 */
app.set('port', process.env.PORT || 3000);

app.use(cors());
/* 공통 미들웨어 */ 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // qs, queryString

app.use((req, res, next)=>{
    console.log( Date.now(), req.method, req.url );
    logEvents(`${req.method}, ${req.url}`)
    // logger 삽입
    next();
})

//데이터베이스를 사용하지않으므로 테스트불가

// app.use('/products', require('./routes/products')); // .js 생략


// 필요한 데이터로 변경하여 사용 
// app.get('/user', (req, res) => { 
//     res.send('user')
// });
 app.get('/',(req,res)=> {
    const str = ` 
    <h1>root</h1>
    GET : localhost:4500/makeup <br>
    GET : localhost:4500/board<br>
    POST : localhost:4500/board<br>
    PUT : localhost:4500/board/:id<br>
    DELETE : localhost:4500/board/:id<br>
    `
    res.send('root ')
 })
app.use('/makeup', require('./routes/makeup'));
app.use('/board', require('./routes/board'));

// localhost:4500/makeup
// app.get('/makeup', (req, res) => { 
//     res.send(makeup)
// });
 
// 그외의 라우트 처리 
app.use('/*', (req, res) => { 
    res.status(500).send('404'); 
});
 
app.use((err, req, res, next)=>{
    console.error( err.message );
    res.send('잠시 후 다시 접속해주세요')
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..')
});