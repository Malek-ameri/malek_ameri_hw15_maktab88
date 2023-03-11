const { writeFile } = require("node:fs/promises");
const {join} = require('node:path')
const data = require("../db/user-data.json");

const signup = async (req, res) => {
  try {
    const { isValid, message } = req.validation;
    if (!isValid) return res.status(400).send({status:"fild",message:message});
    const { username } = req.body;
    const existUsername = data.find((item) => item.username === username);
    if (!!existUsername) return res.status(409).send({ status: "this username is exist" });
    if(! req.body.gender) req.body.gender = "not-set"
    req.body.isLoggedIn = "false"
    console.log(req.body);
    data.push(req.body);
    await writeFile(
      join(__dirname, "../db/user-data.json"),
      JSON.stringify(data)
    );

    res.status(201).render("login")
  } catch (error) {

    console.log(error);
  }
};

module.exports = signup;
