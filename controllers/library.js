const Story = require("../models/Story");

module.exports = {
    getStories: async (req, res) => {
    try {
      const stories = await Story.find().sort({ createdAt: "desc" }).populate('user', 'userName').lean(); // populate user field with username only

      //grabbing the countries from the database,take the unique values and sort them
      const countryArr = stories
        .map(obj => obj.country)
        .filter(country => country);
      const uniqueCountries = [...new Set(countryArr)]
      const sortedCountries = uniqueCountries.sort((a,b)=>a >b ? 1 : -1)

       //grabbing the continents from the database,take the unique values and sort them
      const continentArr = stories
        .map(obj => obj.continent)
        .filter(continent => continent);
      const uniqueContinents = [...new Set(continentArr)]
      const sortedContinents = uniqueContinents.sort((a,b)=>a >b ? 1 : -1)


      res.render("library.ejs", { stories: stories, user: req.user, countries: sortedCountries, continents: sortedContinents, filterOn: false});
      console.log(req.body)
    } catch (err) {
      console.log(err);
    }
  },
  filterStories: async (req, res) => {
    try {
     
      //checks if either country or continent was chosen for filtering
      const query = req.query.country ? 
              { country: req.query.country } :
              req.query.continent ?
                 { continent: req.query.continent } : {};

      const stories = await Story.find(query)
      .sort({ createdAt: "desc" })
      .populate('user', 'userName')
      .lean();


      const allStories = await Story.find()
       //grabbing the countries from the database,take the unique values and sort them

       const countryArr = allStories
          .map(obj => obj.country)
          .filter(country => country);
       const uniqueCountries = [...new Set(countryArr)]
       const sortedCountries = uniqueCountries.sort((a,b)=>a >b ? 1 : -1)
 
        //grabbing the continents from the database,take the unique values and sort them
       const continentArr = allStories  
          .map(obj => obj.continent)
          .filter(continent => continent);
       const uniqueContinents = [...new Set(continentArr)]
       const sortedContinents = uniqueContinents.sort((a,b)=>a >b ? 1 : -1)
      

       res.render("library.ejs", {
        stories: stories, 
        countryChoice:req.query.country, 
        continentsChoice:req.query.continent, 
        user: req.user, 
        countries: sortedCountries, 
        continents: sortedContinents, 
        filterOn: true
      });


    } catch (err) {
      console.log(err);
    }
  },
  sortByMostLiked: async (req,res) =>{
    try {
      const stories = await Story.find().sort({ likes: "desc", createdAt: "desc" }).populate('user', 'userName').lean(); // populate user field with username only

       //grabbing the countries from the database,take the unique values and sort them
       const countryArr = stories
          .map(obj => obj.country)
          .filter(country => country);
       const uniqueCountries = [...new Set(countryArr)]
       const sortedCountries = uniqueCountries.sort((a,b)=>a >b ? 1 : -1)
 
        //grabbing the continents from the database,take the unique values and sort them
       const continentArr = stories
          .map(obj => obj.continent)
          .filter(continent => continent);
       const uniqueContinents = [...new Set(continentArr)]
       const sortedContinents = uniqueContinents.sort((a,b)=>a >b ? 1 : -1)
      
    
       res.render("library.ejs", { stories: stories, user: req.user, countries: sortedCountries, continents: sortedContinents, filterOn: true});

    } catch (err) {
      console.log(err);
    }
  },
  sortByPopularity: async (req,res) =>{
    try {
      const stories = await Story.find().sort({ readBy: "desc", createdAt: "desc" }).populate('user', 'userName').lean(); // populate user field with username only

       //grabbing the countries from the database,take the unique values and sort them
       const countryArr = stories
          .map(obj => obj.country)
          .filter(country => country);
       const uniqueCountries = [...new Set(countryArr)]
       const sortedCountries = uniqueCountries.sort((a,b)=>a >b ? 1 : -1)
 
        //grabbing the continents from the database,take the unique values and sort them
       const continentArr = stories
          .map(obj => obj.continent)
          .filter(continent => continent);
       const uniqueContinents = [...new Set(continentArr)]
       const sortedContinents = uniqueContinents.sort((a,b)=>a >b ? 1 : -1)
      
    
       res.render("library.ejs", { stories: stories, user: req.user, countries: sortedCountries, continents: sortedContinents, filterOn: true});

    } catch (err) {
      console.log(err);
    }
  },
  undiscoveredTreasures: async (req,res) =>{
    try {
      const stories = await Story.find().sort({ readBy: "asc", createdAt: "desc" }).populate('user', 'userName').lean(); // populate user field with username only

       //grabbing the countries from the database,take the unique values and sort them
       const countryArr = stories
          .map(obj => obj.country)
          .filter(country => country);
       const uniqueCountries = [...new Set(countryArr)]
       const sortedCountries = uniqueCountries.sort((a,b)=>a >b ? 1 : -1)
 
        //grabbing the continents from the database,take the unique values and sort them
       const continentArr = stories
          .map(obj => obj.continent)
          .filter(continent => continent);
       const uniqueContinents = [...new Set(continentArr)]
       const sortedContinents = uniqueContinents.sort((a,b)=>a >b ? 1 : -1)
      
    
       res.render("library.ejs", { stories: stories, user: req.user, countries: sortedCountries, continents: sortedContinents, filterOn: true});

    } catch (err) {
      console.log(err);
    }
  },
};
