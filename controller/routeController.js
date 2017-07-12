var query = require('./queryController');

module.exports = function(app) {
    query(app);
    app.get('/', function(req, res) {
        var title = 'Login';
        res.render('index', { title: title });
    });

    app.get('*', function(req, res) {
        res.type('text/plain');
        res.status(404);
        res.send("Hell there. Unfortunately the url: " + req.url + " has not been set up yet.");
    });
}