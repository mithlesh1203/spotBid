const express = require('express');
var cors = require('cors')
const conn = require('./db/conn')
const app = express();
const User = require('./models/userSchema');
const SpotBidSchema = require('./models/spotBidSchema');
const PORT = (process.env.PORT || 5000);
const { request } = require('express');
const multer = require('multer')
const cron = require('node-cron')

app.use(express.json());
app.use(cors())

cron.schedule('* * * * *', () => {
  spotBidDataFetch()
})

const spotBidDataFetch = async () => {
  try {
    const spotBidData = await SpotBidSchema.aggregate([
      { $sort: { name: 1 } },
    ]);
    spotBidData.map((product) => {
      const bidEndTimeE = product.bidEndTime;

      const pickupTime = new Date();
      const bidEndTime = new Date(bidEndTimeE);

      (bidEndTime - pickupTime < 0) && UpdateSpotBidStatus(product._id)
      
    });
  } catch (e) {

    console.log(e)
  }
}

const UpdateSpotBidStatus = async (id) => {
  try {
    let result = await SpotBidSchema.updateMany(
      { _id: id },
      { $set: { bidStatus: false } }
    );
  } catch (err) {
    console.log(`Something went wrong while fetching and changing the status spot bids ERROR: ${err}`);
  }

};


app.post('/spot-bid-registation', async (req, res) => {
  let spotBid = new SpotBidSchema(req.body);
  let result = await spotBid.save();
  console.log("🚀 ~ file: index.js:104 ~ app.post ~ result:", result)
  result = result.toObject();
  res.send(result);
});

app.get('/spot-bid-active-details', async (req, res) => {
  try {
    const productData = await SpotBidSchema.aggregate([
      { $sort: { name: 1 } },
      { $match: { bidStatus: true } }
    ]);
    if (productData.length) {
      res.send(productData)
    }
  } catch (err) {
    console.log(`Something went wrong while fetching active spot bids ERROR: ${err}`);
  }
});

app.get('/spot-bid-expire-details', async (req, res) => {
  try {
    const productData = await SpotBidSchema.aggregate([
      { $sort: { name: 1 } },
      { $match: { bidStatus: false } }
    ]);
    if (productData.length) {
      res.send(productData)
    }
  } catch (err) {
    console.log(`Something went wrong while fetching compleated spot bids ERROR: ${err}`);
  }
});







app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})