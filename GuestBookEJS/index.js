var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.locals.pretty = true;
var port = process.env.PORT || 8081;


app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get("/guestbook2", function (req, res) {
    var data = require(__dirname + "/public/guestbook.json");

    var output = '<table border= "5" bgcolor="lightgrey" rowspan="2">';

    for (var i = 0; i < data.length; i++) {
        output +=
            "<tr>" +
            '<td>' +
            "Our visitor: " +
            data[i].username +
            "</td>" +
            '<td>' +
            "From: " +
            data[i].country +
            "</td>" +
            '<td bgcolor="grey">' +
            "Commented following: " +
            data[i].message +
            "</td>" +

            '<td>' +
            data[i].date +
            "</td>" +
            "</tr>";
    }
    res.send(output);
});

//I finally learned to render json data to other page you need 
app.get('/message', function (request, response) {
    var data = require(__dirname + "/public/guestbook.json");
    response.render('pages/message', { data: data });

});
/*
data
var dataa = require(__dirname + "/public/guestbook.json");
data= JSON.parse(dataa);
app.get('/message', function req, res){
    res.render('pages/message',{
        data
    })
}
       <ul>
           <% users.forEach(function(user){ %>
             <%= user.username %>
           <% })%>
         </ul>
            /* data: [
            { username: 'Isabel', country: 'France', message: 'Salut, Tuusula is worth visiting!' },
            { username: 'Juan', country: 'Spain', message: 'Nice people, good and healthy food' },
            { username: 'Marilyn', country: 'USA', message: 'Great nature, good hiking!' }
        ]*/


app.get('/input', function (req, res) {
    res.render('pages/input');
});

app.post("/newmessage", function (req, res) {
    var data = require("./public/guestbook.json");

    data.push({
        'username': req.body.username,
        'message': req.body.message,
        'country': req.body.country
    });

    var lol = JSON.stringify(data)

    fs.writeFile("public/guestbook.json", lol, err => {
        if (err) throw err
        console.log("Saved info");

    });
    res.send(data);
    window.location.replace("/guestbook");
});
/*
var input = {
    user: [
        { name: '', country: '', message: '' }
    ]
};
app.get('/message', function (req, res) {
    res.render('pages/users', data);
});
*/

app.listen(port, function () {
    console.log("Listening port" + port);
});