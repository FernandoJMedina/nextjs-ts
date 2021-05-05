import { GetStaticPaths, GetStaticProps } from "next";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import {
	getAllEvents,
	getEventById,
	getFeaturedEvents,
} from "../../helpers/api-util";
import { Event } from "../../types";

interface EventDetail {
	event: Event;
}

export default function EventDetailPage({ event }: EventDetail) {
	if (!event) {
		return (
			<ErrorAlert>
				<p>Not event found!</p>
			</ErrorAlert>
		);
	}

	return (
		<>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				location={event.location}
				image={event.image}
				title={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const eventId = context.params.eventId;
	const event = await getEventById(eventId);
	if (!event) {
		return { notFound: true };
	}
	return {
		props: {
			event,
		},
		revalidate: 30,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const events = await getFeaturedEvents();
	const paths = events.map((event) => ({ params: { eventId: event.id } }));
	return {
		paths: paths,
		fallback: "blocking",
	};
};
