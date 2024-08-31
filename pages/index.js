/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { getDataUser } from "../hooks/useInformationClient";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Layout from "../layout/Layout";

import LoginForm from "../components/LoginForm/LoginForm";

export default function Home() {
  const localStorageKey = "user-location";
  const { objCollection: userLocation, setLocalStorage: setUserLocation } =
    useLocalStorage(localStorageKey);

  const unpack = async () => {
    try {
      const response = await fetch(`api/get_location/`);
      const result = await response.json();
      ////console.log(result);
      setUserLocation(result);
    } catch {
      setUserLocation({ region: "indefinido" });
    }
  };

  useEffect(() => {
    if (!userLocation?.length) {
      unpack();
    }
  }, []);
  return (
    <Layout className="home">
      <LoginForm />
    </Layout>
  );
}
