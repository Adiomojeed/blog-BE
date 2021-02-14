const objectId = (id, error) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return error.message('"{{#label}}" must be a valid mongo id');
  }
  return id;
};

module.exports = { objectId };
