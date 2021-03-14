const ObjectId = require("mongodb").ObjectID;
module.exports = (app, db) =>{
    app.get("/comments", async (req, res) =>{
        let comments = await db.find("comments");
        res.send(comments);
    })

    app.get("/comments/:id", async (req, res) =>{
        let orderId = req.params.id;
        let comments = await db.find("comments", {_id:{$eq: new ObjectId(orderId)}});
        res.send(comments);
    });

    app.post("/comments", async (req, res)=>{
        let data = {
            "user_id": new ObjectId(req.body.user_id),
            "item_id": new ObjectId(req.body.item_id),
            "comment_title": req.body.comment_title,
            "comment_body": req.body.comment_body,
            "rating": req.body.rating
        };
        let order = await db.insertOne("comments", data);
        res.send(order);
    });
    
    app.put("/comments/:id", async (req, res)=>{
        let itemId = req.params.id;
        // let currItem = await db.find("comments",);
        let data = {
            "user_id": new ObjectId(req.body.user_id),
            "item_id": new ObjectId(req.body.item_id),
            "comment_title": req.body.comment_title,
            "comment_body": req.body.comment_body,
            "rating": req.body.rating
        };
        let upd = await db.updateOne("comments",  {_id:new ObjectId(itemId)}, data);
        res.send(upd);
    });

    app.delete("/comments/:id", async (req, res) =>{
        let itemId = req.params.id;
        let del = await db.deleteOne("comments",{_id: new ObjectId(itemId)});
        res.send(del);
    })

    
}