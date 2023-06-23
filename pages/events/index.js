import { getAllEvents } from "@/dummy-data";
import EventList from '@/components/events/events-list';
import EventsSearch from "@/components/events/events-search";
import { Fragment } from "react";
import { useRouter } from "next/router";

function AllEvents() {
    const router = useRouter();
    const events = getAllEvents();
    function findEventHandler(year, month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath);
    }
    return (
        <Fragment>
            <EventsSearch onSearch={findEventHandler} />
            <EventList items={events} />
        </Fragment>
    )
}
export default AllEvents;