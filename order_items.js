let ObjectId = require("mongodb").ObjectID;
module.exports = (app, db)=>{
    app.get("/order_items", async (req, res)=>{
        let order_items = await db.find("order_items");
        console.log(order_items);
        res.send(order_items);
    });
    app.get("/order_items/:id", async (req, res)=>{
        let itemId = new ObjectId(req.params.id);
        let order_items = await db.find("order_items", {_id: new ObjectId(itemId)});
        console.log(order_items);
        res.send(order_items);
    });

    app.put("/order_items/:id", async (req, res)=>{
        // let order_items = await db.find("order_items");
        let itemId = new ObjectId(req.params.id);
        let data = {
            "quantity": req.body.quantity
        };
        let upd = await db.updateOne("order_items", {_id: itemId}, data );
        console.log(upd);
        res.send(upd);
    });

    app.post("/order_items", async (req, res) =>{
        let data = {
            "item_id" : new ObjectId(req.body.item_id),
            "order_id": new ObjectId(req.body.order_id),
            "quantity": req.body.quantity

        };
        let newItem = await db.insertOne("order_items", data);
        res.send(newItem);
    });

    app.delete("/order_items/:id", async (req, res) =>{
        let itemId = new ObjectId(req.params.id);
        // let data = {
        //     "item_id" : new ObjectId(req.body.item_id),
        //     "order_id": new ObjectId(req.body.order_id),
        //     "quantity": req.body.quantity

        // };
        let newItem = await db.deleteOne("order_items", {_id: itemId});
        res.send(newItem);
    });

         
    // app.put("/order_items/:id", async (req, res) =>{
    //     let myId = req.params.id;
    //     let data = {
    //         "quantity": req.body.quantity

    //     };
    //     let newItem = await db.updateOne("order_items",{_id: new ObjectId(myId)}, data);
    //     res.send(newItem);
    // });

    
}
