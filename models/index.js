const mongoose  =   require("mongoose");
mongoose.set("debug",true);
// mongoose.Promise    =   Promise;
mongoose.connect("mongodb://semititans:semititans23@ds141168.mlab.com:41168/libauto" );
module.exports.User     =   require("./user");
module.exports.Book     =   require("./book");
