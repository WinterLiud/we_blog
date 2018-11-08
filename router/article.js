const express=require('express')
const router=express.Router()
const ctrl=require('../controller/article.js')

//监听客户端get请求显示文章添加页面
router.get('/article/add',ctrl.showarticleAdd)

//监听发表文章请求
router.post('/article/add',ctrl.articleAdd)

//监听文章详情页
router.get('/article/info/:id',ctrl.articleInfo)

//监听编辑页面
router.get('/article/edit/:id',ctrl.articleEdit)

//监听编辑保存提交页面
router.post('/article/edit',ctrl.articleEditPost)

module.exports=router