import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {
    Form,
    Col,
    Modal,
	Button,
	Card,
} from "react-bootstrap";
import {postListing, getListings} from "../utility/request";
import './home.css'

export const AddNewListing = (props) => {
    const { show, handleClose } = props;
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0.0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Toys');
    const history = useHistory();
    const handleSave = () => {
        postListing({
            title: title,
            price: price,
            description: description,
            category: category,
        }).then((res) => {
            if (res && res.data && res.data.id) {
                history.push(`/listing/${res.data.id}`)
                handleClose();
            }
        })
        console.log("woohoo");
    }
    return (
        <Modal
            backdrop="static"
            keyboard={false}
            show={show}
            onHide={handleClose}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Create a New Listing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder="Enter listing title"
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(event) => setPrice(parseFloat(event.target.value))}
                                placeholder="Enter price"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                onChange={(event) => setCategory(event.target.value)}
                                as="select"
                                placeholder="Enter product's category"
                            >
                                <option>Toys</option>
                                <option>Sports</option>
                                <option>Clothing</option>
                                <option>Electronics</option>
                                <option>Home</option>
                                <option>Garden</option>
                                <option>Office</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            onChange={(event) => setDescription(event.target.value)}
                            as="textarea"
                            rows={4}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>    )
}


const Home = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const user = useSelector(state => state.userReducer);

    return (
        <div>
			<h1 class="title">Welcome to Marketplace 2.0!</h1>
            <AddNewListing show={show} handleClose={handleClose}/>
            {user.firstName && user.firstName !== '' && <button class="button" onClick={handleShow}>Create New Listing</button>}
        </div>
    )
}

export default Home;
