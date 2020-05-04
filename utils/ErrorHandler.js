function errorHandler(action) {
  return async (req, res, next) => {
    try {
      await action(req, res, next);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).send('Error');
      }
    }
  };
}

module.exports = errorHandler;
