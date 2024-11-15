import asyncHandler from "../utils/asyncHandler.js";

const registerContact = asyncHandler(async (req, res) => {
  res.status(200).send("Register User");
});

export { registerContact };
