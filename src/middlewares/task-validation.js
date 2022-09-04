const TaskValidation = async (req, res, next) => {
  const requiredFields = ['macaddress', 'type', 'title', 'description', 'when'];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }
  return next();
};

module.exports = TaskValidation;
