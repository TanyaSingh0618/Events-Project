import Head from 'next/head';
import { getFeaturedEvents } from '@/helpers/api-util';
import EventList from '@/components/events/events-list'


function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events....' />
      </Head>
      <EventList items={props.result} />

    </div>
  )
}
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      result: featuredEvents
    },
    revalidate: 1000
  }
}
export default HomePage;