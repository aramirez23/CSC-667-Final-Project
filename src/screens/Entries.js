import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './entries.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useSelector} from "react-redux";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Entries = () => {
    const history = useHistory();
    const entries = useSelector(state => state.entryReducer.entries);

    const RenderedEntries = entries.map((entry, index) => {
        return (
          <ListGroup.Item key={index}>
            <div>
                <h3>{entry.title}</h3>
                <h4>Price: {entry.price}</h4>
                <p>Description: {entry.description}</p>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => handleListing(entry._id)}>View Page</button>
            </div>
          </ListGroup.Item>
        );
    });

    const handleListing = (id) => {
        history.push(`/listing/${id}`);
    };

    return (
        <div className="individual-entry">
            <ListGroup>
                {RenderedEntries}
            </ListGroup>
        </div>
    );
};

export default Entries;
