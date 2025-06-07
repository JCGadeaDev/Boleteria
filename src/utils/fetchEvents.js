// utils/fetchEvents.js

import wrapPromise from "./wrapPromise";

const fetchEventDetail = async (eventId) => {
    const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`
    );
    if (!response.ok) throw new Error("Error fetching event data");
    return await response.json();
};

const fetchData = (eventId) => ({
    eventDetail: wrapPromise(fetchEventDetail(eventId))
});

export default fetchData;