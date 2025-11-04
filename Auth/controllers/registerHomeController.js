const { default: mongoose } = require("mongoose");
const HomeModel = require("../models/HomeModel");

let getRegisterPage = (req, res) => {
    res.render('register', { isLoggedIn: req.session.isLoggedIn, user: req.session.user , editing :false});
}

let postRegisterPage = async (req, res) => {  
    const {name,house_no,price,rooms,address,photo} = req.body;

    const Home = new HomeModel({
        name,
        house_no,
        price,
        rooms,
        address,
        photo,
        user:req.session.user._id
    });

    try{

    await Home.save();
    res.redirect("/host/myHomes");

    }catch(error){
        console.log(error)
        return res.status(500).render('register',{
            isLoggedIn:req.session.isLoggedIn,
            user:req.session.user,
            editing:false,
            error:[error.message]
        });
    }
   
}

module.exports = { getRegisterPage, postRegisterPage };