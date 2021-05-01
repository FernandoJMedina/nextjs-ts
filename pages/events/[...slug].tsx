import { useRouter } from "next/dist/client/router";
import { EventList } from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummy-data";

export default function FilteredEventsPage() {
  const router = useRouter();
  const slug = router.query.slug;

  if (!slug) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = slug[0];
  const filteredMonth = slug[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p className='center'>Invalid filter, please adjust your values.</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show all events!</Button>
        </div>
      </>
    );
  }
  const events = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!events || !events.length) {
    return (
      <>
        <ErrorAlert>
          <p className='center'>No events found!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show all events!</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
}
