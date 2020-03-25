const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res)=>
{
    db.select("*").from("accounts").then((response)=>
    {
        res.status(200).json(response);
    }).catch((error)=>
    {
        res.status(500).send("Internal Server Error");
    });
});

server.delete("/:id", (req, res)=>
{
    db.from("accounts").where("id", req.params.id).del().then((response)=>
    {
        res.status(200).send("Done.");
    }).catch((error)=>
    {
        res.status(404).json("Internal Server Error");
    })
});

server.post("/", (req, res)=>
{
    db("accounts").insert(
        {
            name:req.body.name,
            budget:req.body.budget
        }
    ).then((response)=>
    {
        res.status(200).json(response);
    }).catch((error)=>
    {
        res.status(500).send("Error with your body most likely");
    });
});

server.put("/:id", (req, res)=>
{
    db("accounts").update(req.body).where("id", req.params.id).then((response)=>
    {
        res.status(200).json(response);
    }).catch((error)=>
    {
        res.status(500).send("Error with your body most likely");
    });
});

module.exports = server;