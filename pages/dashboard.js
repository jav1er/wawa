import React, { useState, useEffect, useRef, useCallback, memo } from "react"
import CustomModal from "../components/CustomModal/CustomModal"
import useData from "../hooks/useData"
import { useRouter } from "next/router"
import { useLocalStorage } from "../hooks/useLocalStorage"
function Dashboard() {

  const router = useRouter()
  const { objCollection: dataUserLoggedStorage } =
    useLocalStorage("user-logged")
  const { modalVisibility, setModalVisibility } = useData()

  useEffect(() => {
    if (!dataUserLoggedStorage) {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleModalVisibility = () => {
    setModalVisibility(x => !x)
  }
  return (
    
      <div className="dashboardPage">
        
        {modalVisibility && <CustomModal comp={"CreatePostForm"} />}
        {/* <SearchBar /> */}
        <div className="containerDash">
          <div className="containerDash-buttons">
            <button
              onClick={() => router.push("/admin_panel")}
              className="button"
            >
              
              Rutas
            </button>
            <button
              onClick={() => router.push("/")}
              className="button"
            >
              Salir
            </button>
          </div>

          <div
            onClick={handleModalVisibility}
            className="form-create-post"
          >
            Crear ruta
          </div>

          <div className="content-posts">
            <h2>Bienvenido</h2>
          </div>
        </div>
      </div>
    
  )
}

//export default Dashboard
export default memo(Dashboard)
