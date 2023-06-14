const uppercaseMiddleware = (req, res, next) => {
  // Get the search queries from the request
  const { departure, arrival } = req.query;

  // Function to convert the first word to uppercase
  const convertFirstWordToUppercase = (query) => {
    // Split the query into individual words
    const words = query.split(" ");

    // Check if the first word is in lowercase
    if (words.length > 0 && /^[a-z]/.test(words[0])) {
      // Convert the first word to uppercase
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

      // Reconstruct the query
      return words.join(" ");
    }

    return query;
  };

  // Convert the first word of departure if applicable
  if (departure && typeof departure === "string") {
    req.query.departure = convertFirstWordToUppercase(departure);
  }

  // Convert the first word of arrival if applicable
  if (arrival && typeof arrival === "string") {
    req.query.arrival = convertFirstWordToUppercase(arrival);
  }

  // Call the next middleware or route handler
  next();
};

export default uppercaseMiddleware;
