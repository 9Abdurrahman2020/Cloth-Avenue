import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { InitialState, IProduct } from '../Types';


const initialState: InitialState = {
  products: [],
  status: 'idle',
  womenSelectedCategory: "tanks",
  women: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const data: IProduct[] = await fetch('./data/product.json')
    .then(res=>res.json())
    return data;
  }
);

export const storeSlice = createSlice({
  name: 'myStore',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setWomenSelectedCategory: (state, action) =>{
      state.womenSelectedCategory = action.payload;
      setWomenProduct()
    },
    setWomenProduct: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if(state.products.length>0){
        state.women = state.products.filter( pd=> pd.for === "female" && pd.category === state.womenSelectedCategory)
      }
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'successful';
        state.products = action.payload
      });
  },
});

export const { setWomenProduct, setWomenSelectedCategory } = storeSlice.actions;

export default storeSlice.reducer;
