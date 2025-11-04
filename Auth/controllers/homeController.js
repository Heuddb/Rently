const HomeModel = require("../models/HomeModel");

let getHome = async(req,res,next)=>{
    try{
       
       let homes = await HomeModel.find().populate('user');
       res.render('home',{homes:homes,isLoggedIn:req.session.isLoggedIn,user:req.session.user});

    }catch(error){
        console.log(error)


    }
};

module.exports = getHome;