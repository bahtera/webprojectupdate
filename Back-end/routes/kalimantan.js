const express = require("express");
const Kalimantan = require("../models/resep");

const router = express.Router();

router.get("/:id", (req, res) => {
    Kalimantan.findById(req.params.id, (error, result) => {
        if(error){
            res.status(500).json(error);
        }else{
            res.json(result);
        }
    });
})

router.get("/", (req, res) => {
    Kalimantan.find({}, (error, result) => {
        if(error){
            res.status(500).json(error);
        }else{
            res.json(result);
        }
    });
});

router.post("/", (req, res) => {
    if(!req.files.gambar){
        return res.status(400).send("No files were uploaded");
    }

    let image = req.files.gambar;
    let date = new Date();
    let imageName = date.getTime()+".png";

    image.mv("./public/gambar/"+imageName, (error) => {
        let newObj = new Kalimantan({
            judul : req.body.judul,
            kategori : req.body.kategori,
            resep : req.body.resep,
            gambar : "http://localhost:3000/gambar/"+imageName
        });

        newObj.save((error) => {
            if(error){
                res.status(500).send(error);
            }else{
                res.json(newObj);
            }
        })
    });
});

router.delete("/:id", (req, res) => {
    Kalimantan.findByIdAndRemove(req.params.id, (error, result) => {
        if(error){
            res.status(500).json(error);
        }else{
            res.json({message : "Data deleted"});
        }
    });
});

module.exports = (function(){
    return router;
})();