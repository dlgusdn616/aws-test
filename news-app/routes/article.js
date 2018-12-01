const fs = require('fs');

module.exports = {
    addArticlePage: function(req, res) {
        res.render('add-article.ejs', {
            title: "Welcome to Socka | Add a new article"
            ,message: ''
        });
    },
    addArticle: function(req, res) {
        let message = '';
        let article = req.body.article;

        let articleQuery = "SELECT * FROM `articles` WHERE article = '" + article + "'";

        db.query(articleQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'article already exists';
                res.render('add-article.ejs', {
                    message,
                    title: "Welcome to News | Add a new article"
                });
            } else {
                let query = "INSERT INTO `articles` (article) VALUES ('" + article + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }
        });
    },
    // editArticlePage: function(req, res) {
    //     let articleId = req.params.id;
    //     let query = "SELECT * FROM `articles` WHERE id = '" + articleId + "'";
    //     db.query(query, (err, result) => {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }
    //         res.render('edit-article.ejs', {
    //             title: "Edit  article"
    //             ,article: result[0]
    //             ,message: ''
    //         });
    //     });
    // },
    // editArticle: function(req, res) {
    //     let articleId = req.params.id;
    //     let first_name = req.body.first_name;
    //     let last_name = req.body.last_name;
    //     let position = req.body.position;
    //     let number = req.body.number;

    //     let query = "UPDATE `articles` SET `article` = '" + article + "'";
    //     db.query(query, (err, result) => {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }
    //         res.redirect('/');
    //     });
    // },
    // deleteArticle: function(req, res) {
    //     let articleId = req.params.id;
    //     let getImageQuery = 'SELECT image from `articles` WHERE id = "' + articleId + '"';
    //     let deleteUserQuery = 'DELETE FROM articles WHERE id = "' + articleId + '"';

    //     db.query(getImageQuery, (err, result) => {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }

    //         let image = result[0].image;
    //         fs.unlink(`public/assets/img/${image}`, (err) => {
    //             if (err) {
    //                 return res.status(500).send(err);
    //             }
    //             db.query(deleteUserQuery, (err, result) => {
    //                 if (err) {
    //                     return res.status(500).send(err);
    //                 }
    //                 res.redirect('/');
    //             });
    //         });
    //     });
    // }
};

