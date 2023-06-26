import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustom = token.length < 500;
    let decodedData;

    if (token && isCustom) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    res.status(404).json(error);
  }
};

export default auth;
