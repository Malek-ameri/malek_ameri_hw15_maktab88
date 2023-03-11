const data = require("../db/user-data.json");

const login = (req, res) => {

  const { isValid, message } = req.validation;
  if (!isValid) return res.status(400).send(message);
  const { username, password } = req.body;
  const usernamefind = data.find((item) => item.username === username);



  if (!usernamefind)
    return res.status(400).json({ message: "username or password is invalid" });
  if (usernamefind.password !== password)
    return res.status(400).json({ message: "username or password is invalid" });

  res.status(200).render('user-panel',{usernamefind})
};

module.exports = login;
