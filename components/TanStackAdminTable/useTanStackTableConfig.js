/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import {
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table"
//import { fetchData } from "./md"
import { fetchDataReal } from "./getRealData"
import { deletePost } from "../../helpers/deletePost"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import DetailButton from "./DetailButton"
import { useRouter } from "next/router"
import useData from "../../hooks/useData"

export default function useTanStackTableConfig() {
  //console.log("cargo ")
  const {
    setTanStackAdminTableState,
  } = useData()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [rowSelection, setRowSelection] = useState(null)
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: () => "ID",
      },

      {
        accessorKey: "ruta",
        header: () => "Ruta",
      },

      {
        accessorKey: "pnt_origen",
        header: () => "Origen",
      },


      {
        accessorKey: "pnt_destino",
        header: () => "Destino",
      },

      {
        accessorKey: "precio",
        header: () => "Precio",
      },

      {
        accessorKey: "capacidad_autobus",
        header: () => "Capacidad autobus",
      },


      {
        accessorKey: "hora_salida",
        header: () => "Hora salida",
      },

      {
        accessorKey: "hora_llegada",
        header: () => "Hora llegada",
      },
      
      {
        header: "Acciones",
        cell: ({ row }) => {
          return (
            <div
              style={{ display: "flex", columnGap: "7px" }}
              className="Actions"
            >
              <DeleteButton
                deletePostByid={deletePostByid}
                id={row.original.id}
              />
              <EditButton
                router={router}
                id={row.original.id}
                table={table}
                row={row.original}
              />
              <DetailButton
                router={router}
                id={row.original.id}
                table={table}
                row={row.original}
              />

             
            </div>
          )
        },
      },
    ],
    [],
  )

  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 8,
  })

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }

  const dataQuery = useQuery(
    ["tableData", fetchDataOptions],
    () => fetchDataReal(fetchDataOptions),
    { keepPreviousData: true },
  )

  const defaultData = React.useMemo(() => [], [])

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  )


  const table = useReactTable({
    onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope

    data: dataQuery.data?.rows ?? defaultData,
    columns,
    pageCount: dataQuery.data?.pageCount ?? -1,
    state: {
      pagination,
      rowSelection,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
  })

  const deletePostByid = async id => {
    const requestResult = await deletePost(id)

    if (requestResult.statusText === 200) {
      const currentPageIndex = table.getState().pagination.pageIndex
      const currentPageSize = table.getState().pagination.pageSize
      const queryResult = queryClient.getQueryData({
        queryKey: [
          "tableData",
          { pageIndex: currentPageIndex, pageSize: currentPageSize },
        ],
      })

      const modifiedRows = queryResult.rows.filter(objPost => {
        if (objPost.id !== id) {
          return objPost
        }
      })

      queryClient.setQueryData(
        [
          "tableData",
          { pageIndex: currentPageIndex, pageSize: currentPageSize },
        ],
        data => ({
          ...data,
          rows: modifiedRows,
        }),
      )
    }
  }

  useEffect(() => {
    setTanStackAdminTableState(table.getState())
  }, [rowSelection])

  return {
    columns,
    pageIndex,
    pageSize,
    rowSelection,
    setPagination,
    dataQuery,
    defaultData,
    pagination,
    table,
  }
}
