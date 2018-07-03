
var mongoose = require("mongoose");
var campground = require("./models/campgrounds");
var comment = require("./models/comment");

var data = [
{
    name:"Sting",
    image:"https://farm4.staticflickr.com/3253/2769362264_98330862ac.jpg",
    description:"readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)"

},  
{
    name:"Aston Ma",
    image:"https://farm6.staticflickr.com/5285/5264495116_e9f04f3bfc.jpg",
    description:"readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
},  
{
    name:"Origano",
    image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
    description:"readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
}
    
];

function seedDB(){
    // Remove camps
    campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campground!");
        // ADd
        //   data.forEach(function(seed){
        //     campground.create(seed, function(err,campground){
        //         if(err){
        //             console.log(err);
        //         }
        //         else{
        //             console.log("Added");
        //             // create comment
        //             comment.create(
        //                 { 
        //                     text: "This place is great... ",
        //                     author:"sa"
        //                 },function(err,comment){
        //                     if(err){
        //                         console.log(err);
        //                     }
        //                     else{
        //                         console.log("Created comment");
        //                         campground.comments.push(comment);
        //                         campground.save();
                                
        //                     }
        //                 });
        //         }
        //     });
        // });
      
    });
// Add comment
}
module.exports = seedDB; 