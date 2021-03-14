const ObjectId = require("mongodb").ObjectID;
module.exports = (app, db) =>{
    app.get("/items", async (req, res)=>{
        let items = await db.find("items");
        res.send(items);
    });

    app.get("/items/:id", async (req, res)=>{
        let myId = req.params.id;
        let items = await db.find("items",{_id:{$eq: new ObjectId(myId)}});
        console.log(items);
        res.send(items);
    });

    app.post("/items", async (req, res)=>{
        let data = {
            "name": req.body.name,
            "price": req.body.price
        };
        let item = await db.insertOne("items", data);
        res.send(item);
    });
    
    app.put("/items/:id", async (req, res)=>{
        let itemId = req.params.id;
        // let currItem = await db.find("items",);
        let data = {
            "name": req.body.name,
            "price": req.body.price
        }
        let upd = await db.updateOne("items",  {_id:new ObjectId(itemId)}, data);
        res.send(upd);
    });

    app.delete("/items/:id", async (req, res) =>{
        let itemId = req.params.id;
        let del = await db.deleteOne("items",{_id: new ObjectId(itemId)});
        res.send(del);
    });
    
}