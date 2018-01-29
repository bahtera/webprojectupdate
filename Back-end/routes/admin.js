const express = require("express");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const url = require("url");

const router = express.Router();

router.get("/:id", (req, res) => {
    Admin.findById(req.params.id, (error, result) => {
        if(error){
            res.status(500).json(error);
        }else{
            res.json(result);
        }
    });
})

router.get("/", (req, res) => {
    Admin.find({}, (error, result) => {
        if(error){
            res.status(500).json(error);
        }else{
            res.json(result);
        }
    });
});


// router.post("/", (req, res) => {
//     let newObj = new Admin({
//         nama : req.body.nama,
//         username : req.body.username,
//         password : req.body.password
//     });

//     newObj.save((error) => {
//         if(error){
//             res.status(500).send(error);
//         }else{
//             res.json(newObj);
//         }
//     });
// });

router.post("/", (req, res) => {
    if (!req.files.foto) {
        return res.status(400).send("No files were uploaded");
    }

    let image = req.files.foto;
    let date = new Date();
    let imageName = date.getTime() + ".png";

    image.mv("./public/foto/" + imageName, (error) => {
        let newAdmin = new Admin({
            nama: req.body.nama,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            foto: "http://localhost:3000/foto/" + imageName
        });

        newAdmin.save((error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.json(newAdmin);
            }
        })
    });
});

router.delete("/:id", (req, res) => {
    Admin.findByIdAndRemove(req.params.id, (error, result) => {
        if(error){
            res.status(500).json(error);
        }else{
            res.json({message : "Data deleted"});
        }
    });
});

router.post("/login", (req, res) => {

    Admin.findOne({ username : req.body.username, password : req.body.password}, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else if(!result){ 
            res.status(404).json({ message : "User not found !"});
        }
        else {
            const payload = {
                id : result._id,
                name : result.username
            };
            const token = jwt.sign(payload, "secretkey", { expiresIn : 3600 });    
            res.json({ token : token});
        }

    });
});

module.exports = (function(){
    return router;
})();