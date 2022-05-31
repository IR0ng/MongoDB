import UserModel from "./userdata.model"

export default async function handler(req, res) {
  if(req.method === "POST"){
  const { name, email, password } = req.body;
  const newData = { name, email, password };
  const resData = await UserModel.userSignUp(newData);
  
  res.status(200).send({
    status : "ok",
    id : resData.id
  })

  }else if (req.method === "GET"){
    const { id } = req.body
    const resData = await UserModel.findUserData(id);

    res.status(200).send({
      status : "ok",
      userdata: resData
    })

  }else if (req.method === "PATCH") {
    await UserModel.Update(req.body);

    res.status(200).send({
      status : "ok",
    })

  }else if (req.method === "DELETE"){
    const { id } = req.body
    const resData = await UserModel.deleteUserData(id);

    res.status(200).send({
      status : "ok",
      Deleted : resData
    })
  }
}
