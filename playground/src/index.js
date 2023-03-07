import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import DatePicker, { Calendar } from '../../src';
import * as serviceWorker from './serviceWorker';

const App = () => {
  

  const [selectedDay, setValue] = useState(null);
  return <Calendar />
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
