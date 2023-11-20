
require("dotenv").config()

const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
const app = express()
const methodOverride = require("method-override")
const session = require("express-session")
const passport = require("passport")
const MongoStore = require("connect-mongo")
require("./server/database/mongodb")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(methodOverride("_method"))

app.use(session({

    secret : "asdasdasd" ,
    saveUninitialized : false,
    resave : false,
    store : new MongoStore({
        mongoUrl : process.env.MONGODB_URL
    })

}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static("public"))
app.use(expressLayouts)
app.set("layout","./layouts/main")
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.use(require("./server/routes/auth"))
app.use(require("./server/routes/index"))
app.use(require("./server/routes/dashboard"))

app.get("*",(req,res)=> {

    res.render("404")

})

app.listen(8000||process.env.PORT)

