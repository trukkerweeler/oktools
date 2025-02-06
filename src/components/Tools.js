import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocsFromServer } from 'firebase/firestore';
import { Table } from 'react-bootstrap';
import { useTool } from '../contexts/ToolContext';

const ToolsTable = () => {
    const [tools, setTools] = useState([]);

    useEffect(() => {
        const fetchTools = async () => {
            const db = getFirestore();
            const toolsCollection = collection(db, 'tools');
            const toolsSnapshot = await getDocsFromServer(toolsCollection);
            console.log(toolsSnapshot.docs.map(doc => doc.data()));
            const toolsList = toolsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTools(toolsList);
        };

        fetchTools();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between">
                <h1>Tools</h1>
                <a href="/ToolAdd">Add Tool</a>
            </div>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Model</th>
                        <th>Description</th>
                        <th>Serial No</th>
                        <th>Owner</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tools.map(tool => (
                        <tr key={tool.id}>
                            <td>{tool.id}</td>
                            <td>{tool.model}</td>
                            <td>{tool.description}</td>
                            <td>{tool.sn}</td>
                            <td>{tool.owner}</td>
                            <td>                                
                            <a href={`/ToolEdit/${tool.id}?model=${tool.model}&description=${tool.description}&sn=${tool.sn}&serial=${tool.serial}&owner=${tool.owner}`}>Edit</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ToolsTable;
