const ObjectId = require("mongodb").ObjectID;
module.exports = (app, db) =>{
    app.get("/orders", async (req, res) =>{
        let orders = await db.find("orders");
        res.send(orders);
    })

    app.get("/orders/:id", async (req, res) =>{
        let orderId = req.params.id;
        let orders = await db.find("orders", {_id:{$eq: new ObjectId(orderId)}});
        res.send(orders);
    });

    app.post("/orders", async (req, res)=>{
        let data = {
            "user_id": new ObjectId(req.body.user_id),
            "grand_total": req.body.grand_total
        };
        let order = await db.insertOne("orders", data);
        res.send(order);
    });
    
    app.put("/orders/:id", async (req, res)=>{
        let itemId = req.params.id;
        // let currItem = await db.find("orders",);
        let data = {
            "grand_total": req.body.grand_total
        }
        let upd = await db.updateOne("orders",  {_id:new ObjectId(itemId)}, data);
        res.send(upd);
    });

    app.delete("/orders/:id", async (req, res) =>{
        let itemId = req.params.id;
        let del = await db.deleteOne("orders",{_id: new ObjectId(itemId)});
        res.send(del);
    })

    
}