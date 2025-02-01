import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

const ToolContext = React.createContext();

export function useTool() {
    return useContext(ToolContext);
    }

export function ToolProvider({ children }) {
    const [tools, setTools] = useState([]);
    const toolsCollectionRef = collection(db, "tools");

    useEffect(() => {
        const fetchTools = async () => {
            const toolsSnapshot = await getDocs(toolsCollectionRef);
            const toolsList = toolsSnapshot.docs.map(doc => doc.data());
            setTools(toolsList);
        };
        fetchTools();
    }, [toolsCollectionRef]);

    const value = {
        tools
    }

    return <ToolContext.Provider value={value}>
        {children}
    </ToolContext.Provider>;
}

export default ToolContext;