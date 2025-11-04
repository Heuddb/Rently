const HomeModel = require("../models/HomeModel");
let getMyHome = async (req, res, next) => {
    try{
     
        let homes = await HomeModel.find({user:req.session.user._id});
        res.render('myHome',{homes:homes,isLoggedIn:req.session.isLoggedIn,user:req.session.user});


    }catch(error){
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = getMyHome;