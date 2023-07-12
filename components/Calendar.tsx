import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dynamic from 'next/dynamic';
import { LocaleInput } from '@fullcalendar/core';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useTranslation } from 'react-i18next';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

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
        events={[
          {
            title: 'Cultural Fusion Hub Meet up!',
            start: '2023-07-15T09:00:00',
            end: '2023-07-15T12:00:00',
            location: '代沢地区会館',
            googleMapsUrl: 'https://goo.gl/maps/6Vu8mX3HmBWbEU8n8',
            description:
              'ミックスキッズとそのママさん、パパさんの交流会。英語の本の読み聞かせもあります！おもちゃもたくさん準備していますので、お子様を連れて、お気軽にお越しください。お時間のある方は、交流会の後にランチや近場の夏祭りに行きましょう！',
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
