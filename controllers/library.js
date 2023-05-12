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
        filterOn: false});

    } catch (err) {
      console.log(err);
    }
  },
  filterStories: async (req, res) => {
    try {
     
      //checks if either country or continent was chosen for filtering
      const query = req.query.country 
          ? { country: req.query.country } 
          :  req.query.continent 
          ?  { continent: req.query.continent } 
          : {};

      const stories = await Story.find(query)
      .sort({ createdAt: "desc" })
      .populate('user', 'userName')
      .lean();

       //grabbing the countries an continents from the database,take the unique values and sort them
      const [countries, continents] = await Promise.all([
        getUniqueValues("country"),
        getUniqueValues("continent"),
      ]);
      
       res.render("library.ejs", {
        stories, 
        countryChoice:req.query.country, 
        continentsChoice:req.query.continent, 
        user: req.user, 
        countries, 
        continents, 
        filterOn: true
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
        filterOn: true});

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
        filterOn: true});

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
        filterOn: true});

    } catch (err) {
      console.log(err);
    }
  },
};
