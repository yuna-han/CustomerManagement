const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');  //파일 읽어오기
const conf = JSON.parse(data);  //설정 데이터 파싱해서 가져오기
const mysql = require('mysql'); //mysql 라이브러리

//연결 객체 초기화
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect(); //연결

//api 구현
app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM customer",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));