import React, {useState,useEffect} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import carData from '../../fakeData/carData.json' 
import Rider from '../Rider/Rider';
import './Home.css';
const Home = () => {
    const [cars, setCar] = useState([]);
    useEffect(() => {
        setCar(carData);
    })
    return (
        <div>
            <div className="row">
            {
                cars.map(car => <Rider car={car} ></Rider>)
            }
            </div>
        </div>
    );
};

export default Home;