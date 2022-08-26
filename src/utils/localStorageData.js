export const setUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const userData = result ? JSON.parse(result) : null;
  return userData;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
