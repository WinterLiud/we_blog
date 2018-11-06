module.exports={
    showarticleAdd(req,res){
        if(!req.session.isLogin) return res.redirect('/')
        res.render('./article/add.ejs',{
            user:req.session.user,
            isLogin:req.session.isLogin
        })
    },
    articleAdd(req,res){
        
    }
}