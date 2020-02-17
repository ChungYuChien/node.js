const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../_connect_db');
const router = express.Router();

router.get('/list/:page?', (req, res)=>{
    const perPage = 5;
    let totalRows, totalPages;
    let page = req.params.page ? parseInt(req.params.page) : 1;

    const t_sql = "SELECT COUNT(1) num FROM `address_book`";
    db.query(t_sql, (error, result)=>{
        totalRows = result[0].num; // 總筆數
        totalPages = Math.ceil(totalRows/perPage);

        // 限定 page 範圍
        if(page<1) page=1;
        if(page>totalPages) page=totalPages;

        const sql = `SELECT * FROM \`address_book\` LIMIT  ${(page-1)*perPage}, ${perPage}`;
        db.query(sql, (error, result)=> {
            const fm = "YYYY-MM-DD";

            result.forEach((row, idx) => {
                row.birthday = moment(row.birthday).format(fm);
            });

            res.render('address-book/list', {
                totalRows,
                totalPages,
                page,
                rows: result
            });

        });
    });
});






// CRUD

/*

/list
/list/:page?

/insert -get
/insert -post

/edit/:sid -get
/edit/:sid -post

/del -get (post)




 */


module.exports = router;