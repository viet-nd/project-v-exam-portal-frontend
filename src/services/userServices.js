import axios from "axios";

const updateUser = async (userId, user, token) => {
  try {
    // const formData = new FormData();
    // formData.append('file', file);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.put(`/api/user/${userId}`, user, config);

    console.log("userService:updateUser() Success: ", data);
    return { data: data };
  } catch (error) {
    console.error(
      "userService:updateUser() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const changePassword = async (userId, oldPassword, newPassword, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.put(
      `/api/user/${userId}?oldPassword=${oldPassword}&newPassword=${newPassword}`,
      null,
      config
    );

    console.log("userService:changePassword() Success: ", data);
    return { data: data };
  } catch (error) {
    console.error(
      "userService:changePassword() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const fetchAllUser = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(`/api/user/`, config);

    console.log("userService:fetchAllUser() Success: ", data);
    return { data: data, error: null };
  } catch (error) {
    console.error(
      "userService:fetchAllUser() Error: ",
      error.response.statusText
    );
    return { data: null, error: error.response.statusText };
  }
};

const addAccount = async (user, role, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.post(
      `/api/user/register?role=${role}`,
      user,
      config
    );

    console.log("userService:addAccount() Success: ", data);
    return { data: data, error: null };
  } catch (error) {
    console.error(
      "userService:addAccount() Error: ",
      error.response.statusText
    );
    return { data: null, error: error.response.statusText };
  }
};

const searchByKeyword = async (keyword, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(`/api/user?keyword=${keyword}`, config);

    console.log("userService:searchByKeyword() Success: ", data);
    return { data: data, error: null };
  } catch (error) {
    console.error(
      "userService:searchByKeyword() Error: ",
      error.response.statusText
    );
    return { data: null, error: error.response.statusText };
  }
};

const fetchUserByUserId = async (userId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(`/api/user/${userId}`, config);

    console.log("userService:fetchUserByUserId() Success: ", data);
    return { data: data, error: null };
  } catch (error) {
    console.error(
      "userService:fetchUserByUserId() Error: ",
      error.response.statusText
    );
    return { data: null, error: error.response.statusText };
  }
};

const deleteAccount = async (userId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.delete(`/api/user/${userId}`, config);

    console.log("userService:deleteAccount() Success: ", data);
    return { data: data, error: null };
  } catch (error) {
    console.error(
      "userService:deleteAccount() Error: ",
      error.response.statusText
    );
    return { data: null, error: error.response.statusText };
  }
};

const userServices = {
  updateUser,
  changePassword,
  fetchAllUser,
  addAccount,
  searchByKeyword,
  fetchUserByUserId,
  deleteAccount,
};
export default userServices;
