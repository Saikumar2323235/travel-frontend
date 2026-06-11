import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",

  initialState:  JSON.parse(
    localStorage.getItem(
      "favorites"
    )
  ) || []
,

  reducers: {

    addFavorite: (state, action) => {

      const exists = state.find(
        destination =>
          destination.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);
         localStorage.setItem(
    "favorites",
    JSON.stringify(state)
  );

      }

    },

    removeFavorite:(state,action)=>{

 const updated =
   state.filter(
     destination =>
     destination.id !==
     action.payload
   );

 localStorage.setItem(
   "favorites",
   JSON.stringify(updated)
 );

 return updated;
}


  }
});

export const {
  addFavorite,
  removeFavorite
} = favoriteSlice.actions;

export default favoriteSlice.reducer;