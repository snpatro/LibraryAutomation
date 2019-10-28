const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require("./routes");
const cors = require('cors');
const putRoutes = require("./routes/put");
const userData = require("./routes/userData");
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const imageUpload = require("./routes/image");
const contactRoute = require("./routes/contact");
const bookRoute = require("./routes/book");
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
//calling defined routes
app.use("/api/auth", authRoutes);
app.use("/api/put", putRoutes);
app.use("/api", userData);
app.use("/api", imageUpload);
app.use("/api", contactRoute);
app.use("/api/books",bookRoute);



app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
})
