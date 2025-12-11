import { Stack } from "expo-router";
import "./global.css";
import {Provider} from 'react-redux';
import { store } from "../store/store";
import CartLoader from "@/components/CartLoader";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <CartLoader />
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  )
}
