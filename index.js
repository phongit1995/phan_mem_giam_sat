const express = require('express')
const app = express()
const path = require('path');
const port = 3000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/package', (req, res) => {
    res.render('package');
})

app.get('/active', (req, res) => {
    res.render('active');
})

app.listen(port, () => {
  console.log(`Ứng dụng đang chạy trên cổng ${port}`)
})