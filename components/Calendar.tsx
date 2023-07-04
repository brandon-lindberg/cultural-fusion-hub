import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dynamic from 'next/dynamic';

// This component will be rendered on the client side only
class CalendarComponent extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'Get Together', date: '2023-07-22' },
        ]}
      />
    );
  }
}

const DynamicCalendarComponent = dynamic(() => Promise.resolve(CalendarComponent), {
  ssr: false // This line is important. It's what prevents server-side rendering.
});

// This function checks if we're on the client side before rendering the component
const Calendar = () => (
  <div>
    {/* {typeof window !== 'undefined' && <CalendarComponent />} */}
    <DynamicCalendarComponent />
  </div>
);

export default Calendar;