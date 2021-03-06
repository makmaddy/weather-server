const path = require('path')
const express = require('express')
const hbs=require('hbs')
const chalk=require('chalk')
const { error } = require('console')
const { query } = require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'M'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'M'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help page',
        name:'M'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Address is required'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(location,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })

    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'M',
        errorMessage:'Help Article Not Found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'M',
        errorMessage:'Page Not Found'

    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})





// app.get('',(req,res)=>{
//     res.send('Hello Express')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })

// app.get('/about',(req,res)=>{
//     //res.send('About Page')
//     //console.log('About page');
//     res.send('<title>About</title>')
// })