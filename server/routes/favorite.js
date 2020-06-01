const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const {Favorite} = require("../models/Favorite")

//=================================
//             Favorite
//=================================


router.post("/favoriteNumber", (req, res) => {
    
    //mongoDb에서 favorite 숫자를 가져오기
    Favorite.find({"movieId":req.body.movieId })
    .exec((err, info) => {
        if(err) return res.status(400).send(err)
        console.log('favortieNumber',info.length)
        res.status(200).json({success:true, favoriteNumber : info.length})
    })

    //그다음에 프론트에 다시 숫자정보를 보내주기

});

router.post("/favorited", (req, res) => {
    
    //mongoDb에서 favorite 숫자를 가져오기
    Favorite.find({"movieId":req.body.movieId, "userFrom":req.body.userFrom })
    .exec((err, info) => {
        if(err) return res.status(400).send(err)

        let result =false;
        if(info.length !==0){
            result=true
        }
        console.log('favorited',info.result)
        res.status(200).json({success:true, favorited : result})
    })

    //그다음에 프론트에 다시 숫자정보를 보내주기

});


router.post("/removeFromFavorite", (req, res) => {
    console.log(req.body);
    Favorite.findOneAndDelete({movieId : req.body.movieId, userFrom : req.body.userFrom})
    .exec((err, doc) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, doc})
    })


});

router.post("/addFromFavorite", (req, res) => {
    const favortie = new Favorite(req.body)
    // console.log(favortie);
    // console.log(req.body);
    favortie.save((err, doc)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true})
    });


});

router.post("/getFavoredMovie", (req, res) => {
    Favorite.find({userFrom:req.body.userFrom})
    .exec((err, favorites)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true, favorites})
    })

});

module.exports = router;
