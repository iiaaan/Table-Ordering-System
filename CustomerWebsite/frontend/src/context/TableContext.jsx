import React, { useEffect, useState } from "react";

export const TableContext = React.createContext()

const TableProvider = (props) => {
    const [tableId, setTableId] = useState("")
    const [resId, setRestaurantId] = useState("")

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search)
        setTableId(params.get("tableId") || "")
        setRestaurantId(params.get("restaurauntId") || "")
        console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
    },[])
    
    const TableValues = {
        tableId,
        resId
    }

    return (
        <TableContext.Provider value={TableValues}>
            {props.children}
        </TableContext.Provider>
    )
}

export default TableProvider