const express=require('express')
const router=express.Router()
const ctrl=require('../controller/article.js')

//监听客户端get请求显示文章添加页面
router.get('/article/add',ctrl.showarticleAdd)

//监听发表文章请求
router.post('/article/add',ctrl.articleAdd)

module.exports=router