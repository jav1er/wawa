import { useEffect, useState } from "react";
import useData from "./useData";

const PROJECT_NAME = "wawa";

function today() {
  return new Date().toJSON().slice(0, 10);
}

function currentKey(key) {
  return `${PROJECT_NAME}:${today()}:${key}`;
}

function getStorageValue(key) {
  if (typeof window !== "undefined") {
    const savedCollection = localStorage.getItem(currentKey(key))
      ? JSON.parse(localStorage.getItem(currentKey(key)))
      : null;
    return savedCollection;
  }
}

export const useLocalStorage = (key) => {
  const [objCollection, setValue] = useState(() => {
    return getStorageValue(key);
  });

  const updateLocalStorage = (obj) => {
    setValue((v) => {
      v = [...v, obj];
      return localStorage.setItem(currentKey(key), JSON.stringify(v));
    });
  };

  const removeLocalStorage = (key) => {
    return localStorage.removeItem(currentKey(key));
  };
  const setLocalStorage = (obj) => {
    setValue((v) => {
      v = obj;
      return localStorage.setItem(currentKey(key), JSON.stringify(v));
    });
  };

  return {
    objCollection,
    setLocalStorage,
    removeLocalStorage,
    updateLocalStorage,
  };
};

// import { useState } from "react"

// const useLocalStorage = (key, initialValue) => {
//   const [state, setState] = useState(() => {
//     // Initialize the state
//     try {
//       const value = window.localStorage.getItem(key)
//       // Check if the local storage already has any values,
//       // otherwise initialize it with the passed initialValue
//       return value ? JSON.parse(value) : initialValue
//     } catch (error) {
//       ////console.log(error)
//     }
//   })

//   const setValue = value => {
//     try {
//       // If the passed value is a callback function,
//       //  then call it with the existing state.
//       const valueToStore = value instanceof Function ? value(state) : value
//       window.localStorage.setItem(key, JSON.stringify(valueToStore))
//       setState(value)
//     } catch (error) {
//       ////console.log(error)
//     }
//   }

//   return [state, setValue]
// }

// export default useLocalStorage

/**
 * https://www.codingdeft.com/posts/nextjs-local-storage/
 *
 *
 */
