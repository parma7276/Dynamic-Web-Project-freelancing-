const express = require("express")
const hbs = require("hbs")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const routes = require('./routes/main')
const Detail = require("./models/Detail")
const Slider= require("./models/Slider")
const Service = require("./models/Service")

app.use(bodyParser.urlencoded({
    extended:true
})) 
app.use('/static',express.static("public"))
app.use('',routes)


//templates engine

app.set('view engine','hbs')
app.set("views","views")
hbs.registerPartials('views/partials')

//databse connection
mongoose.connect("mongodb://localhost/dynamic_website",()=>{
    console.log("db connected")

     /*   Service.create([
            {
                icon:'fab fa-accusoft',
                title:'Provide Best Courses',
                description:'We provide courses that helps us student in placement and learning coding',
                linktext:'https://www.youtube.com/',
                link:'Check'
            },
            {
                icon:'fas fa-align-justify',
                title:'Learn projects',
                description:'We provide courses that helps us student in placement and learning coding',
                linktext:'https://www.youtube.com/',
                link:'Learn'
            },
            {
                icon:'fas fa-align-justify',
                title:'Learn projects',
                description:'We provide courses that helps us student in placement and learning coding',
                linktext:'https://www.youtube.com/',
                link:'Learn'
            },
            {
                icon:'fab fa-accusoft',
                title:'Provide Best Courses',
                description:'We provide courses that helps us student in placement and learning coding',
                linktext:'https://www.youtube.com/',
                link:'Check'
            },
            {
                icon:'fas fa-align-justify',
                title:'Learn projects',
                description:'We provide courses that helps us student in placement and learning coding',
                linktext:'https://www.youtube.com/',
                link:'Learn'
            },
            {
                icon:'fas fa-align-justify',
                title:'Learn projects',
                description:'We provide courses that helps us student in placement and learning coding',
                linktext:'https://www.youtube.com/',
                link:'Learn'
            }
        ])
        */

  /*  Slider.create([
        {
            title:'Learn Java in very easy manner',
            subTitle:'Java is one of the most populer programming language.',
            imageUrl:"/static/images/s1.jpg"
        },
        {
            title:'What is Django is python ?',
            subTitle:'Django is most famous web framework of python programming.',
            imageUrl:"/static/images/s1.png"
        },
        {
            title:'What about node js ?',
            subTitle:'Node js is runtime environment to execute javascript outside browser.',
            imageUrl:"/static/images/s3.jpg"
        }
    ])
*/

 /*   Detail.create({
        brandName:"Parma Technical Solutions",
        brandIconUrl:"data:image/png;base64,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",
        links:[
            {
                label:"Home",
                url:"/"
            },
            {
                label:"Services",
                url:"/services"
            },
            {
                label:"Gallery",
                url:"/gallery"
            },
            {
                label:"About",
                url:"/about"
            },
            {
                label:"Contact Us",
                url:"/contact-us"
            },
        ]
    })*/
})


app.listen(process.env.PORT | 5556,()=>{
    console.log("server started")
})