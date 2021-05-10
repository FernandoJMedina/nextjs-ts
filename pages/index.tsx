import { EventList } from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import { Event } from "../types";

interface HomeProps {
	events: Event[];
}

export default function HomePage(props: HomeProps) {
	return (
		<div>
			<EventList items={props.events} />
		</div>
	);
}

export async function getStaticProps() {
	//ssg
	const featuredEvents = await getFeaturedEvents();
	return {
		props: {
			events: featuredEvents,
		},
		revalidate: 1800,
	};
}
