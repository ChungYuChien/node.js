INSERT INTO `address_book` (`sId`, `name`, `tel`, `email`, `birthday`, `address`, `created_at`) VALUES ('2', '陳大名', '0933454669', 'hkkk@gmail.com', '2020-02-19', '', '2020-02-21 04:27:24');


router.get('/list/:page?',(req, res)=>{
    const perpage = 5;
    let totalRows, totalPages;
    let page = req.params.page ? parseInt(req.params.page) : 1;

    const t_sql = "SELECT COUNT(1) num FROM `address_book`";
    db.query(t_sql, (error, result)=>{
        totalRows =  result[0].num;//總筆數
        totalPages = Math.ceil(totalRows/totalPages);

        //限定page範圍
        if(page<1) page = 1;
        if(page>totalPages) page = totalPages;

        const sql = `SELECT* FROM address-book LIMIT ${page-1 * perPage}, ${perPage}`;
        db.query(sql,(error, result)=>{
            res.render('address-book/list',{
                totalRows,
                totalPages,
                page,
                rows: result
            });
        });
        
       
    });
});
