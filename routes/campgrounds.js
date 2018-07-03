// INDEX ROUTE - show all campgrounds
var express = require("express");
var router = express.Router();
var campground = require("../models/campgrounds");
var middleware = require("../middleware")

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

// NEW - SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new",middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});

// CREATE - ADD NEW TO DATABASE
router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var price=req.body.price;
    var image = req.body.image;
    var dsc = req.body.description;
    var author = {
        id: req.user._id,
        username:req.user.username
    }
    var newCamp = { name:name, price:price,image : image, description : dsc, author : author }
    // Create new campground and save to database
    campground.create(newCamp,function(err,newCreated){
        if(err){
            console.log(err);
        }
        else{
                res.redirect("/campgrounds");
        }
    });
   
});

// SHOW - see particular campground with description
router.get("/:id",function(req,res){
    // Take id and show the description about it..
    campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", { campground : foundCampground });
        }
    });
});

// METHODS FOR EDIT ROUTE!! 
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res) {
    
      campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            res.redirect("back");
        }
        else{
          res.render("campgrounds/edit",{campground:foundCampground});
        }
    });
   
});


//UPDATE CAMPGROUND ROUTE!!
router.put("/:id", middleware.checkCampgroundOwnership,function(req,res){
    // find and update 
    var data = {
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        description:req.body.description
    }
    campground.findByIdAndUpdate(req.params.id, data, function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
    
    // redirect back
});
// Delete campground route
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res) {
    campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
    // res.send("isjgij");
});


// 
module.exports = router;