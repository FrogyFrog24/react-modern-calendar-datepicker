import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import DatePicker, { Calendar } from '../../src';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const spreadWidth = 3;

  const events = [
    {
      color: '#2CA7A7',
      description: '',
      end: '13.03.2023',
      end_notify: false,
      id: 25,
      isActive: true,
      name: '1231',
      start: '05.03.2023',
      start_notify: false,
    },
    {
      color: '#2CA7A7',
      description: '',
      end: '09.03.2023',
      end_notify: false,
      id: 25,
      isActive: true,
      name: '1231',
      start: '07.03.2023',
      start_notify: false,
    },
    {
      color: '#3182CE',
      description: '',
      end: '11.03.2023',
      end_notify: false,
      id: 25,
      isActive: true,
      name: '1231',
      start: '07.03.2023',
      start_notify: false,
    },
    {
      color: '#E84461',
      description: '',
      end: '19.03.2023',
      end_notify: false,
      id: 25,
      isActive: true,
      name: '1231',
      start: '07.03.2023',
      start_notify: false,
    },

    {
      color: '#FF961C',
      description: '',
      end: '13.03.2023',
      end_notify: false,
      id: 25,
      isActive: true,
      name: '1231',
      start: '07.03.2023',
      start_notify: false,
    },
  ];

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const parseEventDateGroup = (events, spreadWidth) => {
    let k = -1;
    const result = [
      ...events.map(event => {
        let start = new Date(
          `${event.start.split('.')[2]}-${event.start.split('.')[1]}-${event.start.split('.')[0]}`,
        );
        let end = new Date(
          `${event.end.split('.')[2]}-${event.end.split('.')[1]}-${event.end.split('.')[0]}`,
        );
        let dateArray = new Array();
        let currentDate = start;
        while (currentDate <= end) {
          dateArray.push(new Date(currentDate));
          currentDate = currentDate.addDays(1);
        }
        if (dateArray.length === 1)
          return [
            ...dateArray.map((el, i) => {
              return (el = {
                day: el.getDate(),
                month: el.getMonth() + 1,
                year: el.getFullYear(),
                style: { boxShadow: `inset 0px 0px 0px ${spreadWidth}px ${event.color}` },
                className: 'single',
              });
            }),
          ];
        return [
          ...dateArray.map((el, i) => {
            return (el = {
              year: el.getFullYear(),
              month: el.getMonth() + 1,
              day: el.getDate(),
              style: { boxShadow: `inset 0px 0px 0px ${spreadWidth}px ${event.color}` },
              className: i === 0 ? 'start' : i === dateArray.length - 1 ? 'end' : 'middle',
            });
          }),
        ];
      }),
    ];
    console.log(result.flat());
    return result;
  };

  function mergeObjects(arr, spreadWidth) {
    const merged = [];

    arr.forEach(subArr => {
      subArr.forEach(obj => {
        const { year, month, day, className, style } = obj;
        const existing = merged.find(
          item => item.year === year && item.month === month && item.day === day,
        );

        if (existing) {
          existing.className = `${existing.className} ${className}`;
          const existingBoxShadow = existing.style.boxShadow || '';
          const currentBoxShadow = style.boxShadow || '';
          const boxShadowParts = [
            ...existingBoxShadow.split(/,\s*/),
            ...currentBoxShadow.split(/,\s*/),
          ];
          let spreadOffset = 0;
          const boxShadow = [];

          boxShadowParts.forEach((part, index) => {
            const boxShadowValues = part.trim().split(/\s+/);
            const offset = index * spreadWidth;
            boxShadowValues[4] = `${offset}px`;
            boxShadow.push(boxShadowValues.join(' '));
          });

          existing.style.boxShadow = boxShadow.join(', ');
        } else {
          merged.push({ year, month, day, className, style });
        }
      });
    });

    return merged;
  }

  return (
    <Calendar
      colorPrimary="#FFB6C1"
      colorPrimaryLight="rgba(255, 182, 193, 0.4)"
      customDaysClassName={mergeObjects(parseEventDateGroup(events, spreadWidth), spreadWidth)}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
