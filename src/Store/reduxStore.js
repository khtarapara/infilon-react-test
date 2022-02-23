import { createStore } from "redux";

const userReducer = (state = { users: [] }, action) => {
  if (action.type === "REPLACE_USERS") {
    let newUsers = JSON.parse(JSON.stringify(action.users));
    console.log(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    return { users: newUsers };
  }

  if (action.type === "EDIT_USER") {
    let newUsers = JSON.parse(JSON.stringify(state.users));
    newUsers.forEach((row, index) => {
      if (row.id === action.updatedUser.id) {
        newUsers[index] = { ...action.updatedUser };
      }
    });
    localStorage.setItem("users", JSON.stringify(newUsers));
    return { users: newUsers };
  }

  if (action.type === "DELETE_USER") {
    let newUsers = state.users.filter((user) => {
      return action.id !== user.id;
    });
    localStorage.setItem("users", JSON.stringify(newUsers));
    return { users: newUsers };
  }

  return state;
};

const store = createStore(userReducer);

export default store;
