const fetch = require('node-fetch');

module.exports = {
    getHomePage: function(req, res) {
        var query = "SELECT * FROM `articles` ORDER BY id ASC"; // query database to get all the articles
        var previews = [];
        var len;
        var finished = false;
        // execute query
        db.query(query)
            .then(rows => {
                len = rows.length;
                if (len == 0) {
                    res.render('index.ejs', {
                        title: "Welcome to News | View Articles",
                        articles: rows,
                        previews: previews
                    });
                } else {
                    rows.forEach(element => {
                        var data = {key: '5c034296a2ed425bf788e1f8c0f57288274132a7141ee', q: element.article };
                        fetch('https://api.linkpreview.net', {
                            method: 'POST',
                            mode: 'cors', 
                            body: JSON.stringify(data),
                        })
                            .then(res => res.json())
                            .then(response => {
                                previews.push(response);
                                if (previews.length == len) {
                                    res.render('index.ejs', {
                                        title: "Cloud Computing",
                                        articles: rows,
                                        previews: previews
                                    });
                                }
                            })
                    });
                }
        });
    },
};