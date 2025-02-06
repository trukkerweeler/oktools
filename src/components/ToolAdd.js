import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const ToolAdd = () => {
    const [description, setDescription] = useState('');
    const [mfr, setMfr] = useState('');
    const [model, setModel] = useState('');
    const [owner, setOwner] = useState('');
    const [sn, setSn] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getFirestore();
        await addDoc(collection(db, 'tools'), {
            description,
            mfr,
            model,
            owner,
            sn
        });
        console.log('Tool added successfully');
        window.location.href = '/tools';
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMfr">
                            <Form.Label>Manufacturer</Form.Label>
                            <Form.Control
                                type="text"
                                value={mfr}
                                onChange={(e) => setMfr(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formOwner">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control
                                type="text"
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSn">
                            <Form.Label>Serial Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={sn}
                                onChange={(e) => setSn(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Tool
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ToolAdd;