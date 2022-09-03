const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camp-reviews', {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for( let i =0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            // Your User ID
            author: '630f11a1ee7c71f091531e43',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'random descriptions',
            price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [ 
                {
                     "url" : "https://res.cloudinary.com/dfgvjqfjw/image/upload/v1662093659/CampReviews/yrl9a3gl5wucn2aznvjm.png",
                    "filename" : "CampReviews/yrl9a3gl5wucn2aznvjm"
                    
                }, 
                { 
                    "url" : "https://res.cloudinary.com/dfgvjqfjw/image/upload/v1662093659/CampReviews/e5mj9fmt6yxs4wcekwla.png", 
                    "filename" : "CampReviews/e5mj9fmt6yxs4wcekwla"
                } ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})