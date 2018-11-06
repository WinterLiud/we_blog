const express=require('express')
const app=express()
const fs = require('fs')
const path = require('path')
const session=require('express-session')

app.set('view engine','ejs')
app.set('views','./views')

// 注册解析表单数据的中间件
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/node_modules',express.static('./node_modules'))

//注册session中间件,以后任何一个可以使用req对象的地方都可以访问到req.session
app.use(session({
    secret: 'blog niubility',
    resave: false,
    saveUninitialized: false
}))

fs.readdir(path.join(__dirname,'./router'),(err,files)=>{
    if(err) return res.send({ msg: '读取文件失败！', status: 501 })
    //循环router目录下的文件
    files.forEach(item=>{
        const router=require(path.join(__dirname,'./router',item))
        app.use(router)
    })
})


app.listen(80,()=>{
    console.log('http://127.0.0.1');
})