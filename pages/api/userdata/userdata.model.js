import mongoose from "mongoose";

const MongoDB_URL = process.env.MongoDB_URL;

const UserSchema = new mongoose.Schema({
  name : String,
  email : String,
  password : String
});

let userData
try {
  userData = mongoose.model("UserData");
} catch (error) {
  userData = mongoose.model("UserData", UserSchema);
}

class UserModel {
  constructor(){
    mongoose.connect(MongoDB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  userSignUp(params){
    let newUser = new userData(params)
    return newUser.save();
  }

  findUserData(params){
    return userData.findById(params);
  }

  Update(params){
    const { id } = params;
    const { name, email, password } = params;
    const newData = { name, email, password }
    return userData.findByIdAndUpdate(id, newData)
  }

  deleteUserData(params){
    return userData.findByIdAndDelete(params);
  }
}

export default new UserModel();