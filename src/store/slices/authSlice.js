import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// Slice initial state
const initialState = {
  loading: false,
  newUserData: [],
  authData: [],
};

export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.post(
      'http://localhost:8000/api/auth/login',
      userData,
    );
    if (response.status === 200) {
      dispatch(loginUsersData(response.data));
      toast.success('User Login SuccessFully!');
      navigate('/users');
    }
  } catch (err) {
    console.log(err, 'err');

    toast.error(err.response.data.error);
    dispatch(loadingflag(false));
  } finally {
    dispatch(loadingflag(false));
  }
};

export const createUserAccount = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.post(
      'http://localhost:8000/api/users',
      userData,
    );
    if (response.status === 201) {
      dispatch(createUsersData(response.data));
      toast.success('User Create SuccessFully!');
      navigate('/auth/signin');
    }
  } catch (err) {
    console.log(err, 'err');
    toast.error(err.response.data.message);
  } finally {
    dispatch(loadingflag(false));
  }
};

export const forgotPassword = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.post(
      'http://localhost:8000/api/auth/forgotPassword',
      userData,
    );
    if (response.status === 200) {
      toast.success(response.data.message);
      navigate('/auth/signin');
    }
  } catch (err) {
    console.log(err, 'err');
    toast.error(err.response.data.error);
  } finally {
    dispatch(loadingflag(false));
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadingflag: (state, action) => {
      state.loading = action.payload;
    },
    loginUsersData: (state, action) => {
      state.authData = action.payload;
    },
    createUsersData: (state, action) => {
      state.newUserData = action.payload;
    },
    resetLoginData: (state, action) => {
      state.loading = false;
      state.authData = [];
      state.newUserData = [];
    },
  },
});

export const { loadingflag, loginUsersData, resetLoginData, createUsersData } =
  authSlice.actions;

export default authSlice.reducer;
