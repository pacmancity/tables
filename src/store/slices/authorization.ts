import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from "../api.ts";
import {TAuthorizationData} from "../../types/authorization.ts";

type TInitialState = {
  token: string;
  username: string | null;
  isAuthenticated: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: TInitialState = {
  token: '',
  username: '',
  isAuthenticated: false,
  error: null,
  status: 'idle',
};

export const authorize = createAsyncThunk<string, TAuthorizationData, { rejectValue: string }>(
  'post_authorize',
  async (authorizationData, {rejectWithValue}) => {
    try {
      const response = await api.post('/ru/data/v3/testmethods/docs/login', authorizationData)
      return response.data.data.token
    } catch {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

const authorization = createSlice({
  name: 'product_list',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<{ token: string, username: string | null }>) {
      const {token, username} = action.payload;
      state.token = token;
      state.username = username;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = '';
      state.username = '';
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
    },
    resetAuthorization(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorize.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(authorize.fulfilled, (state, action) => {
        const token = action.payload;
        const username = action.meta.arg.username;
        state.status = 'success';
        state.username = username;
        state.isAuthenticated = true;
        state.token = token;
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username);
      })
      .addCase(authorize.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      })
  },
});

export const {logout, setAuthenticated, resetAuthorization} = authorization.actions;
export default authorization.reducer;
