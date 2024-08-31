import React from "react"
import useData from "../../hooks/useData"

export default function EditButton({ handlClickUpdate, row, table }) {
  const {
    setModalVisibility,
    setTanStackAdminTableRowSelect,
    setTanStackAdminTableState,
  } = useData()

  const handlClick = () => {
    table.setRowSelection(row)
    setTanStackAdminTableRowSelect(row)
    setModalVisibility(x=>!x)
  }
  return (
    <button onClick={handlClick}>
      <svg
        className="h-6 w-6 text-blue-600"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      </svg>
    </button>
  )
}
