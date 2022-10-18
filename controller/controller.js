
const path = require('path')
const randomstring = require("randomstring");
const fs = require('fs');
const mysql = require('mysql');
const toSQLDate = require('js-date-to-sql-datetime');
const  con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"nodejs_sa"
  });
  
 con.connect(function(err) {
    if (err){
        console.log(err);
    }else{
        console.log("Connected!");
       
    }

});
exports.index = (req,res)=>{
    con.query("SELECT * FROM Assignment", (err, result)=>{
        if (err){
            console.log(err);
             return  res.status(401).send(err)
        }else{
              
             const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',minute: 'numeric',second: 'numeric' };

            
             for (const item in result) {
                const timeend = result[item].Assignment_timeend.toLocaleDateString('th-TH', options)
                result[item].Assignment_timeend = timeend
                const timepost = result[item].Assignment_timestart.toLocaleDateString('th-TH', options)
                result[item].Assignment_timestart = timepost
             }
        
             console.log(result);
            return    res.render('index',{assignment: result})
        }
    })
   
}
exports.addassign = (req,res)=> {
    res.render('addassign')
}
exports.insert = (req,res)=>{
   
    if(req.files){
        var timeend = new Date(req.body.date)

        var subject_id = 2
        const file = req.files.file
        const ext =  path.extname(file.name)
       var filename_random = __dirname.split('\controller')[0]+"/public/files/"+randomstring.generate(50)+ext
      
        if (fs.existsSync(filename_random )) {
           filename_random  = __dirname.split('\controllers')[0]+"/public/files/"+randomstring.generate(60)+ext
          file.mv(filename_random)
        }
        else{
          file.mv(filename_random)
        }

        con.query("INSERT INTO Assignment (Assignment_title,Assignment_detail,Assignment_score,Assignment_file,Assignment_timestart,Assignment_timeend,subj_id) VALUES (?,?,?,?,?,?,?)", 
            [
         req.body.title,
         req.body.detail,
        parseInt( req.body.score),
        filename_random.split('/public/')[1],
        toSQLDate(new Date()),
        toSQLDate(timeend),
        subject_id
        ],function (err, result){
        if (err){
            console.log(err);
              return  res.status(401).send(err)
        }else{
            console.log(result);
            return   res.status(200).redirect('/')
        }

        })

    }else{

    }
   
}