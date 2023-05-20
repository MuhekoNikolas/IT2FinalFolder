


express = require("express")


app = express()

app.use(express.static("./game"))
app.use(express.json())


app.get("/", (req,resp)=>{
    resp.render("./game/index.html")
})


app.listen(8080, ()=>{
    console.log("Snake game is running")
})