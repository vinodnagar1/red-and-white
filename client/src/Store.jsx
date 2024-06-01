import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./Reducer.js";

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    userreducer: userreducer,
  },
});

export default store;
