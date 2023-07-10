import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dynamic from 'next/dynamic';
import { LocaleInput } from '@fullcalendar/core';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';

class CalendarComponent extends React.Component {
  state = {
    modalVisible: false,
    modalContent: null,
  };

  eventClick = (info) => {
    const startDate = info.event.start;
    const formattedStartDate = startDate
      ? `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`
      : 'N/A';

    const modalContent = (
      <div>
        <h2>{info.event.title}</h2>
        <p>
          <strong>Start:</strong> {formattedStartDate}
          <br />
          <strong>Location:</strong> {info.event.extendedProps.location}
          <br />
          <strong>Description:</strong> {info.event.extendedProps.description}
        </p>
        <div className="flex justify-between mt-4">
  <a
    href={info.event.extendedProps.googleMapsUrl}
    target="_blank"
    rel="noreferrer"
    className="w-1/2 p-2 bg-buttonColor1 text-white rounded text-center mx-2"
  >
    Open Maps
  </a>
  <button
    onClick={this.closeModal}
    className="w-1/2 p-2 bg-buttonColor2 text-white rounded text-center mx-2"
  >
    Close
  </button>
</div>
      </div>
    );

    this.setState({ modalVisible: true, modalContent });
  };

  closeModal = () => {
    this.setState({ modalVisible: false, modalContent: null });
  };

  render() {
    const { modalVisible, modalContent } = this.state;

    return (
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          locale={jaLocale}
          events={[
            {
              title: 'Meet Up',
              start: '2023-07-15T09:00:00',
              end: '2023-07-15T12:00:00',
              location: '代沢地区会館',
              googleMapsUrl: 'https://goo.gl/maps/6Vu8mX3HmBWbEU8n8',
              description: 'July Meet Up',
            },
            // {
            //   title: 'Get Together',
            //   start: '2023-07-22T14:00:00',
            //   end: '2023-07-22T15:30:00',
            //   location: '代沢地区会館',
            //   googleMapsUrl: 'https://goo.gl/maps/6Vu8mX3HmBWbEU8n8',
            //   description: 'This is a get together event.',
            // },
            // {
            //   title: 'Fusion Event',
            //   start: '2023-07-19T18:00:00',
            //   end: '2023-07-19T20:30:00',
            //   location: '代沢地区会館',
            //   googleMapsUrl: 'https://goo.gl/maps/6Vu8mX3HmBWbEU8n8',
            //   description: 'This is a fusion event.',
            // },
          ]}
          eventClick={this.eventClick}
        />
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full space-y-4">
              {modalContent}
            </div>
          </div>
        )}
      </div>
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
