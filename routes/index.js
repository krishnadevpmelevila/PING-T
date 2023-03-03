var express = require("express");
require("dotenv").config();
var router = express.Router();
var axios = require("axios");
const cheerio = require("cheerio");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "PInG-T" });
});
router.post("/", (req, res) => {

  const url = 'https://api.sandbox.co.in/authenticate';
  const headers = {
    'accept': 'application/json',
    'x-api-key': process.env.KEY,
    'x-api-secret': process.env.SECRET,
    'x-api-version': '1.0',
  };

  axios.post(url, {}, { headers })
    .then(response => {
      const token = response.data.access_token

      const url = 'https://api.sandbox.co.in/bank/upi/'+req.body.upiId+'@paytm'
      const headers = {
        'Authorization': token,
        'x-api-key': process.env.KEY,
        'x-api-version': '1.0.0',
      };

      axios.get(url, { headers })
        .then(response => {
          const personName =response.data.data.name_at_bank;
          res.send(personName);
        })
        .catch(error => {
          console.error(error);
        });

    })
    .catch(error => {
      console.error(error);
    });


  // axios
  //   .all([
  //     axios.get(process.env.VERIFICATION_API + req.body.upiId + "@ybl"),
  //     axios.get(process.env.VERIFICATION_API + req.body.upiId + "@paytm"),
  //   ])
  //   .then(
  //     axios.spread((...responses) => {
  //       const responseOne = responses[0];
  //       const responseTwo = responses[1];

  //       response = [responseTwo.data];
  //       response = response[0].split("|");
  //       data = [response[2]];

  //       axios
  //         .get("https://ifsc.bankifsccode.com/" + response[7])
  //         .then((response) => {

  //           newdata = response.data
  //           const $ = cheerio.load(newdata);
  //           let content = [];
  //           // get title
  //           const title = $("title").text();
  //           location = title.split(",");

  //           realData = [location[1], data];
  //           console.log(realData);
  //           res.send(realData);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           res.status(400).send(err);
  //         });
  //     })
  //   )
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).send(err);
  //   });
});

module.exports = router;
