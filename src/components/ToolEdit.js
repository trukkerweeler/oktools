import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Form, Button, Container } from 'react-bootstrap';


const ToolEdit = () => {
    const { id } = useParams();

    const [tool, setTool] = useState({
        model: '',
        description: '',
        serial: '',
        owner: '',
        id: id || ''
    });

    useEffect(() => {
        // Fetch the tool data from Firestore using getDoc
        const fetchTool = async () => {
            try {
            const db = getFirestore();
            const toolDoc = doc(db, 'tools', id);
            const toolSnapshot = await getDoc(toolDoc);
            console.log(toolSnapshot.data());
            const toolData = toolSnapshot.data() || {};
            setTool({ ...toolData, id });
            } catch (error) {
                console.error('Error fetching tool data:', error);
            }
        };

        fetchTool();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTool({
            ...tool,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the updated tool data to Firestore
        const updateTool = async () => {
            try {
            const db = getFirestore();
            const toolDoc = doc(db, 'tools', id);
            await setDoc(toolDoc, tool);
            console.log('Tool updated successfully');
            } catch (error) {
            console.error('Error updating tool:', error);
            }
        };

        updateTool();
    };

    const handleDelete = async () => {
        // Delete the tool from Firestore
        const deleteTool = async () => {
            try {
                const db = getFirestore();
                const toolDoc = doc(db, 'tools', id);
                await deleteDoc(toolDoc);
                console.log('Tool deleted successfully');
            } catch (error) {
                console.error('Error deleting tool:', error);
            }
        };

        deleteTool();
    };


    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Model:</Form.Label>
                    <Form.Control
                        type="text"
                        name="model"
                        value={tool.model}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={tool.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Serial:</Form.Label>
                    <Form.Control
                        type="text"
                        name="serial"
                        value={tool.serial}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Owner:</Form.Label>
                    <Form.Control
                        type="text"
                        name="owner"
                        value={tool.owner}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>ID:</Form.Label>
                    <Form.Control
                        type="text"
                        name="id"
                        value={tool.id}
                        readOnly
                        className="bg-light"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
                <Button variant="danger" onClick={handleDelete} className="ms-2">
                    Delete
                </Button>
            </Form>
        </Container>
    );
};

export default ToolEdit;