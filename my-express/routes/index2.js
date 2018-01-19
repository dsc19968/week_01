var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var GoodsModel = require("../model/Goods");
var multiparty = require("multiparty");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {title:"EXPRESS"});
});

//商品列表页
router.get('/list', function(req, res, next) {
	GoodsModel.count({keys:1}, function(err, count){
		console.log("数量:" + count);
	});
  	GoodsModel.find({keys:1},function(err,docs){
		console.log(docs);
		res.render('list', {
			docs:docs
		});
	})
});

//添加商品
router.get('/addgoods', function(req, res, next) {
  res.render('addgoods', {});
});

//上传图片
router.post("/api/addgoods_upload",function(req,res,next){
	var form = new multiparty.Form({
		uploadDir: "public/images"
	});
	var result = {
		code : 1,
		message: "商品信息保存成功"
	}
	form.parse(req,function(err,body,files){
		if(err){
			console.log(err);
		}
		console.log(body);
		var goods_name = body.goods_name[0];
		var goods_price = body.goods_price[0];
		var goods_number = body.goods_number[0];
		var imgPath = files["img"][0].path.replace("public\\", "");
		var keys = body.keys[0];
		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.goods_price = goods_price;
		gm.goods_number = goods_number;
		gm.imgPath = imgPath;
		gm.keys = keys;
		gm.save(function(err){
			if(err){
				result.code = -99;
				result.message = "商品信息保存失败";
			}
			res.json(result);
		})
	})
});

//商品页
router.get('/dashboard', function(req, res, next) {
  //判断用户是否登录，如果没登录跳转到login页面
  console.log(req.ression);
  if(req.session == null || req.session.username == null){
    // res.render('login', { title: '登录页面' });
    res.redirect("/login");// 重定向
    return;
  }
  res.render('dashboard',{});
});

// 登录
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});

router.post('/api/login4ajax', function(req, res, next) {
    var username = req.body.username;
    var psw = req.body.psw;
    var result = {
    code: 1,
    message: "登录成功"
    };

    UserModel.find({username: username,psw: psw},(err,docs)=>{
        if(docs.length == 0){
            result.code = -101;
            result.message = "账号或密码错误"
        }else {
          //登录成功的时候生成session
          req.session.username = username;
          console.log(req.session);
        }
        res.json(result);
    })
})

module.exports = router;
