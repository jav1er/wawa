/* eslint-disable import/no-anonymous-default-export */
import { useContext } from "react"
import { GlobalData } from "../context/GlobalData"

export default () => useContext(GlobalData)
