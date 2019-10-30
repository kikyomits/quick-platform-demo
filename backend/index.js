// ライブラリ読み込み
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // port番号を指定

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/v1/color", function(req, res) {
  res.json({
    "color": "green"
  });
});

app.get("/health", function(req, res) {
  res.json({
    "health": "ok"
  });
});

//サーバ起動
app.listen(port);
console.log("listen on port " + port);
