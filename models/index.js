const mongoose  =   require("mongoose");
mongoose.set("debug",true);
// mongoose.Promise    =   Promise;
mongoose.connect("mongodb://TT:SIH2019@ds249035.mlab.com:49035/smartindiahackathon" );
module.exports.User     =   require("./user");
module.exports.Book     =   require("./book");
