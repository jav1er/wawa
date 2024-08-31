import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useData from "../hooks/useData";
import { useQueryClient } from "@tanstack/react-query";

export default function useClearData() {
  const queryClient = useQueryClient();
  const { removeLocalStorage: removeUserLoggedStorage } =
    useLocalStorage("user-logged");

  const { removeLocalStorage: removeNumberPublicationsStorage } =
    useLocalStorage("number-publications");

  const { socket, setNumberPublications: setNumberPublicationsContext } =
    useData();

  useEffect(() => {
    removeUserLoggedStorage("user-logged");
    removeNumberPublicationsStorage("number-publications");

    setNumberPublicationsContext(0);
    socket?.disconnect();
    localStorage.clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  queryClient.clear();
}
