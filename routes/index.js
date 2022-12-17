var express = require("express");
require('dotenv').config()
var router = express.Router();
var axios = require("axios");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "PInG-T" });
});
router.post("/", (req, res) => {

  axios.all([
    axios.get(process.env.VERIFICATION_API + req.body.upiId + "@paytm")


  ]).then(axios.spread((...responses) => {
    const responseOne = responses[0]

    response=[responseOne.data]
    response = response[0].split("|")
    res.send(response[2])
    
  })).catch(err => {
    console.log(err);
    res.status(400).send(err);

  })
 
  
      
});


module.exports = router;
