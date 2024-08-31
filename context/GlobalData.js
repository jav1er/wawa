import { createContext } from "react"

export const GlobalData = createContext({
  numberPublications: null,
  setNumberPublications: () => null,

  userData: null,
  setUserData: () => null,

  posts: null,
  setPosts: () => null,

  formLoginData: null,
  setFormLoginData: () => null,

  formRegisterData: null,
  setFormRegisterData: () => null,

  formPostData: null,
  setformPostData: () => null,

  modalVisibility: null,
  setModalVisibility: () => null,

  reloadUser: null,
  setReloadUser: () => null,

  socket: null,
  setSocket: () => null,

  tanStackAdminTableState: null,
  setTanStackAdminTableState: () => null,

  tanStackAdminTableRowSelect: null,
  setTanStackAdminTableRowSelect: () => null,
})
