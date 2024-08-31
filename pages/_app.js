import "../styles/globals.scss"

import { useMemo, useState } from "react"
import { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import {
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { GlobalData } from "../context/GlobalData"
export default function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            // staleTime: 5 * 1000,
            // refetchOnWindowFocus: false,
            // refetchOnMount: false,
          },
        },
      }),
  )

  const persister = createSyncStoragePersister({
    ...(typeof window !== "undefined" && { storage: window?.localStorage }),
  })

  const [posts, setPosts] = useState([])
  const [formLoginData, setFormLoginData] = useState("")
  const [formRegisterData, setFormRegisterData] = useState("")
  const [formPostData, setformPostData] = useState("")
  const [modalVisibility, setModalVisibility] = useState(false)
  const [reloadUser, setReloadUser] = useState(false)
  const [socket, setSocket] = useState(null)
  const [userData, setUserData] = useState(null)
  const [numberPublications, setNumberPublications] = useState(null)
  const [tanStackAdminTableState, setTanStackAdminTableState] = useState(null)
  const [tanStackAdminTableRowSelect, setTanStackAdminTableRowSelect] =
    useState(null)

  const stateGlobal = useMemo(
    _ => ({
      numberPublications,
      setNumberPublications,

      userData,
      setUserData,

      posts,
      setPosts,

      formLoginData,
      setFormLoginData,

      formRegisterData,
      setFormRegisterData,

      formPostData,
      setformPostData,

      modalVisibility,
      setModalVisibility,

      reloadUser,
      setReloadUser,

      socket,
      setSocket,

      tanStackAdminTableRowSelect,
      setTanStackAdminTableRowSelect,

      tanStackAdminTableState,
      setTanStackAdminTableState,
    }),
    [
      numberPublications,
      userData,
      posts,
      formLoginData,
      formRegisterData,
      formPostData,
      modalVisibility,
      reloadUser,
      socket,
      tanStackAdminTableRowSelect,
      tanStackAdminTableState,
    ],
  )

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <GlobalData.Provider value={stateGlobal}>
        <Component {...pageProps} />
      </GlobalData.Provider>
      <ReactQueryDevtools initialIsOpen={true} />
    </PersistQueryClientProvider>
  )
}
