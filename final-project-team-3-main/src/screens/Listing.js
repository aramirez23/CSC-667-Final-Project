import React, { useState } from "react";
import {useParams} from "react-router-dom";
import {getListing, postToCart, sendMessage} from "../utility/request";
import {AddNewListing} from "./Home";
import './listing.css'
import {Button, Form, Modal} from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { setCart } from '../redux/actions/cartActions';

const MessageSeller = (props) => {
    const { show, handleClose, posterLast, posterFirst, partyId } = props;
    const [message, setMessage] = useState('');

    const handleSave = () => {
        const messageData = {
            toPartyId: partyId,
            message: message,
        };
        sendMessage(messageData).then(r => {
            console.log(r.data)
            handleClose();
        });
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
                <Modal.Title>Message the Seller: {posterFirst} {posterLast}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            onChange={(event) => setMessage(event.target.value)}
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
        </Modal>
    );
}

const Listing = () => {
    const id = useParams().listingId;
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0.0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [posterFirst, setPosterFirst] = useState('');
    const [posterLast, setPosterLast] = useState('');
    const [partyId, setPartyId] = useState('');
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const dispatch = useDispatch();

    const addToCart = () => {
        const cartItemData = {
            listingId: id,
            title: title,
            price: price,
        };
        postToCart(cartItemData).then(r => {
            console.log(r.data);
        });
    }

    React.useEffect(() => {
        getListing(id).then((res) => {
            if (res && res.data && res.data.listingModel._id) {
                setTitle(res.data.listingModel.title);
                setPrice(res.data.listingModel.price);
                setDescription(res.data.listingModel.description);
                setCategory(res.data.listingModel.category);
                setPartyId(res.data.listingModel.partyId);
                setPosterFirst(res.data.user.firstName);
                setPosterLast(res.data.user.lastName);
            }
        })
    }, [id])
    return (
        <div>
            <MessageSeller show={show} handleClose={handleClose} posterFirst={posterFirst} posterLast={posterLast} partyId={partyId}/>
            <div>
                <h3 className="title-text">{title}</h3>
                <h4>Price: {price}</h4>
                <h5>Category: {category}</h5>
                <p>Description: {description}</p>
                <p>Poster: {posterFirst}</p>
            </div>
            <button className="button" onClick={handleShow}>Message Seller</button>
            <button className="button" onClick={addToCart}>Add To Cart</button>
        </div>
    )
}

export default Listing;
