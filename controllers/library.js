const Story = require("../models/Story");

//function that gets the unique values from a specific field and sort them
const getUniqueValues = async (field) => {
  const values = await Story.distinct(field);
  return values.filter((value) => value).sort();
};

module.exports = {
    getStories: async (req, res) => {
    try {
      const stories = await Story.find().sort({ createdAt: "desc" }).populate('user', 'userName').lean(); // populate user field with username only

      //grabbing the countries an continents from the database,take the unique values and sort them
      const [countries, continents] = await Promise.all([
        getUniqueValues("country"),
        getUniqueValues("continent"),
      ]);


      res.render("library.ejs", { 
        stories, 
        user: req.user, 
        countries, 
        continents, 
        filterOn: false,
        sortLikes:false,
        sortPopularityDesc:false,
        sortPopularityAsc:false,
      });

    } catch (err) {
      console.log(err);
    }
  },
  filterCountry: async (req, res) => {
    try {
     
      const stories = await Story.find({country:req.query.country})
      .sort({ createdAt: "desc" })
      .populate('user', 'userName')
      .lean();

       //grabbing the countries from the database,take the unique values and sort them
       const [countries, continents] = await Promise.all([
        getUniqueValues("country"),
        getUniqueValues("continent"),
      ]);
      
      console.log(req.query.country);
       res.render("library.ejs", {
        stories, 
        countryChoice:req.query.country || false, 
        continentsChoice:false, 
        user: req.user, 
        countries, 
        continents, 
        filterOn: true,
        sortLikes:false,
        sortPopularityDesc:false,
        sortPopularityAsc:false,
      });


    } catch (err) {
      console.log(err);
    }
  },
  filterContinent: async (req, res) => {
    try {
     
      const stories = await Story.find({continent:req.query.continent})
      .sort({ createdAt: "desc" })
      .populate('user', 'userName')
      .lean();

      const [countries, continents] = await Promise.all([
        getUniqueValues("country"),
        getUniqueValues("continent"),
      ]);
      
      console.log(req.query.country);
       res.render("library.ejs", {
        stories, 
        countryChoice:req.query.country || false, 
        continentsChoice:req.query.continent || false, 
        user: req.user, 
        countries, 
        continents, 
        filterOn: true,
        sortLikes:false,
        sortPopularityDesc:false,
        sortPopularityAsc:false,
      });


    } catch (err) {
      console.log(err);
    }
  },
  sortByMostLiked: async (req,res) =>{
    try {
      const stories = await Story.find().sort({ likes: "desc", createdAt: "desc" }).populate('user', 'userName').lean(); // populate user field with username only

       //grabbing the countries an continents from the database,take the unique values and sort them
      const [countries, continents] = await Promise.all([
        getUniqueValues("country"),
        getUniqueValues("continent"),
      ]);
      

       res.render("library.ejs", { 
        stories,
        user: req.user, 
        countries, 
        continents, 
        filterOn: false,
        sortLikes:true,
        sortPopularityDesc:false,
        sortPopularityAsc:false,
      });

    } catch (err) {
      console.log(err);
    }
  },
  sortByPopularity: async (req,res) =>{
    try {
      const stories = await Story.find().sort({ readBy: "desc", createdAt: "desc" }).populate('user', 'userName').lean(); // populate user field with username only

      //grabbing the countries an continents from the database,take the unique values and sort them
      const [countries, continents] = await Promise.all([
        getUniqueValues("country"),
        getUniqueValues("continent"),
      ]);
      
       res.render("library.ejs", { 
        stories, 
        user: req.user, 
        countries, 
        continents, 
        filterOn: false,
        sortLikes:false,
        sortPopularityDesc:true,
        sortPopularityAsc:false,
      });

    } catch (err) {
      console.log(err);
    }
  },
  undiscoveredTreasures: async (req,res) =>{
    try {
      const stories = await Story.find().sort({ readBy: "asc", createdAt: "desc" }).populate('user', 'userName').lean(); // populate user field with username only

      //grabbing the countries an continents from the database,take the unique values and sort them
      const [countries, continents] = await Promise.all([
        getUniqueValues("country"),
        getUniqueValues("continent"),
      ]);
      
       res.render("library.ejs", { 
        stories, 
        user: req.user, 
        countries, 
        continents, 
        filterOn: false,
        sortLikes:false,
        sortPopularityDesc:false,
        sortPopularityAsc:true,
      });

    } catch (err) {
      console.log(err);
    }
  },
};
