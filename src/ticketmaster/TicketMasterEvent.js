import React, { useState } from 'react';
import './TicketMasterEvent.css'

const url = 'https://app.ticketmaster.com/discovery/v2/'
const apiKey = 'ZMSE6L8MNnnIXp4sWzGu5LLTQ6leIhP9'

// let exampleLat = '39.9407869';
// let exampleLng = '-86.0946565';
// let position = exampleLat + "," + exampleLng;

function TicketMasterEvent(){

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);

    let data = {
        events: [],
        attractions: [],
        products: [],
        venues: []
    }

    let eventOne = []

    const getLocation = () => {
        if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
        } else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
            setStatus(null);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);

            // These are the lat and lng to be stored in variable. // Testing 
            // console.log(position.coords.latitude + "," + position.coords.longitude) // Testing
            let location = position.coords.latitude + "," + position.coords.longitude;
            reqData(location);
        }, () => {
            setStatus('Unable to retrieve your location');
        });
        }
    }

    // console.log(location) // Testing

    const reqData = (location) => {
        fetch(`${url}suggest?apikey=${apiKey}&latlong=${location}&radius=100`)
        .then(res => res.json())
        .then(json => {
            // console.log(json) // Testing
            getData(json);
        })
    }

    const getData = (json) => {

        let numEvents = Object.keys(json._embedded.events).length
        let numAttractions = Object.keys(json._embedded.attractions).length
        let numProducts = Object.keys(json._embedded.products).length
        let numVenues = Object.keys(json._embedded.venues).length

        for (let i = 0; i < numEvents; i++) {
            data.events.push(json._embedded.events[i].name)
            // console.log(data) // Testing
        }

        for (let i = 0; i < numAttractions; i++) {
            data.attractions.push(json._embedded.attractions[i].name)
        }

        for (let i = 0; i < numProducts; i++) {
            data.products.push(json._embedded.products[i].name)
        }

        for (let i = 0; i < numVenues; i++) {
            data.venues.push(json._embedded.venues[i].name)
        }
        console.log(data) // Testing to make sure data object gets filled properly
        // showEvents(data)
        showEvents()
    }

    const showEvents = () => {
        // console.log(data.events)
       return data.events?.map((event) => (

                <p>{event}</p>
            )
        )
        // data.events.map(event => (
            
        //         <p>{event}</p>
           
        // ))
    }

    // console.log('outside') // Testing
    // console.log(data); // Testing

    return (
        <div className='main'>
            <div className='mainDiv'>
                <h1>Find events, attractions, products, and venues near you!</h1>
                <button onClick={getLocation}>Find Stuff To Do!</button>
                {lat && <p>Latitude: {lat}</p>}
                {lng && <p>Longitude: {lng}</p>}
                <h4>Events:</h4>
                    
                    {showEvents()}
                    
                  
                <h4>Attractions:</h4>

                <h4>Products:</h4>

                <h4>Venues:</h4>
            </div>       
        </div>
    )
}

export default TicketMasterEvent;

/*
EVENT STRUCTURE:

_embedded
    events[int]
        name
        dates
            start
                localDate
                localTime
                timezone
        images
        info
        priceRanges
            type
            currency
            min
            max
*/