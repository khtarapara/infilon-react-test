import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersData } from "../../servics/api.services";

import Editabletable from "./EditableTable";

const Userstable = () => {
  const usersData = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("users"));
    console.log(localUsers);
    if (localUsers) {
      dispatch({
        type: "REPLACE_USERS",
        users: [...localUsers],
      });
    } else {
      fetchUsersData().then((res) => {
        dispatch({
          type: "REPLACE_USERS",
          users: [...res.data.data],
        });
      });
    }
  }, []);

  const saveHandeler = (updatedUser) => {
    dispatch({ type: "EDIT_USER", updatedUser });
  };

  const deleteHandeler = (userId) => {
    dispatch({ type: "DELETE_USER", id: userId });
  };

  return (
    <Editabletable
      data={usersData}
      onSave={saveHandeler}
      onDelete={deleteHandeler}
    />
  );
};

export default Userstable;
