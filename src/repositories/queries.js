function addRowLockOnFlights(flightId) {
    return `SELECT * from Flights WHERE Flights.id = ${flightId} FOR UPDATE;`   // to do locking
}

module.exports = {
    addRowLockOnFlights
}