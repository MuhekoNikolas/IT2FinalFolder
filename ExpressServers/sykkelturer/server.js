

fs = require("fs")
express = require("express")

server = express()
server.use(express.static("public"))
server.use(express.json())

server.get("/", (req,resp)=>{

    resp.sendFile(__dirname+"/public/html/main.html")
    //resp.send(`Welcome home, cyclist ${Math.round((Math.random()*1000) + 1000)}`)
})


server.listen(8080, ()=>{console.log("App is running")})
