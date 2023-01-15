import './App.css';
import logo from './logo.png';
import timezones from './Timezones';
import React, { useState } from 'react';
import Timezone from './Timezone';
import TimePicker, { TimePickerValue } from 'react-time-picker';
import TimeUtility from './TimeUtility';

function App() {
  const now = new Date();
  const [originTime, setOriginTime] = useState<TimePickerValue>(`${TimeUtility.leadNumber(now.getHours())}:${TimeUtility.leadNumber(now.getMinutes())}`);
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
  function parseTime(time: TimePickerValue): number {
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
    return targetTime;
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          <div className='row'>
            <div className='col text-center mb-5'>
              <img alt='logo' src={logo} width="128" /><br />
              <h1>Global & Realtime Timezone Converter</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-3 text-end'>Your zone:</div>
            <div className='col-9 text-start'>
              <select title='select origin timezone' name='OriginTimeZoneSelect' onChange={originZoneChanged} className='w-100'>
                <option key="default" value={currentTimeZone().Name}>Auto detect ({currentTimeZone().Name})</option>
                {timezoneOptions}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-3 text-end'>Desired time:</div>
            <div className='col-9 text-start'>
              <TimePicker value={originTime} onChange={setOriginTime} /> in {originZone.Name}
            </div>
          </div>

          {destTimeZones.map(x =>
            <div className='row'>
              <div className='col-3 text-end border-bottom-1 border-white'>{x.Name.replace('/',' ')}</div>
              <div className='col-9 text-start border-bottom-1 border-white'>{calcTime(x)}</div>
            </div>
          )}

          <div className='row'>
            <div className='col-3 text-end'>Add target zone:</div>
            <div className='col-9 text-start'>
              <select title='Destination time zone' name='DestTimeZoneSelect' onChange={targetZoneChanged} className='w-100'>
                <option>Select destination time zone</option>
                {timezoneOptions}
              </select>
            </div>
          </div>
        </div>
      </header>
      <footer className='footer'>
        Author: Hassan Behzadian. Version: 0.1@230115
      </footer>
    </div>
  );
}

export default App;
