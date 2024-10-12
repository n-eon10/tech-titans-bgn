import User from "../models/user.mjs"

//define creating user 
export const createUser = async (req, res) => {
  const {username} = req.body;

  try {
    const isUser = await User.find({username: username})
    if (isUser) {
      return res.status(409).json({
        success: false,
        error: "user already exists with this username"
      });
    }
    const user = await User.create({username});

    res.status(200).json({
      success: true,
      user: user
    });

  } catch (error) {

  }
}
//define getting user 
export const getUser = async (req, res) => {
  const {userid} = req.params;

  try {
    const user = await User.find({_id: userid});

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user: user
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