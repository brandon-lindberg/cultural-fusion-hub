// Calendar.tsx

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from './Modal';
import { useTranslation } from 'react-i18next';
import eventsData from './events';
import styles from '../styles/Calendar.module.scss';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ja', ja);
setDefaultLocale('ja');

const CalendarComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { t, i18n } = useTranslation();

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    const selectedEventData = eventsData.find(
      (event) => new Date(event.start).toDateString() === date.toDateString(),
    );
    if (selectedEventData) {
      setSelectedEvent(selectedEventData);
    } else {
      setSelectedEvent(null);
    }
  };

  const renderDayContents = (day: number, date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const eventForThisDay = eventsData.find(
      (event) => format(new Date(event.start), 'yyyy-MM-dd') === formattedDate,
    );

    console.log(`Rendering day ${formattedDate}, event:`, eventForThisDay);

    if (eventForThisDay) {
      return (
        <div className={styles.dayContainer}>
          {day}
          <div
            className={
              eventForThisDay.stream
                ? styles.streamEventIndicator
                : styles.eventIndicator
            }
          ></div>
        </div>
      );
    }
    return day;
  };

  return (
    <div className={`${styles.customCalendar} w-full`}>
      <div className={`${styles.calendarLarge} w-full`}>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          inline
          renderDayContents={renderDayContents}
          locale="ja"
          calendarClassName={styles.responsiveCalendar}
        />
        <Modal
          isOpen={selectedEvent !== null}
          onClose={() => setSelectedEvent(null)}
          onOpenMaps={() => window.open(selectedEvent?.googleMapsUrl, '_blank')}
          event={selectedEvent}
        >
          {selectedEvent && (
            <div>
              <h2 className="text-center font-bold">{selectedEvent.title}</h2>
              <div className="p-1">
                <p>
                  <span className="font-bold">Start Time:</span>{' '}
                  {new Date(selectedEvent.start).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p>
                  <span className="font-bold">Location:</span>{' '}
                  {selectedEvent.location}
                </p>
              </div>
              <p className="p-1">{selectedEvent.description}</p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

const Calendar = () => (
  <div>
    <CalendarComponent />
  </div>
);

export default Calendar;