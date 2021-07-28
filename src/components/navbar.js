import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './navbar.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Cookies from "universal-cookie";
import {useDispatch, useSelector} from "react-redux";
import {useHistory } from "react-router-dom";
import {Button, Form, ListGroup, Modal, Row} from "react-bootstrap";
import {getListings, getMessages, sendMessage} from "../utility/request";
import {AddNewListing} from "../screens/Home";


const MessageReply = (props) => {
    const { showReply, replyToParty, handleClose, replyToName} = props;
    const [message, setMessage] = useState('');

    const handleSave = () => {
        const messageData = {
            toPartyId: replyToParty,
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
            show={showReply}
            onHide={handleClose}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Reply to {replyToName}</Modal.Title>
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

const ShowMessages = (props) => {
    const {handleClose, showMessage, handleShowReply, setReplyToParty, setReplyToName} = props;
    const messages = useSelector(state => state.messageReducer.messages);

    let RenderedMessages = (<div/>);
    const handleReply = (toPartyId, fromName) => {
        setReplyToParty(toPartyId);
        setReplyToName(fromName);
        handleClose();
        handleShowReply();
    }
    if (messages && messages.length !== 0) {
        try {
            RenderedMessages = messages.map((message, index) => {
                return (
                    <ListGroup.Item key={index}>
                        <div>
                            <h2>Message from: {message.fromName}</h2>
                            <p>{message.message}</p>
                            <button
                                className="btn btn-outline-success my-2 my-sm-0"
                                onClick={() => handleReply(message.fromPartyId, message.fromName)}>Reply
                            </button>
                        </div>
                    </ListGroup.Item>
                );
            });
        } catch (e) {
            //ugh
        }
    }
    return (
        <Modal
            backdrop="static"
            keyboard={false}
            show={showMessage}
            onHide={handleClose}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Messages</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {RenderedMessages}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const Navbar = () => {
    const [category, setCategory] = useState('Toys');
    const [show, setShow] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [replyToParty, setReplyToParty] = useState('');
    const [replyToName, setReplyToName] = useState('');

    const handleShow = () => setShow(true);
    const handleShowMessage = () => setShowMessage(true);
    const handleShowReply = () => setShowReply(true);

    const handleClose = () => {
        setShow(false);
        setShowMessage(false);
        setShowReply(false);
    }
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);
    const messages = useSelector(state => state.messageReducer.messages);

    const handleLogout = () => {
        const cookies = new Cookies();

        dispatch({
            type: 'LOGOUT_USER',
        })
        dispatch({
            type: 'CLEAR_MESSAGES',
        })
        cookies.remove('session');
        setTimeout(() => {
            window.location.assign('/login')
        }, 400);
    }

    const handleSearch = () => {
        console.log('Handling search');
        getListings(category)
          .then((res) =>  {
              console.log(res);
              dispatch({
                type: 'SET_ENTRIES',
                entries: res.data,
              })
              history.push('/entries')

          });
    }

    const handleCart = () => {
        history.push('/cart');
    }

    React.useEffect(() => {
        getMessages()
        .then((res) => {
            console.log(res);
            if (messages.length !== res.data.length) {
                dispatch({
                    type: 'UPDATE_MESSAGES',
                    messages: res.data,
                });
            }
        })
    }, [messages]);

    return (
        <nav className="navbar w-100 navbar-expand-lg navbar-light bg-light">
            <AddNewListing show={show} handleClose={handleClose}/>
            <MessageReply showReply={showReply} handleClose={handleClose}
                          replyToParty={replyToParty} replyToName={replyToName}/>
            <ShowMessages handleClose={handleClose} showMessage={showMessage}
                          handleShowReply={handleShowReply} setReplyToParty={setReplyToParty}
                          setReplyToName={setReplyToName}/>
            <a className="navbar-brand" href="#">Marketplace 2.0</a>
            <button className="navbar-toggler" type="button"
                    data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="navbar-nav">
                <a className="nav-item nav-link active" href="/">Home <span
                    className="sr-only">(current)</span></a>
                {!(user.firstName && user.firstName !== '') && <a className="nav-item nav-link" href="/login">Login</a>}
            </div>
            <div className="search-container">
                <form className="search-category orm-inline my-2 my-lg-0 ">
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
                </form>
                <button className="search-button btn btn-outline-success my-2 my-sm-0" onClick={handleSearch}>Search</button>
            </div>
            {user.firstName && user.firstName !== '' &&
            <ul className="navbar-nav mr-auto account-menu-right">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#"
                       id="navbarDropdown" role="button" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        {user.firstName}
                    </a>
                    <div className="dropdown-menu"
                         aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" onClick={handleShow}>Create New Listing</a>
                        <a className="dropdown-item" onClick={handleLogout}>Log Out</a>
                        <a className="dropdown-item" onClick={handleCart}>Cart</a>
                    </div>
                </li>
            </ul>}

            {messages && messages.length > 0 &&
            <button className="message-button btn btn-outline-success my-2 my-sm-0"
                    onClick={handleShowMessage} >Message!</button>
            }
        </nav>
    );
};

export default Navbar;
