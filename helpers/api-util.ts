import { Event } from "../types";

export async function getAllEvents() {
	const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL);
	const data = await response.json();

	const events: Event[] = [];

	for (const key in data) {
		events.push({
			id: key,
			...data[key],
		});
	}

	return events;
}

export async function getFeaturedEvents(): Promise<Event[]> {
	const allEvents = await getAllEvents();
	return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: string | string[]): Promise<Event> {
	const allEvents = await getAllEvents();
	return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: {
	year: number;
	month: number;
}): Promise<Event[]> {
	const { year, month } = dateFilter;
	const allEvents = await getAllEvents();
	let filteredEvents = allEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
		);
	});

	return filteredEvents;
}
