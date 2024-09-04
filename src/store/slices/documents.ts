import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from "../api.ts";
import {RootState} from "../index.ts";
import {TDocument, TDocumentFormData} from "../../types/document.ts";

type TInitialState = {
  data: TDocument[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;

  createStatus: 'idle' | 'loading' | 'success' | 'error';
  createError: string | null;

  updateStatus: Record<string, 'loading' | 'success' | 'error'>;
  updateError: Record<string, string>;

  deleteStatus: Record<string, 'loading' | 'error'>;
  deleteError: Record<string, string>;
}

const initialState: TInitialState = {
  data: [],
  status: 'idle',
  error: null,

  createStatus: 'idle',
  createError: null,

  updateStatus: {},
  updateError: {},

  deleteStatus: {},
  deleteError: {}
};

export const getDocumentList = createAsyncThunk<TDocument[], undefined, { rejectValue: string, state: RootState }>(
  'get_document_list',
  async (_, {rejectWithValue, getState}) => {
    try {
      const token = getState().authorization.token;
      const response = await api.get('/ru/data/v3/testmethods/docs/userdocs/get', {
        headers: {'x-auth': token},
      });
      if (response.data.error_code !== 0) rejectWithValue(`Failed to fetch document, error code: ${response.data.error_code}`);
      return response.data.data;
    } catch {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

export const createDocument = createAsyncThunk<TDocument, TDocumentFormData, { rejectValue: string, state: RootState }>(
  'create_document',
  async (formData, {rejectWithValue, getState}) => {
    try {
      const token = getState().authorization.token;
      const response = await api.post(
        '/ru/data/v3/testmethods/docs/userdocs/create',
        formData,
        {headers: {'x-auth': token}}
      );
      if (response.data.error_code !== 0) rejectWithValue(`Failed to create document, error code: ${response.data.error_code}`);
      return response.data.data;
    } catch {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

export const updateDocument = createAsyncThunk<TDocument, TDocument, { rejectValue: string, state: RootState }>(
  'update_document',
  async (document, {rejectWithValue, getState}) => {
    try {
      const state = getState();
      const token = state.authorization.token;
      const response = await api.post(
        `/ru/data/v3/testmethods/docs/userdocs/set/${document.id}`,
        document,
        {headers: {'x-auth': token}}
      );
      if (response.data.error_code !== 0) {
        return rejectWithValue(`Failed to delete document, error code: ${response.data.error_code}`);
      }
      return response.data.data
    } catch {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

export const deleteDocument = createAsyncThunk<void, string, { rejectValue: string, state: RootState }>(
  'delete_document',
  async (id, {rejectWithValue, getState}) => {
    try {
      const token = getState().authorization.token;
      const response = await api.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {}, {
        headers: {'x-auth': token},
      });
      if (response.data.error_code !== 0) rejectWithValue(`Failed to delete document, error code: ${response.data.error_code}`);
    } catch {
      return rejectWithValue('Failed to delete document');
    }
  }
);

const documents = createSlice({
  name: 'document_list',
  initialState,
  reducers: {
    resetDocumentCreation(state) {
      state.createStatus = 'idle';
    },
    resetDocumentUpdateStatus(state, action: PayloadAction<string>) {
      delete state.updateStatus[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDocumentList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getDocumentList.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(getDocumentList.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      })

      .addCase(createDocument.pending, (state) => {
        state.createStatus = 'loading';
        state.createError = null;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.createStatus = 'success';
        state.data.push(action.payload);
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.createStatus = 'error';
        state.createError = action.payload as string;
      })

      .addCase(updateDocument.pending, (state, action) => {
        const id = action.meta.arg.id;
        state.updateStatus[id] = 'loading';
        delete state.updateError[id];
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        const id = action.payload.id
        state.updateStatus[id] = 'success';
        const index = state.data.findIndex(document => document.id === id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateDocument.rejected, (state, action) => {
        const id = action.meta.arg.id;
        state.updateStatus[id] = 'error';
        state.updateError[id] = action.payload as string;
      })

      .addCase(deleteDocument.pending, (state, action) => {
        const id = action.meta.arg;
        state.deleteStatus[id] = 'loading';
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        const id = action.meta.arg;
        delete state.deleteStatus[id];
        state.data = state.data.filter(document => document.id !== id);
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        const id = action.meta.arg;
        state.deleteStatus[id] = 'error';
        state.deleteError[id] = action.payload as string;
      })
  },
});

export const {resetDocumentCreation, resetDocumentUpdateStatus} = documents.actions;
export default documents.reducer;
