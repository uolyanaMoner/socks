// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   searchResults: [],
// };

// export const getSearchResults = createAsyncThunk(
//   "/order/getSearchResults",
//   async (keyword) => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`
//     );

//     return response.data;
//   }
// );

// const searchSlice = createSlice({
//   name: "searchSlice",
//   initialState,
//   reducers: {
//     resetSearchResults: (state) => {
//       state.searchResults = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getSearchResults.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getSearchResults.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.searchResults = action.payload.data;
//       })
//       .addCase(getSearchResults.rejected, (state) => {
//         state.isLoading = false;
//         state.searchResults = [];
//       });
//   },
// });

// export const { resetSearchResults } = searchSlice.actions;

// export default searchSlice.reducer;



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],  // ✅ حفظ المنتجات هنا
  orders: [],    // ✅ حفظ الأوردرات هنا
};

export const getSearchResults = createAsyncThunk(
  "/order/getSearchResults",
  async (keyword) => {
    const response = await axios.get(
       `${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`
    );

    return response.data; // ✅ التأكد أن الاستجابة تحتوي على `products` و `orders`
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.products = [];
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        // ✅ التأكد من أن `products` و `orders` عبارة عن مصفوفات
        state.products = Array.isArray(action.payload.products) ? action.payload.products : [];
        state.orders = Array.isArray(action.payload.orders) ? action.payload.orders : [];
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
        state.orders = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
