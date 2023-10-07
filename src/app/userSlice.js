// Bình thường sẽ khai báo tại features -> folder của từng features cụ thể nhưng phần này xử dụng ở nhiều nơi nên đặt vào file app -> chứa store tổng

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    loading: false,
    error: '',
  },

  reducers: {},
  extraReducers: {},
});

const { reducer, actions } = userSlice;
export const { addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;
