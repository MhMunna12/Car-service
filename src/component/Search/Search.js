import React from 'react';
import Riders from '../../fakeData/carData.json';
import { useParams } from 'react-router';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
    const {riderName} = useParams();

    const rider = Riders.find(rider => rider.name === riderName);
    console.log(rider);
    const {name,price,seat,image} = rider;
    return (
        <div className="d-flex search">
            <img className="mr-2" style={{height:'30px'}} src={image} alt=""/>
            <p className="mr-2"> {name}</p>
            <p className="mr-5">  <FontAwesomeIcon icon={faUsers} />  {seat}</p>
            <p className="ml-3"> ${price}</p>
        </div>
    );
};

export default Search;