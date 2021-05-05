import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { EventList } from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";
import { Event } from "../../types";

interface FilteredEvents {
	events: Event[];
	date: {
		year: number;
		month: number;
	};
}

export default function FilteredEventsPage({
	events,
	date: { year, month },
}: FilteredEvents) {
	if (!events || !events.length) {
		return (
			<>
				<ErrorAlert>
					<p className="center">No events found!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show all events!</Button>
				</div>
			</>
		);
	}

	const date = new Date(year, month - 1);

	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={events} />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { params } = context;

	const filteredData = params.slug;

	const filteredYear = filteredData[0];
	const filteredMonth = filteredData[1];
	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	console.log(numYear);
	console.log(numMonth);

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth < 1 ||
		numMonth > 12
	) {
		return {
			notFound: true,
		};
	}

	const events = await getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	return {
		props: {
			events: events,
			date: {
				year: numYear,
				month: numMonth,
			},
		},
	};
};
