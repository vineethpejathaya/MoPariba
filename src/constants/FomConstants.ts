const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export {emailRegEx, passwordRegEx};
