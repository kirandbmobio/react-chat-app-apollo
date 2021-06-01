exports.validateUser = async (args) => {
  if (
    args.userInput.username.trim() === "" ||
    args.userInput.email.trim() === "" ||
    args.userInput.password.trim() === ""
  ) {
    return true;
  }
  return false;
};
