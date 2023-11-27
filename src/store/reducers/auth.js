// types
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { secret } from 'apis/auth';

// initial state
const initialState = {
  isLogin: false,
  user: null,
  loading: false
};

// ==============================|| SLICE - AUTH ||============================== //
export const getMe = createAsyncThunk('auth/getMe', async () => {
  return secret();
});

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin(state, action) {
      state.isLogin = action.payload.isLogin;
    },

    setUser(state, action) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
      state.loading = false;
    },
    setUserLoading(state, action) {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {
      state.loading = true;
      state.isLogin = false;
      state.user = null;
    }),
      builder.addCase(getMe.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLogin = !!payload && payload?.role === 1;
        state.loading = false;
      }),
      builder.addCase(getMe.rejected, (state) => {
        state.isLogin = false;
        state.user = null;
        state.loading = false;
      });
  }
});

export default auth.reducer;

export const { logout, setIsLogin, setUser, setUserLoading } = auth.actions;
