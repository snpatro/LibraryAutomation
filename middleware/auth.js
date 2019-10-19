const jwt = require("jsonwebtoken");

//Authentication
exports.loginRequired = function(req, res, next) {
    if (typeof req.headers.authorization !== 'string') {
        res.sendStatus(400);
        return;
      }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'THISISMYBIGSECRETHUHUHAHA', function(err, decoded) {
        if(err){
            return res.send({
                success: false,
                message: 'Error: Authentication Failed'  
            })
        }
        else if(decoded){
            return next();
        }
        else {
            return res.send({
                success: false,
                message: 'Please LogIn First'
            });
        }
    })
}

//Authorization
exports.ensureCorrectUser = function(req, res, next) {
    if (typeof req.headers.authorization !== 'string') {
        res.sendStatus(400);
        return;
      }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'THISISMYBIGSECRETHUHUHAHA', function(err, decoded) {
        if(err){
            return res.send({
                success: false,
                message: 'Error: Authorization Failed'  
            })
        }
        else if(decoded && decoded.id === req.params.id){
            return next();
        }
        else {
            return res.send({
                success: false,
                message: 'You Are Not Authenticated For This'
            });
        }
    })
}