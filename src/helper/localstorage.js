export const isSignedIn = () => {
  if (typeof window === "undefined") return false;
  const user = window.localStorage.getItem("user");
  if (!user) return false;
  return JSON.parse(user);
};

export const setUser = (user) => {
  user.password = null;
  if (typeof window === "undefined") return;
  window.localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("user");
};
