const isEmpty = (key) => (req, res, next) => {
  if (!req.validation) {
    req.validation = {
      isValid: true,
      message: [],
    };
  }

  const inputValue = req.body[key] ?? "";
  if (typeof inputValue === "string" && inputValue.trim() === "") {
    req.validation.isValid = false;
    req.validation.message.push(`${key} is empty`);
    next();
  }
  next();
};

const isPassword = (key) => (req, res, next) => {
  if (!req.validation) {
    req.validation = {
      isValid: true,
      message: [],
    };
  }

  const inputValue = req.body[key] ?? "";
  if (!inputValue.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)) {
    req.validation.isValid = false;
    req.validation.message.push(
      `${key} minimum eight characters, at least one letter and one number`
    );
    next();
  }
  next();
};

const isEmail = (key) => (req, res, next) => {
  if (!req.validation) {
    req.validation = {
      isValid: true,
      message: [],
    };
  }

  const inputValue = req.body[key] ?? "";
  if (!inputValue.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g)) {
    req.validation.isValid = false;
    req.validation.message.push(
      `The ${key} is invalid`
    );
    next();
  }
  next();
};

module.exports = { isEmpty, isPassword, isEmail };
