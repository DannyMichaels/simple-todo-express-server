// Helper function to log requests
const logRequest = (req) => {
  console.log(new Date().toISOString(), req.method, req.baseUrl);
};

// Helper function to handle errors
const handleError = (res, error) => {
  res.status(500).json({
    status: 'Error',
    message: 'Error in DB Operation!',
    error: error.message,
  });
};

module.exports = {
  logRequest,
  handleError,
};
