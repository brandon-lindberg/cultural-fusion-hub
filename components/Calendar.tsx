import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dynamic from 'next/dynamic';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import eventsData from './events';
import { useTranslation } from 'react-i18next';
import styles from '../styles/Calendar.module.scss';

const CalendarComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { t, i18n } = useTranslation();

  const eventClick = (info) => {
    const startDate = info.event.start;
    const formattedStartDate = startDate
      ? `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`
      : 'N/A';

    const content = (
      <div>
        <h1 className="text-center font-bold">{info.event.title}</h1>
        <p>
          <strong>{t('start')}:</strong> {formattedStartDate}
          <br />
          <strong>{t('location')}:</strong> {info.event.extendedProps.location}
          <br />
          <strong>{t('description')}:</strong>{' '}
          {info.event.extendedProps.description}
        </p>
        <div className="flex justify-between mt-4">
          <a
            href={info.event.extendedProps.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-1/2 p-2 bg-buttonColor1 text-white rounded text-center mx-2"
          >
            {t('maps')}
          </a>
          <button
            onClick={() => setModalVisible(false)}
            className="w-1/2 p-2 bg-buttonColor2 text-white rounded text-center mx-2"
          >
            {t('close')}
          </button>
        </div>
      </div>
    );

    setModalVisible(true);
    setModalContent(content);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        locale={jaLocale}
        events={eventsData}
        eventClick={eventClick}
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
};

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
