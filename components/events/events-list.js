import EventItem from "@/components/events/event-item";
import classes from './event-list.module.css';
function EventList(props) {
    const { items } = props;

    return (
        <ul className={classes.list}>
            {items.map((event) => {
                return <EventItem
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    location={event.location}
                    image={event.image}
                    date={event.date}
                />
            })}
        </ul>
    )
}
export default EventList;