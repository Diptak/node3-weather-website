const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3300
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
// changes for git to make unstaged
// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Set up handel bars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// setup static directory to serve
app.use(express.static(publicDirectoryPath))
// app.get('',(req, res)=>{
//     res.send('<h1>Weather</h1>')
// })
// app.get('/help',(req, res)=>{
//     res.send([{
//         name: 'Diptak',
//         Age: 30
//     },{
//     name:'avi',
//     age: 33
//     }])
// })
// app.get('/about',(req, res)=>{
//     res.send('<h1>About</h1>')
// })
app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Ditak sengupta'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Diptak Sengupta'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        msg: 'Help related topic will be here !',
        title:'Help',
        name: 'Diptak Sengupta'
    })
})

app.get('/weather',(req, res)=>{
    
if (!req.query.address){
    return res.send({
        Error: 'Please provide an address'
    })
}
geocode(req.query.address, (error, {longitude,latitude,location}={})=>{
    // console.log('Error', error)
    // console.log('Data', data)
    if (error){
        return res.send({error})
    }
    forecast (longitude,latitude,(error, forecastData)=>{
        // console.log("Error", error)
        // console.log('Data', data)
        if (error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
        // res.send(forecastData)
    })
})

    // console.log(req.query.address)
    // res.send({
    //     forecast: 'Its hot',
    //     location:'Kolkata, west Bengal',
    //     address: req.query.address

    })


app.get('/products',(req,res)=>{

    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: '404',
        msg:'Help article not found',
        name: 'Diptak Sengupta'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        msg:'Page not found',
        name: 'Diptak Sengupta'
    })
})

    app.listen(port, ()=>{
        console.log('server is up on port '+port)
    })


