// import React from 'react'
// import { useTable } from 'react-table'

// export default function Table({ columns, data }) {
//   if (!columns || !data) {
//     return <div>Error: columns or data is undefined!</div>;
//   }

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({ columns, data })

//   return (
//     <table {...getTableProps()} className="w-full divide-y divide-gray-200">
//       <thead className="bg-gray-50">
//         {headerGroups.map(headerGroup => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map(column => (
//               <th
//                 {...column.getHeaderProps()}
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 {column.render('Header')}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
//         {rows.map((row, i) => {
//           prepareRow(row)
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map(cell => {
//                 return (
//                   <td
//                     {...cell.getCellProps()}
//                     className="px-6 py-4 whitespace-nowrap"
//                   >
//                     {cell.render('Cell')}
//                   </td>
//                 )
//               })}
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//   )
// }
