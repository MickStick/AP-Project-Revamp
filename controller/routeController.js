var query = require('./queryController');

module.exports = function(app) {
    query(app);
    app.get('/', function(req, res) {
        var title = 'Login';
        res.render('index', { title: title });
    });

    app.get('/emp', function(req, res) {
        var title = 'Employee';
        res.render('empDash', { title: title });
    });

    app.get('/stud', function(req, res) {
        var title = 'Student';
        res.render('studDash', { title: title });
    });

    app.get('*', function(req, res) {
        res.type('text/plain');
        res.status(404);
        res.send("Hell there. Unfortunately the url: " + req.url + " has not been set up yet.");
    });
}