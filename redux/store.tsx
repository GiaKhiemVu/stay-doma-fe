import { configureStore } from "@reduxjs/toolkit";
import themeReducer, { saveThemeToStorage } from "./slice/themeSlice";

export const store = configureStore({
    reducer: { theme: themeReducer },
    // If you use non-serializable things, adjust middleware here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persist on any change
if (typeof window !== "undefined") {
    store.subscribe(() => saveThemeToStorage(store.getState() as any));
}
