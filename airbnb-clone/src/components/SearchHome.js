import React, { useEffect, useState } from 'react';
import '../styles/search.scss';
import { LocationOn, Search, EventNote, FlightTakeoff } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { startDatesSelector, startlocationsSelector } from '../redux/selectors';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDatePicker from './CustomDatePicker';
import { searchChange } from '../redux/slices/FiltersSlice';
import { useNavigate } from 'react-router-dom';

export default function SearchHome(prop) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
  const startlocations = useSelector(startlocationsSelector);

  const startDates = useSelector(startDatesSelector);
  const [starting, setStarting] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleOnChaneStart = (e) => {
    setStarting(e.target.value);
  };

  const handleOnchaneDes = (e) => {
    setDestination(e.target.value);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSearch = () => {
    dispatch(searchChange({starting, destination, date}));
    navigate('/category'); // Chuyển hướng đến trang /category
  };

  const image = prop.image || false;

  return (
    <div className='search-home container-fluid mb-5 p-0 position-relative'>
      <img
        className={`w-100 ${image ? 'd-none' : ''}`}
        src={'https://cdn2.ivivu.com/2023/04/21/10/tour-top-20230421-1-.png'}
        alt='...'
      />
      <div className={`container container-search ${image ? 'shadow-none' : 'position-absolute translate-middle'}`}>
        <div className='row container-wrap'>
          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
            <div className='d-flex flex-row group-input'>
              <span className='input-group-text bg-icon'>
                <FlightTakeoff className='icon' />
              </span>
              <div className='d-flex flex-column flex-group'>
                <label className='title'>Điểm khởi hành</label>
                <select
                  onChange={(e) => handleOnChaneStart(e)}
                  className='input'
                  defaultValue=''
                >
                  <option value='' disabled hidden>
                    Chọn điểm khởi hành
                  </option>
                  {startlocations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
            <div className='d-flex flex-row group-input'>
              <span className='input-group-text bg-icon'>
                <LocationOn className='icon' />
              </span>
              <div className='d-flex flex-column flex-group'>
                <label className='title'>Điểm đến</label>
                <select
                  onChange={(e) => handleOnchaneDes(e)}
                  className='input'
                  defaultValue=''
                >
                  <option value='' disabled hidden>
                    Chọn điểm đến
                  </option>
                  {startlocations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
            <div className='d-flex flex-row group-input'>
              <span className='input-group-text bg-icon'>
                <EventNote className='icon' />
              </span>
              <div className='d-flex flex-column flex-group'>
                <label className='title'>Ngày đi</label>
                <CustomDatePicker date={startDates} onDateChange={handleDateChange} />
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
            <div
              className='wrap-icon_search'
              onClick={() => handleSearch()}
            >
              <Search className='icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
