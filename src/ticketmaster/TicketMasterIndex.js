import TicketMasterEvent from "./TicketMasterEvent";

const TicketMasterIndex = (json) => {

    let data = {
        events: [],
        attractions: [],
        products: [],
        venues: []
    }

    let numEvents = Object.keys(json._embedded.events).length
    let numAttractions = Object.keys(json._embedded.attractions).length
    let numProducts = Object.keys(json._embedded.products).length
    let numVenues = Object.keys(json._embedded.venues).length

    for (let i = 0; i < numEvents; i++) {
        data.events.push(json._embedded.events[i].name)
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
    // console.log(data)
    

    return (
        <div>
            <h1>Events:</h1>
                
            <h1>Attractions:</h1>

            <h1>Products:</h1>

            <h1>Venues:</h1>
                
        </div>
    )

}

export default TicketMasterIndex;

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