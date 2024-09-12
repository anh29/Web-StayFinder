import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestState {
  firstPage?: boolean;
  loading?: boolean;
  error?: string | null;
  errCode?: string | number | undefined;
  contexts?:
    | {
        [key: string]: any;
      }
    | undefined;
}

interface InitialState {
  messages: {
    error?: string | string[];
    success?: string;
  };
  menu: {
    height: number;
    isShowDrawer?: boolean;
  };
  isShowLoadingScreen: boolean;
  [actionTypePrefix: string]: RequestState | any;
}

const initialState: InitialState = {
  messages: {
    error: undefined,
    success: undefined,
  },
  menu: {
    height: 0,
    isShowDrawer: false,
  },
  isShowLoadingScreen: false,
};

// Slice
const ui = createSlice({
  name: "uis",
  initialState,
  reducers: {
    notify(
      state,
      {
        payload,
      }: PayloadAction<{ type?: "error" | "success"; message: string }>
    ) {
      const { type = "success", message } = payload;
      state.messages[type] = message;
    },
    setMenuHeight(state, { payload }: PayloadAction<{ height: number }>) {
      const { height } = payload;
      state.menu.height = height;
    },
    showDrawer(state, { payload }: PayloadAction<boolean>) {
      state.menu.isShowDrawer = payload;
    },
    setShowLoadingScreen(state, { payload }: PayloadAction<boolean>) {
      state.isShowLoadingScreen = payload;
    },
  },
});

export const { notify, setMenuHeight, showDrawer, setShowLoadingScreen } =
  ui.actions;

export default ui.reducer;
