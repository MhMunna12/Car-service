import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './Rider.css';
import { Link } from "react-router-dom";
const Rider = (props) => {
    const {name,image} = props.car;
    return (
        <div className="col-sm-12 col-md-6 col-lg-3   text-center car">
            <div className="d-flex justify-content-center container">
                <Card style={{ width: "18rem", height: "300px"}}>
                    <Card.Body>
                    <Card.Text>
                    <img src={image} alt=""/>
                       <h3>{name}</h3>
                    </Card.Text>
                    <Button as={Link} to={`/rider/${name}`}>Book</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Rider;