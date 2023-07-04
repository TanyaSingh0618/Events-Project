import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import { Fragment } from "react";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/error-alert/error-alert";

function EventDetailPage(props) {
    const event = props.getSelectedEvent;

    if (!event) {
        return <ErrorAlert>
            <p>Loading....</p>
        </ErrorAlert>
    }
    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent >
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}
export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    return {
        props: {
            getSelectedEvent: event
        },
        revalidate: 100
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({
        params: { eventId: event.id }
    }))
    return {
        paths: paths,
        fallback: 'blocking'
    }
}

export default EventDetailPage;