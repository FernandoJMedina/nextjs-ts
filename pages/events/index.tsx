import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import { EventList } from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";
import { Event } from "../../types";

interface AllEvents {
	events: Event[];
}

export default function AllEventsPage({ events }: AllEvents) {
	const router = useRouter();

	function findEventsHandler(year: string, month: string) {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}

	return (
		<>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const events = await getAllEvents();
	return {
		props: {
			events: events,
		},
		revalidate: 90,
	};
};
