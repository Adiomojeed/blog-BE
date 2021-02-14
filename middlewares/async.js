// async (data) => {
//   try {
//     const { password, email } = data;
//     let user = await User.isEmailTaken(email);
//     if (user) throw new ApiError(400, "Email is taken");
//     const salt = await bcrypt.genSalt();
//     const hashed = await bcrypt.hash(password, salt);
//     user = await User.create({ ...data, password: hashed });
//     const token = user.generateToken();
//     return {
//       data: _.pick(user, ["_id", "name", "email", "isAdmin", "createdAt"]),
//       token,
//       error: null,
//     };
//   } catch (error) {
//     return { data: null, error: error.message };
//   }
// };

module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};
