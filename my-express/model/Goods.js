var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Goods = new Schema({
	goods_id         : Number,//编号
	goods_name       : String,//商品名
	goods_number     : Number,//货号
	goods_price      : Number,//价格
	goods_inventory  : Number,//库存
	imgPath          : String,
	keys             : Number,
	create_data      : {type : Date,default:Date.now}
});

var GoodsModel = mongoose.model('Goods',Goods);
module.exports = GoodsModel;

//db.goods.insert({goods_name:"goods"})

//db.goods.insert({goods_id:01,goods_name:"name",goods_number:01,goods_price:100,goods_inventory:10,keys:1})

//goods_id = goodsData.goods_id;
//goods_name = goodsData.goods_name;
//goods_number = goodsData.goods_number;
//goods_price = goodsData.goods_price;
//goods_ inventory = goodsData.goods_inventory;

//db.goods.insert({goods_id:16,goods_name:"test16",goods_number:08,goods_price:200,goods_inventory:10,keys:1})
