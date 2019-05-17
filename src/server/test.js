var express=require('express')
var router=express.Router();
//User
// var User=require('../models/User');
// var Category=require('../models/Category')

// router.use(function(req,res,next){
//     if(!req.userInfo.isAdmin){
//         //如果当前用户是非管理员，处理
//         res.send('对不起，你不是管理员，没有权限')
//         return;
//     }
//     next();
// });

var info = {
	data: [{
		name: "Anthony",
		age: 17
	},{
		name: "Jenny",
		age: 18
	},{
		name: "Michael",
		age: 40
	}]
}
router.get('/',function(req,res,next){
    res.send(info);
});

module.exports = router;