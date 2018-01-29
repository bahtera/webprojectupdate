const express = require("express");
const Resep = require("../models/resep");
const http = require("http");
const url = require("url");

const router = express.Router();

// router.get("/detail/:id", (req, res) => {
//     Resep.findById(req.params.id, (error, result) => {
//         if(error){
//             res.status(500).json(error);
//         }else{
//             res.json(result);
//         }
//     });
// })


router.get('/detail/:id', function (req, res, next) {
    Resep.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.get("/sumatera", (req, res) => {
    Resep.find({ kategori: "Sumatera dan Sekitarnya" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/jawa", (req, res) => {
    Resep.find({ kategori: "Jawa, Madura dan Sekitarnya" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/kalimantan", (req, res) => {
    Resep.find({ kategori: "Kalimantan dan Sekitarnya" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/sulawesi", (req, res) => {
    Resep.find({ kategori: "Sulawesi dan Sekitarnya" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/maluku", (req, res) => {
    Resep.find({ kategori: "Maluku dan Sekitarnya" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/bali-nusra", (req, res) => {
    Resep.find({ kategori: "Bali, Nusa Tenggara dan Sekitarnya" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/papua", (req, res) => {
    Resep.find({ kategori: "Papua dan Sekitarnya" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/", (req, res) => {
    Resep.find({}, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
});

router.post("/", (req, res) => {
    if (!req.files.gambar) {
        return res.status(400).send("No files were uploaded");
    }

    let image = req.files.gambar;
    let date = new Date();
    let imageName = date.getTime() + ".png";

    image.mv("./public/gambar/" + imageName, (error) => {
        let newResep = new Resep({
            judul: req.body.judul,
            kategori: req.body.kategori,
            resep: req.body.resep,
            gambar: "http://localhost:3000/gambar/" + imageName,
            penulis: req.body.penulis
        });

        newResep.save((error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.json(newResep);
            }
        })
    });
});

router.put('/edit/:id', function (req, res, next) {
    Resep.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete("/:id", (req, res) => {
    Resep.findByIdAndRemove(req.params.id, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json({ message: "Data deleted" });
        }
    });
});

module.exports = (function () {
    return router;
})();