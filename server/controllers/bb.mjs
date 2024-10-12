import BlackBusiness from "../models/bb.mjs";//the database for blakc busniness stored in mongodb  


export const getAllBlackBusinesses = async (req, res) => {
    try {
        const allBlackBusinesses = await BlackBusiness.find({});
        
        res.status(200).json({
          success: true,
          data: allBlackBusinesses,
        });
    } catch (error) {
      console.log(error);

      if (error instanceof mongoose.ValidationError) {
        res.status(400).json({
          success: false,
          error: error.message
        }) 
      } else {
        res.status(500).json({
          success: false,
          error: "Internal Server Error"
        })
      }
      
    } // returns every black business in the database 
    // has every business in the data base 
    
};

export const getOneBlackBusiness = async (req, res) => {
    const {id} = req.params;

    try {

      const blackBusiness = await BlackBusiness.findOne({_id: id});
      
      if (!blackBusiness) {
        return res.status(404).json({
          success: false,
          message: 'Business not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: blackBusiness,
      });
    } catch (error) {
      console.log(error);

      if (error instanceof mongoose.ValidationError) {
        res.status(400).json({
          success: false,
          error: error.message
        }) 
      } else {
        res.status(500).json({
          success: false,
          error: "Internal Server Error"
        })
      }
    }

};

export const createBlackBusiness = async (req, res) => {
  const {name, location, rating, reviews} = req.body;
    try {
        const newBusiness = await BlackBusiness.create({name, location, rating, reviews});

        res.status(200).json({
          success: true,
          business: newBusiness,
        });
      } catch (error) {
        console.log(error);

        if (error instanceof mongoose.ValidationError) {
          res.status(400).json({
            success: false,
            error: error.message
          }) 
        } else {
          res.status(500).json({
            success: false,
            error: "Internal Server Error"
          })
        }
      }
    };

export const trendingBusinesses = async(req, res) => {
  try {
    const topBusinesses = await BlackBusiness.find({}).sort({ratings: -1}).limit(10);

    res.status(200).json({
      sucess: true,
      topBusinesses: topBusinesses
    });

  } catch (error) {
    console.log(error);

    if (error instanceof mongoose.ValidationError) {
      res.status(400).json({
        success: false,
        error: error.message
      }) 
    } else {
      res.status(500).json({
        success: false,
        error: "Internal Server Error"
      })
    }
  }
}

  


