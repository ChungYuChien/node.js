const express = require('express');
const router = express.Router();

router.get('/admin2/:p3?/:p4?',(req, res)=>{
    res.json(req.params);
});

module.exports = router; 