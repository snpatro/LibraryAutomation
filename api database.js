User Login(post):
/api/auth/signin
Req.body.user: username, password

Signup (post):
/api/auth/signup
Req.body.registerUser: Name,email,password,username,department


Get all books (get):
/api/books/getAll


Add a book to the inventory (post):
/api/books/addNewBook
Req.body.createBook: name,barcode,row,column,genre


change password(put):
/api/put/changePassword
Req.body:username


update userdata (put):
/api/put/user/:userId
req.body.User:userdata

Activate user (put):
/api/put/verify/:userId
