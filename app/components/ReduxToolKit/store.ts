import authReducer from "@/app/components/ReduxToolKit/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import AgentName from "./agentNameSlice";
import { authApi } from "./aiAssistant";
import { userApi } from "./aiAssistantOtherApis";
import ChatSessionSlice from "./chatSessionSlice";
import ConnectCod from "./connectSlice";
import CreateAgent from "./createAgentSlice";
import NewChat from "./forChatSlice";
import voiceResReducer from "./voiceResSlice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer,
  voice: voiceResReducer,
  chatSession: ChatSessionSlice,
  connect: ConnectCod,
  forChat: NewChat,
  createAgent: CreateAgent,
  agentName: AgentName,
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
