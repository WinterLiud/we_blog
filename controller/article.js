const moment = require('moment')
const marked = require('marked')
const conn = require('../db/db.js')
module.exports={
    showarticleAdd(req,res){
        if(!req.session.isLogin) return res.redirect('/')
        res.render('./article/add.ejs',{
            user:req.session.user,
            isLogin:req.session.isLogin
        })
    },
    articleAdd(req,res){
        if(!req.session.isLogin) return res.status(400).send({ status: 400, msg: '您的登录信息已失效, 请保存文章后重新登录' });
        const body=req.body
        body.ctime=moment().format('YYYY-MM-DD HH:mm:ss')
        body.authorId=req.session.user.id
        const sql='insert into article set ?'
        conn.query(sql,body,(err,result)=>{
            if(err || result.affectedRows!=1) return res.status(500).send({ status: 500, msg: '文章发表失败,请重试!' })
            res.send({ msg: '添加成功！', status: 200 ,articleId:result.insertId})
        })
    },
    articleInfo(req,res){
        const id=req.params.id
        const sql='select * from article where id='+id
        conn.query(sql,(err,result)=>{
            // console.log(result)
            if(err || result.length!==1) return res.send({ status: 501, msg: '获取文章失败失败,请重试!' })
            result[0].content = marked(result[0].content)          
            res.render('./article/info.ejs',{
                user:req.session.user,
                isLogin:req.session.isLogin,
                article:result[0]
            })
        })
    },
    articleEdit(req,res){
        if(!req.session.isLogin) return res.redirect('/')
        const id=req.params.id
        const sql='select * from article where id='+id
        conn.query(sql,(err,result)=>{
            if (err || result.length !== 1) return res.status(500).send({ status: 500, msg: '文章获取失败, 请重试', data: null })
            res.render('./article/edit.ejs',{
                user: req.session.user,
                isLogin: req.session.isLogin,
                article: result[0]
            })
        })
    },
    articleEditPost(req,res){
        const article=req.body
        article.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql='update article set ? where id=?'
        conn.query(sql,[article,article.id],(err,result)=>{
           if(err || result.affectedRows!==1) return res.status(502).send({ status: 502, msg: '修改文章失败, 请重试', data: null })
           res.send({status:200,articleId:article.id})
        })
    }
}