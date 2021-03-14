const ObjectId = require("mongodb").ObjectID;
module.exports = (app, db) =>{
    app.get("/users", async (req, res) =>{
        let users = await db.find("users");
        res.send(users);
    })

    app.get("/users/:id", async (req, res) =>{
        let orderId = req.params.id;
        let users = await db.find("users", {_id:{$eq: new ObjectId(orderId)}});
        res.send(users);
    });

    app.get("/users/:id/orders", async (req, res) =>{
        let orderId = req.params.id;
        let orders = await db.find("orders", {"user_id":{$eq: new ObjectId(orderId)}});
        res.send(orders);
    });

    app.post("/users", async (req, res)=>{
        let data = {
            "email": req.body.email,
            "password": req.body.password,
            "username": req.body.username,
            "address": req.body.address
        };
        let order = await db.insertOne("users", data);
        res.send(order);
    });
    
    app.put("/users/:id", async (req, res)=>{
        let itemId = req.params.id;
        // let currItem = await db.find("users",);
        let data = {
            "password": req.body.password,
            "username": req.body.username,
            "address": req.body.address
        }
        let upd = await db.updateOne("users",  {_id:new ObjectId(itemId)}, data);
        res.send(upd);
    });

    app.delete("/users/:id", async (req, res) =>{
        let itemId = req.params.id;
        let del = await db.deleteOne("users",{_id: new ObjectId(itemId)});
        res.send(del);
    });


    app.post("/users/login", async (req, res)=>{
        let email = req.body.email;
        let user = await db.find("users", {"email": email});
        console.log(user);
        let data = {
            "success": false,
            "userId": user[0]._id
        }
        if(user[0].password == req.body.password){
            data.success = true;
            res.send(data);
        }else{
            data.success = false;
            data.userId = "";
            res.send(data);
        }
        
    })

    
}