import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dynamic from 'next/dynamic';
import { LocaleInput } from '@fullcalendar/core';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';

// This component will be rendered on the client side only
class CalendarComponent extends React.Component {
  eventClick = (info) => {
    const startDate = info.event.start;
    const formattedStartDate = startDate ? startDate.toLocaleString() : 'N/A';
    alert(
      'Event: ' +
        info.event.title +
        '\n' +
        'Start: ' +
        formattedStartDate +
        '\n' +
        'Description: ' +
        info.event.extendedProps.description,
    );
  };
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        // initialView="timeGridWeek"
        locale={jaLocale}
        events={[
          {
            title: 'Get Together',
            start: '2023-07-22T14:00:00', // Start time of the event
            end: '2023-07-22T15:30:00', // End time of the event
            // date: '2023-07-22',
            description: 'This is a get together event.',
          },
          {
            title: 'Fusion Event',
            start: '2023-07-19T18:00:00', // Start time of the event
            end: '2023-07-19T20:30:00', // End time of the event
            // date: '2023-07-19',
            description: 'This is a fusion event.',
          },
        ]}
        eventClick={this.eventClick}
      />
    );
  }
}

const DynamicCalendarComponent = dynamic(
  () => Promise.resolve(CalendarComponent),
  {
    ssr: false, // This line is important. It's what prevents server-side rendering.
  },
);

const Calendar = () => (
  <div>
    <DynamicCalendarComponent />
  </div>
);

export default Calendar;
