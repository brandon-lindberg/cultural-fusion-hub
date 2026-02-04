// Calendar.tsx

import React, { useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from './Modal';
import rawEvents from './events';
import styles from '../styles/Calendar.module.scss';
import { format, isBefore, isSameDay, parseISO, startOfDay } from 'date-fns';
import { ja as jaLocale, enUS } from 'date-fns/locale';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';

registerLocale('ja', jaLocale);
registerLocale('en', enUS);

interface RawCalendarEvent {
  title: string;
  start: string;
  end: string;
  location: string;
  stream?: boolean;
  googleMapsUrl?: string | null;
  instagramUrl?: string | null;
  description?: string;
}

interface CalendarEvent extends RawCalendarEvent {
  startDate: Date;
  endDate: Date;
}

const isCalendarEvent = (event: unknown): event is RawCalendarEvent => {
  if (!event || typeof event !== 'object') return false;

  const candidate = event as Record<string, unknown>;
  return (
    typeof candidate.title === 'string' &&
    typeof candidate.start === 'string' &&
    typeof candidate.end === 'string' &&
    typeof candidate.location === 'string'
  );
};

const parseDate = (value: string): Date | null => {
  const parsed = parseISO(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const CalendarComponent = () => {
  const { i18n, t } = useTranslation();

  const events = useMemo<CalendarEvent[]>(() => {
    const eventsArray = Array.isArray(rawEvents) ? rawEvents : [];
    const result: CalendarEvent[] = [];

    eventsArray.filter(isCalendarEvent).forEach((event) => {
      const startDate = parseDate(event.start);
      if (!startDate) return;

      const endDate = parseDate(event.end) ?? startDate;

      result.push({
        ...event,
        startDate,
        endDate,
      });
    });

    return result.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, []);

  const today = startOfDay(new Date());
  const upcomingEvent = useMemo(
    () => events.find((event) => !isBefore(event.startDate, today)) ?? null,
    [events, today],
  );

  const initialDisplayDate = upcomingEvent?.startDate ?? today;

  const [activeDate, setActiveDate] = useState<Date>(initialDisplayDate);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  const datepickerLocaleKey = i18n.language.startsWith('ja') ? 'ja' : 'en';
  const dateFnsLocale = datepickerLocaleKey === 'ja' ? jaLocale : enUS;

  useEffect(() => {
    setDefaultLocale(datepickerLocaleKey);
  }, [datepickerLocaleKey]);

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setActiveDate(date);
    const eventsForDate = events.filter((event) => isSameDay(event.startDate, date));
    setSelectedEvents(eventsForDate);
  };

  const renderDayContents = (day: number, date: Date) => {
    const eventsForThisDay = events.filter((event) => isSameDay(event.startDate, date));
    if (!eventsForThisDay.length) {
      return day;
    }

    const hasStream = eventsForThisDay.some((event) => event.stream);

    return (
      <div className={styles.dayContainer}>
        {day}
        <div
          className={hasStream ? styles.streamEventIndicator : styles.eventIndicator}
        ></div>
      </div>
    );
  };

  return (
    <div className={`${styles.customCalendar} w-full`}>
      <div className={`${styles.calendarLarge} w-full`}>
        <DatePicker
          selected={activeDate}
          onChange={handleDateChange}
          inline
          renderDayContents={renderDayContents}
          locale={datepickerLocaleKey}
          calendarClassName={styles.responsiveCalendar}
        />
        <Modal
          isOpen={selectedEvents.length > 0}
          onClose={() => setSelectedEvents([])}
          onOpenMaps={() => {
            const primaryEvent = selectedEvents[0];
            if (!primaryEvent) return;

            if (primaryEvent.stream && primaryEvent.instagramUrl) {
              window.open(primaryEvent.instagramUrl, '_blank');
              return;
            }

            if (!primaryEvent.stream && primaryEvent.googleMapsUrl) {
              window.open(primaryEvent.googleMapsUrl, '_blank');
            }
          }}
          event={selectedEvents[0] ?? null}
        >
          {selectedEvents.map((event) => (
            <div key={`${event.start}-${event.title}`}>
              <h2 className="text-center font-bold">{event.title}</h2>
              <div className="p-1">
                <p>
                  <span className="font-bold">{t('start')}:</span>{' '}
                  {format(event.startDate, 'PPP p', { locale: dateFnsLocale })}
                </p>
                <p>
                  <span className="font-bold">{t('end')}:</span>{' '}
                  {format(event.endDate, 'PPP p', { locale: dateFnsLocale })}
                </p>
                <p>
                  <span className="font-bold">{t('location')}:</span>{' '}
                  {event.location}
                </p>
              </div>
              {event.description && <p className="p-1">{event.description}</p>}
            </div>
          ))}
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
