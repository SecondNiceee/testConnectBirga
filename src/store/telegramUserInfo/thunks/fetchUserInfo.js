import { createAsyncThunk } from "@reduxjs/toolkit";
import { findUserById } from "../../../functions/api/findUserById";
import { USERID } from "../../../constants/tgStatic.config";
export const fetchUserInfo = createAsyncThunk(
  "telegramUserInfo/fetchUserInfo",
  async function () {
    return await findUserById(USERID);
  }
);