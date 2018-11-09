const conn = require('../db/db.js')
module.exports={
    handleIndexget(req,res){
        // let pageSize = 3
        // let currentPage = parseInt(req.query.page) || 1

        const sql=`select a.id, a.title, a.ctime, u.nickname, u.username from article as a
        left join user as u 
        on a.authorId=u.id
        order by a.id desc;`
        conn.query(sql,(err,result)=>{
           if (!result) result = [] 
        //    let totalCount=result[1][0].count
        //    let totalPage=Math.ceil(totalCount/pageSize)
           res.render('./index.ejs',{
            user:req.session.user,
            isLogin:req.session.isLogin, 
            article:result     
        })
     })
       
    }
}