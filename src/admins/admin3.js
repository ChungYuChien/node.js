const express = require('express');
const router = express.Router();

router.route('/member/edit/:id?')
    .all((req, res, next)=>{
        console.log('All');
        res.locals.yu = 'der';
        next();
    })
    .get((req, res)=>{
        res.send('GET:'+ req.url +`: ${res.locals.yu}`);
    })
    .post((req, res)=>{
        res.send('POST:'+ req.url +`: ${res.locals.yu}`);
    });

    module.exports = router;