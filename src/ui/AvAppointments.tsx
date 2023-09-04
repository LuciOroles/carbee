import { AppointmentList, DateParsableStr } from "@/types";
import  React from "react";
import { getHours } from "./utils";
import style from '../styles/form.module.css';



interface IAppointmentsProps {
  appointments: AppointmentList;
 
}

const AvAppointments: React.FC<IAppointmentsProps> = ({ appointments }) => {
  const dayStr = new Date(appointments[0]).toLocaleDateString('en-GB');
  return (
    <section>
      <h3>Available appointments on {dayStr}</h3>
      <div className={style.appointmentList}>
        {appointments.map((app: DateParsableStr, i) => {
          return <div key={i}> {getHours(app)} </div>;
        })}
      </div>
    </section>
  );
};

export default AvAppointments;
