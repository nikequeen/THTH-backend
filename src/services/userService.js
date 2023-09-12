const models = require("../models/user");
const QueryClass = require("../utils/QueryClass");
const queryClass2 = new QueryClass(models);

async function createUser(nom, email, motdepasse) {
  try {
    const newUser = await queryClass2.create({
      nom: nom,
      email: email,
      motdepasse: motdepasse,
    });
    return newUser;
  } catch (error) {
    console.log("Failed to create user:", error);
    throw new Error("Failed to create user: " + error.message);
  }
}

async function findOneUser(req, res) {
  const userId = req.params.id;
  try {
    const user = await queryClass2.findOne({ id: userId });
    if (!user) {
      console.log("Cet utilisateur n'existe pas.");
      res.status(404).send("Cet utilisateur n'existe pas.");
      return;
    }
    return user;
  } catch (error) {
    console.log("Failed to find user:", error);
    throw new Error("Failed to find user: " + error.message);
  }
}

module.exports = { createUser, findOneUser };

// const Models = require("../models/user");
// const queryclass =require("../utils/queryClass");
// const getUserData = () => {
//     // Service logic here
//     console.log("From Service User")
// };
  
// module.exports = {
//     getUserData,
// };
  