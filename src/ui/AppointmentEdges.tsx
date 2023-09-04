import React from "react";
import { AppointmentEdge, DateParsableStr } from "@/types";
import style from '../styles/form.module.css';
interface IAppointmentEdgesProps {
  edges: Array<AppointmentEdge>;
}


function convertToDateTime(str: DateParsableStr) {
  const d = new Date(str)
  const date = d.toLocaleDateString('en-GB');
  const time = `${d.getHours()} : ${d.getMinutes()}`;

  return `${date}`
}


export const AppointmentEdges: React.FC<IAppointmentEdgesProps> = ({
  edges,
}) => {


  return (
    <div className={style.historicalAppTable}>
        <div>Date </div>
        <div>Status </div>
        <div>Service</div>

      {edges.map((edge) => {
        return <React.Fragment key={edge.node.id}>
          <div> {convertToDateTime(edge.node.scheduledTime) } </div>  
          <div> {edge.node.status} </div>
          <div>{edge.node.workOrder.service} </div>  
          </React.Fragment>;
      })}
     
    </div>
  );
};
