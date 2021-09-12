const express=require('express');

const router=express.Router();

router.get('/', (req, res, next)=>{
    db.collection('tasks').find({}).toArray().then((tasks)=>{
      res.render('index',{tasks:tasks});
    }).catch((error)=>{
      console.log("Klaida paimant įrašus")
    }); 
    
  });
  
  router.get('/new', (req, res, next)=>{
      res.render('new');
  });
  
  router.post('/new', (req, res, next)=>{
      db.collection('tasks').insertOne(req.body).then((result)=>{
          res.redirect('/');
      });
      
  });

module.exports=router;