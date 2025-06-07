//import { useParams } from "react-router-dom";
//import { useState } from "react";
import {format} from "date-fns"
import { es } from "date-fns/locale";

//import useEventsResults from "../../state/events-result";
import eventFetcher from "../../utils/fetchEvents"
import styles from './Detail.module.css';

const pathname = window.location.pathname;
const resource = eventFetcher(pathname.substring(8, pathname.length));

const Detail = () => {
  //const {data} = useEventsResults();
  //const { eventId } = useParams();
  //const [eventData, setEventData] = useState({});
  const eventData = resource.eventDetail.read();

 
  return (
    <div className={styles.container}>
        <div className={styles.mainInfoContainer}>
            <img src={eventData.images?.[0].url} className={styles.eventImage} alt={eventData.name} />
            <h4 className={styles.eventName}>{eventData.name}</h4>
            <p className={styles.eventInfo}>{eventData.info}</p>
            {eventData.dates?.start.dateTime ? <p className={styles.dateParagrahp}>{format(new Date(eventData.dates?.start.dateTime), "d LLLL yyyy H:mm", {locale:es})}hrs</p> : null}    
        </div>
        <div className={styles.seatInfoContainer}>
            <h6 className={styles.seatMapTitle}>Event Map</h6>
            <img src={eventData.seatmap?.staticUrl} alt="Seatmap Event" />
            <p className={styles.pleaseNoteLegend}>{eventData.pleaseNote}</p>
            <p className={styles.priceRangeLegend}>Price Ranges {eventData.PriceRanges?.[0].min}-{eventData.PriceRanges?.[0].max} {eventData.PriceRanges?.[0].currency}</p>
            <p className={styles.ticketLimitLegend}>{eventData.ticketLimit?.info}</p>
        </div>
        <a href={eventData.url} target="_blank" rel="noopener noreferrer">
         Go get your tickets
        </a>
    </div>
  )
};

export default Detail;
