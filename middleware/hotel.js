// const Uppercasemiddleware = (req, res, next) => {
//   const { hotelplace } = req.query;

//   const words = hotelplace.split(" ");

//   if (words.length > 0 && /^[a-z]/.test(words[0])) {
//     words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

//     req.query = words.join(" ");
//   }
//   next();
// };

// export default Uppercasemiddleware;
const UppercaseMiddleware = (req, res, next) => {
  // Get the search query from the request
  const { hotelplace } = req.query;

  // Split the hotelplace query into individual words
  const words = hotelplace.split(" ");

  // Check if the first word is in lowercase
  if (words.length > 0 && /^[a-z]/.test(words[0])) {
    // Convert the first word to uppercase
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

    // Reconstruct the hotelplace query
    req.query.hotelplace = words.join(" ");
  }

  // Call the next middleware or route handler
  next();
};

export default UppercaseMiddleware;