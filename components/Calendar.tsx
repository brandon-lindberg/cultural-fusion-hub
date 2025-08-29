// Calendar.tsx

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from './Modal';
import eventsData from './events';
import styles from '../styles/Calendar.module.scss';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Ensure eventsData is always an array with robust error handling
const safeEventsData = (() => {
  try {
    if (!eventsData) return [];
    if (!Array.isArray(eventsData)) return [];
    // Filter out any malformed events
    return eventsData.filter(event =>
      event &&
      typeof event === 'object' &&
      event.start &&
      event.title &&
      event.location
    );
  } catch (error) {
    console.error('Error processing events data:', error);
    return [];
  }
})();

registerLocale('ja', ja);
setDefaultLocale('ja');

const CalendarComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    try {
      const selectedEventData = safeEventsData.find((event) => {
        try {
          return new Date(event.start).toDateString() === date.toDateString();
        } catch (error) {
          console.error('Error parsing event date:', error);
          return false;
        }
      });
      setSelectedEvent(selectedEventData || null);
    } catch (error) {
      console.error('Error finding selected event:', error);
      setSelectedEvent(null);
    }
  };

  const renderDayContents = (day: number, date: Date) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const eventForThisDay = safeEventsData.find(      (event) => {
        try {
          return format(new Date(event.start), 'yyyy-MM-dd') === formattedDate;
        } catch {
          // Silently skip malformed events
          return false;
        }
      });

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
    } catch (error) {
      console.error('Error rendering day contents:', error);
      return day;
    }
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
              <h2 className="text-center font-bold">{selectedEvent.title || 'Event'}</h2>
              <div className="p-1">
                {selectedEvent.start && (
                  <p>
                    <span className="font-bold">Start Time:</span>{' '}
                    {(() => {
                      try {
                        return new Date(selectedEvent.start).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        });
                      } catch {
                        return 'Invalid time';
                      }
                    })()}
                  </p>
                )}
                {selectedEvent.location && (
                  <p>
                    <span className="font-bold">Location:</span>{' '}
                    {selectedEvent.location}
                  </p>
                )}
              </div>
              {selectedEvent.description && (
                <p className="p-1">{selectedEvent.description}</p>
              )}
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