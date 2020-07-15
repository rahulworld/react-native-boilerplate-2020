const reportError = (err, logger) => {
    const error = err.originalError || err;
    console.error("Error reported :: ", err, logger, error);
  };
  
export { reportError };