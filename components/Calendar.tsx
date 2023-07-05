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
          <br />
          <strong>Google Maps:</strong>
          <a
            href={info.event.extendedProps.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full p-2 bg-green-500 text-white rounded block text-center mt-2"
          >
            Open directions in Google Maps
          </a>
        </p>
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
              title: 'Get Together',
              start: '2023-07-22T14:00:00',
              end: '2023-07-22T15:30:00',
              location: 'Park',
              googleMapsUrl: 'https://goo.gl/maps/6Vu8mX3HmBWbEU8n8',
              description: 'This is a get together event.',
            },
            {
              title: 'Fusion Event',
              start: '2023-07-19T18:00:00',
              end: '2023-07-19T20:30:00',
              location: 'Mall',
              googleMapsUrl: 'https://goo.gl/maps/6Vu8mX3HmBWbEU8n8',
              description: 'This is a fusion event.',
            },
          ]}
          eventClick={this.eventClick}
        />
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full space-y-4">
              {modalContent}
              <button
                onClick={this.closeModal}
                className="w-full p-2 bg-blue-500 text-white rounded"
              >
                Close
              </button>
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
