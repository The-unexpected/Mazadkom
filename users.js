const users = [];

const addUser = ({ id, username, title }) => {
  username = username
  title = title

  const existingUser = users.find(
    (user) => user.title === title && user.username === username
  );
  if (existingUser) {
    return { error: "Userusername is taken!" };
  }

  const user = { id, username, title };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersIntitle = (title) => users.filter((user) => user.title === title);

module.exports = { addUser, removeUser, getUser, getUsersIntitle };
