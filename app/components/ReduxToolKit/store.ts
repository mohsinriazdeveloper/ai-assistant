import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
// import stateReducer from "@/app/components/ReduxToolKit/stateSlice";
import authReducer from "@/app/components/ReduxToolKit/authSlice";
import { authApi } from "./aiAssistant";
import { userApi } from "./aiAssistantOtherApis";
import voiceResReducer from "./voiceResSlice";
import ChatSessionSlice from "./chatSessionSlice";
import ConnectCod from "./connectSlice";
import NewChat from "./forChatSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  voice: voiceResReducer,
  chatSession: ChatSessionSlice,
  connect: ConnectCod,
  forChat: NewChat,
  // state: stateReducer,
  // other reducers...
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    root: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, userApi.middleware),
});
export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
