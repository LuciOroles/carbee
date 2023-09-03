import { AppointmentList, DateParsableStr } from "@/types";
import  React from "react";
import style from '../styles/form.module.css';

function getHours(dateStr: DateParsableStr) {
  const _d = new Date(dateStr);
  const _min = _d.getUTCMinutes();
  return _d.getUTCHours() + ":" + (_min < 10 ? `0${_min}` : _min);
}

interface IAppointmentsProps {
  appointments: AppointmentList;
 
}

const Appointments: React.FC<IAppointmentsProps> = ({ appointments }) => {
  const dayStr = new Date(appointments[0]).toLocaleDateString('en-GB');
  return (
    <section>
      <h3>Appointments of {dayStr}</h3>
      <div className={style.appointmentList}>
        {appointments.map((app: DateParsableStr, i) => {
          return <div key={i}> {getHours(app)} </div>;
        })}
      </div>
    </section>
  );
};

export default Appointments;
