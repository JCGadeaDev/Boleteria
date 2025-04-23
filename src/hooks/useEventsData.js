
import { useState } from 'react';


//Hook para hacer una llamada al API y guardarlo en tu estado local. 
const useEventsData = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()

    const fetchEvents = async (params) => {
        try {
            const response = await fetch()
            const data = await response.json(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}${params?.length ? params : ""}`);

            setData(data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        }
    };
    return{
        events: data?._embedded?.events || [],
        page: data?.page || {},
        isLoading,
        error,
        fetchEvents
    }
};

export default useEventsData;