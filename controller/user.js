const conn=require('../db/db.js')
const moment=require('moment')

module.exports={
    handleRegisterget(req,res){
        res.render('./user/register.ejs',{})   
   },
    handleLoginget(req,res){
        res.render('./user/login.ejs',{})
    },
    handleRegisterPost(req,res){
        const user=req.body
        if(user.username.trim().length<=0 || user.password.trim().length<=0) 
            return res.send({ msg: '请填写完整的表单数据后再注册用户！', status: 501 })
        //查询用户名是否重复
        const sql1='select count(*) as count from user where username=?'
        conn.query(sql1,user.username,(err,result)=>{
            if(err) return res.send({ msg: '查询失败！', status: 502 })
            if(result[0].count>0) return res.send({ msg: '用户名重复，重新输入！', status: 503 })
    
            //注册业务逻辑
            user.ctime=moment().format('YYYY-MM-DD HH:mm:ss')
            const sql2='insert into user set ?'
            conn.query(sql2,user,(err,result)=>{
                if(err) return res.send({ msg: '注册失败！', status: 504 })
                if(result.affectedRows !=1) return res.send({ msg: '注册失败！', status: 505 })
                res.send({ msg: '注册新用户成功！', status: 200 })
            })
        })    
    },
    handleLoginPost(req,res){
        const user=req.body
        //查询用户是否存在
        const sql3='select * from user where username=? and password=?'
        conn.query(sql3,[user.username,user.password],(err,result)=>{
            if(err) return res.send({ msg: '登录失败！', status: 501 })
            if(result.length!=1) return res.send({ msg: '登录失败！', status: 502 })
            //把用户信息，以及结果挂载到session上
            req.session.user=result[0]
            req.session.isLogin=true
            res.send({ msg: '登录成功！', status: 200 })
        })
    },
    handleLogoutGet(req,res){
        req.session.destroy(err=>{
            // 该回调函数执行表示销毁成功
            res.redirect('/')
        })
    }
}