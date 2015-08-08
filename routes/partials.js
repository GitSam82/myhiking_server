var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name', function (req, res, next) {
    var name = req.params.name;
    res.render('partials/' + name);
});

router.get('/dashboard/:name', function (req, res, next) {
    var name = req.params.name;
    res.render('partials/dashboard/' + name);
});

module.exports = router;
