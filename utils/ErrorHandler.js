function errorHandler(action) {
  return async (req, res, next) => {
    try {
      await action(req, res, next);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
      } else {
        console.log(error);
        return res.status(500).send('Error');
      }
    }
  };
}

module.exports = errorHandler;
