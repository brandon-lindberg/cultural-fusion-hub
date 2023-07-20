import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dynamic from 'next/dynamic';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import eventsData from './events';
import { useTranslation } from 'react-i18next';
import Script from 'next/script';
import styles from '../styles/Calendar.module.scss';

const CalendarComponent = () => {
  const [modal, setModal] = useState({ visible: false, content: null });
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
        <h1 className={styles.title}>{info.event.title}</h1>
        <p>
          <strong>{t('start')}:</strong> {formattedStartDate}
          <br />
          <strong>{t('location')}:</strong> {info.event.extendedProps.location}
          <br />
          <strong>{t('description')}:</strong>{' '}
          {info.event.extendedProps.description}
        </p>
        <div
          className={`${styles.flex} ${styles['justify-between']} ${styles['mt-4']}`}
        >
          <a
            href={info.event.extendedProps.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className={`${styles.btn} ${styles['btn--color1']}`}
          >
            {t('maps')}
          </a>
          <button
            onClick={() => setModal({ visible: false, content: null })}
            className={`${styles.btn} ${styles['btn--color2']}`}
          >
            {t('close')}
          </button>
        </div>
      </div>
    );

    setModal({ visible: true, content });
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
      {modal.visible && (
        <div className={styles.modal}>
          <div className={styles['modal-content']}>{modal.content}</div>
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
    <Script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js" />
    <DynamicCalendarComponent />
  </div>
);

export default Calendar;
