import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import './RiderDetails.css';
import Map from '../../images/Map.png'
import Riders from '../../fakeData/carData.json'
import Search from '../Search/Search';

const RiderDetails = () => {
    const [search, setSearch] = useState(false);
    const [destination, setDestination] = useState({
        from: '',
        to: ''
    })
    const handleBlur = (event) =>{
        const newDestination = {...destination};
        newDestination[event.target.name] = event.target.value;
        setDestination(newDestination);
    }
    return (
        
        <div className="row">
            
            <div className="col-md-4 mt-4 ">

                {
                    search ?
                    <div className="details ">
                    <div className="bg-primary search-destination">
                        <p>{destination.from}</p>
                        <p>{destination.to}</p>
                    </div>
                    {
                        Riders.map(rider => <Search />)
                    }
                </div>
                    :
                <div className="details ">
                    <p>pick from</p>
                    <input type="text" name="from" onBlur={handleBlur} className="form-control" placeholder="Form"/>
                    <p>pick to</p>
                    <input type="text" name="to" onBlur={handleBlur}  className="form-control mb-3" placeholder="To"/>
                    <p>Date</p>
                    <input type="date" name="" className="form-control mb-3"/>
                    <Button block onClick={()=> setSearch(true)}>Search</Button>
                </div>
                }

            </div>
            <div className="col-md-8 mt-4 map">
                <img src={Map} alt=""/>
            </div>
        </div>
    );
};

export default RiderDetails;