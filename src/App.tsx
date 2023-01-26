import './App.css';
import './TimePickerExtra.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import logo from './logo.png';
import timezones from './Timezones';
import React, { useState } from 'react';
import Timezone from './Timezone';
import TimeUtility from './TimeUtility';

function App() {
  const now = new Date();
  dayjs.extend(customParseFormat)
  const [originTime, setOriginTime] = useState<string>(`${TimeUtility.leadNumber(now.getHours())}:${TimeUtility.leadNumber(now.getMinutes())}`);
  const [originZone, setOriginZone] = useState<Timezone>(currentTimeZone());
  const [destTimeZones, setDestTimeZones] = useState<Timezone[]>([]);
  const timezoneOptions = timezones
    .sort((x, y) => x.OffsetInSeconds - y.OffsetInSeconds)
    .map((x) => <option key={x.Name} value={x.Name}>{TimeUtility.formatTime(x.OffsetInSeconds)} {x.Name}</option>);
  function originZoneChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    var tz = timezones.find(x => x.Name === e.target.value);
    if (tz === undefined)
      return;
    setOriginZone(tz);
  }
  
  function targetZoneChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    var tz = timezones.find(x => x.Name === e.target.value);
    if (tz === undefined)
      return;
    setDestTimeZones([...destTimeZones, tz]);
  }

  function originTimeChanged(time: dayjs.Dayjs | null, timeString: string) {
    setOriginTime(timeString);
  }

  function parseTime(time: string): number {
    if (!time)
      return NaN;
    var parts = time.toString().split(':');
    var minutes = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60;
    return minutes;
  }
  function currentTimeZone(): Timezone {
    var offsetSecs = new Date().getTimezoneOffset() * -60;
    const timezone = timezones.find(x => x.OffsetInSeconds === offsetSecs);
    if (timezone == null)
      return timezones[0];
    console.log(`getTimezoneOffset: ${offsetSecs}, timezone: ${timezone.Key}`)
    return timezone;
  }
  function calcTime(tz: Timezone): String {
    const originTimeInSeconds = parseTime(originTime);
    const targetTimeInSeconds = originTimeInSeconds + tz.OffsetInSeconds - originZone.OffsetInSeconds;
    const targetTime = TimeUtility.formatTime(targetTimeInSeconds).substring(1);
    const offsetTime = TimeUtility.formatTime(tz.OffsetInSeconds);
    return `${targetTime} (${offsetTime})`;
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className='container mb-5'>
          <div className='row'>
            <div className='col text-center mb-5'>
              <img alt='logo' src={logo} width="128" /><br />
              <h1>Global & Realtime Timezone Converter</h1>
              <p className='small'><em>Convert any timezone to any other timezone instantly, just add target timezones by selecting them</em></p>
            </div>
          </div>
          <div className='row m-2'>
            <div className='col-3 text-end'>Origin zone:</div>
            <div className='col-9 text-start'>
              <select title='select origin timezone' name='OriginTimeZoneSelect' onChange={originZoneChanged} className='w-100 bg-info-subtle rounded'>
                <option key="default" value={currentTimeZone().Name}>Auto detect ({currentTimeZone().Name})</option>
                {timezoneOptions}
              </select>
            </div>
          </div>
          <div className='row m-2'>
            <div className='col-3 text-end'>Origin time:</div>
            <div className='col-9 text-start'>
              <TimePicker defaultValue={dayjs(originTime, 'HH:mm')} allowClear={false} format='HH:mm' minuteStep={5} use12Hours={false} placeholder='' onChange={originTimeChanged} /> in {originZone.Name}
            </div>
          </div>

          <div className='row m-2'>
            <div className='col-3 text-end'>Add target zone:</div>
            <div className='col-9 text-start'>
              <select title='Destination time zone' name='DestTimeZoneSelect' onChange={targetZoneChanged} className='w-100 rounded bg-info-subtle'>
                <option>Select destination time zone</option>
                {timezoneOptions}
              </select>
            </div>
          </div>

          {destTimeZones.map(x =>
            <div className='row m-2'>
              <div className='col-3 text-end border-bottom-1 border-white'>{x.Name.replace('/',' ')}</div>
              <div className='col-9 text-start border-bottom-1 border-white'>{calcTime(x)}</div>
            </div>
          )}
        </div>
      </header>
      <footer className='footer pb-3'>
        Author: Hassan Behzadian.<br/>
        Version: 0.2.0@230126<br/>
        Any idea? Please create an issue at <a href='https://github.com/Grtzc/grtzc-app-react/' rel='noreferrer noopener' target='_blank'>https://github.com/Grtzc/grtzc-app-react/</a>
      </footer>
    </div>
  );
}

export default App;
