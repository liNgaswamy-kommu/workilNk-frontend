export const isValidEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.com$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};
