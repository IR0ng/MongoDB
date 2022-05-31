import UserModel from "./userdata.model"

export default async function handler(req, res) {
  if(req.method === "POST"){
  const { name, email, password } = req.body;
  const newData = { name, email, password };
  const resData = await UserModel.userSignUp(newData);
  req.body = {
    status : "ok",
    id : resData.id
  }
  res.status(200).send(req.body)

  }else if (req.method === "GET"){
    const { id } = req.body
    const resData = await UserModel.findUserData(id);
    req.body = {
      status : "ok",
      userdata: resData
    }
    res.status(200).send(req.body)

  }else if (req.method === "PATCH") {
    const resData = await UserModel.Update(req.body);
    req.body = {
      status : "ok",
    }
    res.status(200).send(req.body)

  }else if (req.method === "DELETE"){
    const { id } = req.body
    const resData = await UserModel.deleteUserData(id);
    req.body = {
      status : "ok",
      Deleted : resData
    }
    res.status(200).send(req.body)
  }
}
