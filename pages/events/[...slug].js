import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from 'swr';
import Head from 'next/head';
import EventList from "@/components/events/events-list";
import ResultTitle from '@/components/events/results-title';
import ErrorAlert from "@/components/error-alert/error-alert";
import Button from '@/components/Ui/button'

function FilteredEventsPage(props) {
    const [LoadedEvents, setLoadedEvents] = useState();
    const router = useRouter();
    const filterData = router.query.slug;
    const { data, error } = useSWR('https://nextevents-8ef07-default-rtdb.asia-southeast1.firebasedatabase.app/events.json', (url) => fetch(url).then(res => res.json()))
    useEffect(() => {
        if (data) {

            const events = [];

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key],
                });
            }

            setLoadedEvents(events);
        }
    }, [data])
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    const PageHead = (
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content={`All Events ${numMonth}/${numYear}`} />
        </Head>
    )
    if (!LoadedEvents) {
        return <Fragment>
            {PageHead}
            <p className='center'>Loading...</p>
        </Fragment>

    }



    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2040 || numYear < 2020 || numMonth < 1 ||
        numMonth > 12 || error) {
        return (
            <Fragment>
                {PageHead}
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = LoadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === numYear &&
            eventDate.getMonth() === numMonth - 1
        );
    });


    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {PageHead}
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            {PageHead}
            <ResultTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}

// export async function getServerSideProps(context) {
//     const { params } = context;

//     const filterData = params.slug;
//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];
//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;
//     if (isNaN(numYear) || isNaN(numMonth) || numYear > 2040 || numYear < 2020 || numMonth < 1 ||
//         numMonth > 12) {
//         return {
//             props: { hasError: true }
//             // notFound: true,
//             // redirect: {
//             //     destination: '/error'
//             // }
//         }

//     }

//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth,
//     });
//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }
// }
export default FilteredEventsPage;