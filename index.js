const express = require('express');
const path = require("path");
const http = require("http");
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
const port = 3333;

app.listen(port, () => {
  console.log(`Server aperto: http://localhost:${port}`)
});

app.get('/', (req, res) => {
    res.render('home.ejs', {token:"Token non ancora generato"});
});

app.post('/getToken', async (req, res) => {
    var result = await axios.post('http://161.97.114.50:4000/login', {username: req.body.username});
    res.render('home.ejs', {token: result.data.accessToken});
});

app.post('/getPosts', async (req, res) => {
    try{
        var result = await axios.get('http://161.97.114.50:3000/posts', {headers: {"Authorization": `Bearer ` + req.body.token}});
    }catch(err){
        console.log(err)
        result = {data: "Accesso non consentito"}
    }
    console.log(result);
    res.render('risultato.ejs', {risultato:result.data});
});

app.use((req, res,next)=>{
    res.status(404).render('404page.ejs');
});
