import { useContext, useEffect, useState } from "react";
import { Dropdown , Container, Row} from "react-bootstrap";
import Calendar from "react-calendar";
import { ChannelContext } from "../contexts/ChannelContext";
import Schedule from "./Schedule";
import { Calendar3 } from "react-bootstrap-icons";
import "react-calendar/dist/Calendar.css";
import {active,inactive,menubar,menuList,listItem,scheduleContainer} from "../css/ChannelSchedule.module.css";



const ChannelSchedule = (props) => {
  const { schedule, getChannelSchedule } = useContext(ChannelContext);
  const [today, setToday] = useState(true);
  const [tomorrow, setTomorrow] = useState(false);
  const [yesterday, setYesterday] = useState(false);
  const [date, setDate] = useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );
  const [value, onClick, onChange] = useState(new Date());

  useEffect(() => {
    getChannelSchedule(props.channelId, date);
    // eslint-disable-next-line
  }, [props.channelId, date]);

  const handleOnclickYesterday = () => {
    setToday(false);
    setTomorrow(false);
    setYesterday(true);
    let yesterdayDate = new Date(new Date().setDate(new Date().getDate() - 1));
    yesterdayDate =
      yesterdayDate.getFullYear() +
      "-" +
      (yesterdayDate.getMonth() + 1) +
      "-" +
      yesterdayDate.getDate();
    setDate(yesterdayDate);
  };
  const handleOnclickToday = () => {
    setToday(true);
    setTomorrow(false);
    setYesterday(false);

    let todayDate =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    setDate(todayDate);
  };
  const handleOnclickTomorrow = () => {
    setToday(false);
    setTomorrow(true);
    setYesterday(false);
    let tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1));
    tomorrowDate =
      tomorrowDate.getFullYear() +
      "-" +
      (tomorrowDate.getMonth() + 1) +
      "-" +
      tomorrowDate.getDate();
    setDate(tomorrowDate);
  };



  const handlePickDateOnClick = (value, e) => {
    setToday(false);
    setTomorrow(false);
    setYesterday(false);
    setDate(
      value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate()
    );
  };



  const renderTopMenu = () => {
    return (
      <ul className={`${menuList}`}>
        <li className={listItem}>
          <span
            className={`${yesterday ? active : inactive}`}
            onClick={() => {
              handleOnclickYesterday();
            }}
          >
            Yesterday
          </span>
        </li>
        <li className={listItem}>
          <span
            className={`${today ? active : inactive}`}
            onClick={() => {
              handleOnclickToday();
            }}
          >
            Today
          </span>
        </li>
        <li className={listItem}>
          <span
            className={` ${tomorrow ? active : inactive}`}
            onClick={() => {
              handleOnclickTomorrow();
            }}
          >
            Tomorrow
          </span>
        </li>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
            <Calendar3 /> Select Date
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* <Dropdown.Item >  */}
            <Calendar
              locale="en-EN"
              calendarType="US"
              onClickDay={(value, e) => handlePickDateOnClick(value, e)}
              onChange={onChange}
              onClick={onClick}
              value={value}
            />
            {/* </Dropdown.Item>   */}
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    );
  };

  return (
    <div className={`${scheduleContainer}`}>
      <div className={`${menubar}`}>{renderTopMenu()}</div>
      <Container>
        <h2 className="test-center">{date}</h2>
        <Row>{schedule && <Schedule schedule={schedule} />}</Row>
      </Container>
    </div>
  );
};

export default ChannelSchedule;
