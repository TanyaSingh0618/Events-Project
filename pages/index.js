import { getFeaturedEvents } from '@/helpers/api-util';
import EventList from '@/components/events/events-list'


function HomePage(props) {
  return (
    <div>
      <div>
        <EventList items={props.result} />
      </div>
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