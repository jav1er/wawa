import React from "react"

export default function DetailButton({ router, id, table, row }) {
  return (
    <button
      onClick={() => {
        //console.log('ejecuentando click');
        //console.log(table);
        
        table.setRowSelection(row.original)
        router.push(`/property/?id=${id}`)
      }}
    >
      <svg
        className="h-6 w-6 text-green-600"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          stroke="none"
          d="M0 0h24v24H0z"
        />
        <circle
          cx="10"
          cy="10"
          r="7"
        />
        <line
          x1="21"
          y1="21"
          x2="15"
          y2="15"
        />
      </svg>
    </button>
  )
}
