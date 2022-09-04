const MacAddressValidation = (req, res, next) => {
  if (!req.body.macaddress) {
    return res.status(400).json({ error: 'macaddress is required' });
  }
  return next();
};

module.exports = MacAddressValidation;
