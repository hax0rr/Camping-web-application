var express = require("express");
// MergeParams bcoz :id couldnt be fund after refactoing
var router = express.Router({mergeParams: true});
var campground = require("../models/campgrounds");
var comment = require("../models/comment");
var middleware = require("../middleware")

// COMMENTS ROUTES ++++++++++++++++++++++++++
router.get("/new", middleware.isLoggedIn ,function(req,res){
    campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground:campground});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req,res){
    campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
         
            comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error","Something went wrong!!");

                    console.log(err);
                }
                else{
                    // Add Username and ID to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // console.log(req.user.username);
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save();
                    req.flash("success","Successfully added comment");
                    res.redirect("/campgrounds/"+campground._id);
                        
                }
            });
        }
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req,res){

    comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err){
            res.redirect("back");
        }
        else{ 
            res.render("comments/edit",{campground_id : req.params.id, comment : foundComment});
        }
    });
 
});

//Commens updATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//Commnent destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("sucess","Comment deleted");
            res.redirect("/campgrounds/" +req.params.id);
        }
    });
});

module.exports = router;
