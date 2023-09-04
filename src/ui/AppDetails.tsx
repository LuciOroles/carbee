import { AppointmentDto } from "@/types";
import React from "react";
import { calculateEndTime, convertToDateTime } from "./utils";
import style from "../styles/form.module.css";

interface IAppDetailsProps {
  dto: AppointmentDto;
}

export const AppDetails: React.FC<IAppDetailsProps> = ({ dto }) => {
  const dateTime = convertToDateTime(dto.scheduledTime);
  const isCompleted = [ "COMPLETE", "PAID"].indexOf(dto.status) > -1;
  
  return (
    <div className={style.dtoPanel}>
      <div className={style.dtoPanelHeader}>
        <span>&#128197;</span>
        {dateTime.date}
      </div>

      <div className={style.dtoStatus}>
        <div> {isCompleted ? "Started/" : dto.status} </div>
        <div> {isCompleted ? "Completed" : ""} </div>
      </div>
      <div className={style.dtoTime}>
        <div>{dateTime.time}</div>
        <div>-</div>
        <div>{calculateEndTime(dto.scheduledTime, dto.duration)}</div>
      </div>
      
      <div>
        <div><h3>Service</h3></div>
        <ul>
            <li>{dto.workOrder.service}</li>
        </ul>
      </div>
    </div>
  );
};
