function isErrorOrErrorEvent(wat) {
  return Object.prototype.toString.call(wat) === '[object Error]' || Object.prototype.toString.call(wat) === '[object ErrorEvent]';
}

const reportError = (err, logger) => {
    const error = err.originalError || err;
    if (isErrorOrErrorEvent(error)) {
      if (__DEV__) {
        console.error("Error reported :: ", err, logger);
      }
    }
  };
  
export { reportError };