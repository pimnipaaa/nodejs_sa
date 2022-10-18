
const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')

router.use(( req, res, next)=> {
    // set locals, only providing error in development
    next()
  });
  
  
  router.get('/',controller.index );

  router.get('/addassign',controller.addassign );
  router.post('/insert',controller.insert );

  module.exports = router;