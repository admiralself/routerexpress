const express = require('express');
const app = express();
const querystring = require('querystring');
const fs = require('fs');
const responseTime = require('response-time')

app.use((req, res, next) => {
    var date = new Date();
    let day = date.getDate();

    if (day > 5) {
        
        next();    
    } else {
      
        res.redirect('/');

    }


});



app.use('/css', express.static(__dirname + '/public/css'))

app.use('/', (req, res, next) => {
    console.log('Someone made a request for' + req.url);
    next()
})
app.use(responseTime((req, res, time) => {
    console.log(req.method, req.url, time + 'ms');
}));



app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <link type="text/css" rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
               <h1>Checkpoint Express Routing</h1> 
               <ul>
  <li><a href="http://localhost:3000/homepage">Home page</a></li>
  <li><a href="http://localhost:3000/OurServices">Our Services</a></li>
  <li><a href="http://localhost:3000/Contacts">Contact us.</a></li>
</ul>
            </body>
        </html>
    `)
});

app.get('/homepage', (req, res) => {
    let HTML = fs.readFileSync(`${__dirname}/Home_page.html`)
    res.send(`${HTML}`)
})

app.get('/OurServices', (req, res) => {
    let HTML = fs.readFileSync(`${__dirname}/Our_Services.html`)
    res.send(`${HTML}`)
})


app.get('/Contacts', (req, res) => {
    let HTML = fs.readFileSync(`${__dirname}/Contact_us.html`)
    res.send(`${HTML}`)
})





const port = process.env.PORT || 3000;

app.listen(port)