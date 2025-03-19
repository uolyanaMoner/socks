import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  partitionList: [],
  error: null,
};

// ✅ جلب البرتيشنات من API
export const fetchPartitions = createAsyncThunk(
  "/partitions/fetchPartitions",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/partitions`
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "حدث خطأ أثناء جلب البيانات");
    }
  }
);

// ✅ إضافة برتيشن جديد
export const addPartition = createAsyncThunk(
  "/partitions/addPartition",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/partitions/add`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "فشل في إضافة البرتيشن");
    }
  }
);

// ✅ تعديل البرتيشن
export const editPartition = createAsyncThunk(
  "/partitions/editPartition",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/partitions/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "فشل في تعديل البرتيشن");
    }
  }
);

// ✅ حذف البرتيشن
export const deletePartition = createAsyncThunk(
  "/partitions/deletePartition",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/partitions/delete/${id}`
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "فشل في حذف البرتيشن");
    }
  }
);

// ✅ إنشاء الـ Slice
const partitionSlice = createSlice({
  name: "partitions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartitions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPartitions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.partitionList = action.payload.data;
      })
      .addCase(fetchPartitions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addPartition.fulfilled, (state, action) => {
        state.partitionList.push(action.payload.data);
      })
      .addCase(editPartition.fulfilled, (state, action) => {
        const index = state.partitionList.findIndex((p) => p.id === action.payload.data.id);
        if (index !== -1) {
          state.partitionList[index] = action.payload.data;
        }
      })
      .addCase(deletePartition.fulfilled, (state, action) => {
        state.partitionList = state.partitionList.filter((p) => p.id !== action.payload.id);
      });
  },
});

export default partitionSlice.reducer;
