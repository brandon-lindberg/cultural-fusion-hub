import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dynamic from 'next/dynamic';
import { LocaleInput } from '@fullcalendar/core';
import jaLocale from '@fullcalendar/core/locales/ja';

// This component will be rendered on the client side only
class CalendarComponent extends React.Component {
  eventClick = (info) => {
    alert(
      'Event: ' +
        info.event.title +
        '\n' +
        'Description: ' +
        info.event.extendedProps.description,
    );
  };
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={jaLocale}
        events={[
          {
            title: 'Get Together',
            date: '2023-07-22',
            description: 'This is a get together event.',
          },
          {
            title: 'Fusion Event',
            date: '2023-07-19',
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
