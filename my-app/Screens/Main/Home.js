import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../../router";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../../redux/auth/authOperations";

export const Home = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);

  const routing = useRoute(stateChange);
  return <NavigationContainer>{routing}</NavigationContainer>;
};
