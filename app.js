const express=require('express')
const app=express()

app.set('view engine','ejs')
app.set('views','./views')

// 注册解析表单数据的中间件
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/node_modules',express.static('./node_modules'))

const router1=require('./router/index.js')
app.use(router1)

const router2=require('./router/user.js')
app.use(router2)
//请求项目首页
// app.get('/',(req,res)=>{
//     res.render('index.ejs',{})
// })

//注册页面
// app.get('/register',(req,res)=>{
//     res.render('./user/register.ejs',{})
// })

// //登录页面
// app.get('/login',(req,res)=>{
//     res.render('./user/login.ejs',{})
// })

// //用户注册业务逻辑
// app.post('/register',(req,res)=>{
//     const user=req.body
//     if(user.username.trim().length<=0 || user.password.trim().length<=0) 
//         return res.send({ msg: '请填写完整的表单数据后再注册用户！', status: 501 })
//     //查询用户名是否重复
//     const sql1='select count(*) as count from user where username=?'
//     conn.query(sql1,user.username,(err,result)=>{
//         if(err) return res.send({ msg: '查询失败！', status: 502 })
//         if(result[0].count>0) return res.send({ msg: '用户名重复，重新输入！', status: 503 })

//         //注册业务逻辑
//         user.ctime=moment().format('YYYY-MM-DD HH:mm:ss')
//         const sql2='insert into user set ?'
//         conn.query(sql2,user,(err,result)=>{
//             if(err) return res.send({ msg: '注册失败！', status: 504 })
//             if(result.affectedRows !=1) return res.send({ msg: '注册失败！', status: 505 })
//             res.send({ msg: '注册新用户成功！', status: 200 })
//         })
//     })    
// })

// //登录业务逻辑
// app.post('/login',(req,res)=>{
//     const user=req.body
//     //查询用户是否存在
//     const sql3='select * from user where username=? and password=?'
//     conn.query(sql3,[user.username,user.password],(err,result)=>{
//         if(err) return res.send({ msg: '登录失败！', status: 501 })
//         if(result.length!=1) return res.send({ msg: '登录失败！', status: 502 })
//         res.send({ msg: '登录成功！', status: 200 })
//     })
// })

app.listen(80,()=>{
    console.log('http://127.0.0.1');
})