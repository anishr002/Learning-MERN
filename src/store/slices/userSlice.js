import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Slice initial state
const initialState = {
  loading: false,
  getUsers: [],
  getsingleUsers : [],
  createUserSuccess: false,
  createUserError: null,
};

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.get('http://localhost:8000/api/users');
    dispatch(getUsersData(response.data));
  } catch (err) {
    dispatch(loadingflag(false));
  } finally {
    dispatch(loadingflag(false));
  }
};

export const createUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.post('http://localhost:8000/api/users', userData);
    if (response.status === 201) {
      dispatch(createUserSuccess(true));
      toast.success('User Added SuccessFully!')
      navigate("/users")
      // Optionally, you can fetch the users again to include the new user in the list
      dispatch(fetchUsers());
    }
  } catch (err) {
    toast.error(err.response.data.error);

    if (err?.response?.status === 400 || err?.response?.status === 500) {
      dispatch(createUserError(err.message));
    }
  } finally {
    dispatch(loadingflag(false));
  }
};

export const updateUser = (id, userData, navigate) => async (dispatch) => {
    try {
      dispatch(loadingflag(true));
       await axios.put(`http://localhost:8000/api/users/${id}`, userData);
        toast.success('User Updated SuccessFully!')
        navigate("/users")
        dispatch(fetchUsers());

    } catch (err) {
    toast.error(err.response.data.error);

      if (err?.response?.status === 400 || err?.response?.status === 500) {
        dispatch(createUserError(err.message));
      }
    } finally {
      dispatch(loadingflag(false));
    }
  };


export const getSingleUser = (id) => async (dispatch) => {
    try {
      dispatch(loadingflag(true));
      const response = await axios.get(`http://localhost:8000/api/users/${id}`);
      dispatch(getSingleUsersData(response.data));
      dispatch(loadingflag(false));
    } catch (err) {
      dispatch(loadingflag(false));
    }
  };

export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch(loadingflag(true));
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      dispatch(fetchUsers());
    //   dispatch(removeUser(id));
      dispatch(loadingflag(false));
    } catch (err) {
      dispatch(loadingflag(false));
    }
  };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadingflag: (state, action) => {
      state.loading = action.payload;
    },
    getUsersData: (state, action) => {
      state.getUsers = action.payload;
    },
    getSingleUsersData: (state, action) => {
        state.getsingleUsers = action.payload;
      },
    createUserSuccess: (state, action) => {
      state.createUserSuccess = action.payload;
      state.createUserError = null; // Clear any previous errors
    },
    createUserError: (state, action) => {
      state.createUserError = action.payload;
      state.createUserSuccess = false; // Clear any previous success state
    },
    ResetData : (state) => {
      state.loading = false;
      state.getUsers = [] ;
      state.getsingleUsers =  [];
      state.createUserSuccess = false;
      state.createUserError = null;
    }
  },
});

export const {
  loadingflag,
  getUsersData,
  getSingleUsersData,
  createUserSuccess,
  createUserError,
  ResetData
} = userSlice.actions;

export default userSlice.reducer;
