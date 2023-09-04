import React, { SetStateAction } from "react";
import { AppointmentDto, AppointmentEdge, DateParsableStr } from "@/types";
import style from "../styles/form.module.css";
import { convertToDateTime } from "./utils";
interface IAppointmentEdgesProps {
  edges: Array<AppointmentEdge>;
  selectedDto: AppointmentDto | null;
  setSelectedDto: React.Dispatch<SetStateAction<AppointmentDto | null>>;
}

export const AppointmentEdges: React.FC<IAppointmentEdgesProps> = ({
  edges,
  setSelectedDto,
  selectedDto,
}) => {
  return (
    <div className={style.historicalAppTable}>
      <div className={style.historicalAppRow}>
        <div>Date </div>
        <div>Status </div>
        <div>Service</div>
      </div>

      {edges.map((edge) => {
        return (
          <div
            key={edge.node.id}
            onClick={() => setSelectedDto(edge.node)}
            className={
              style.historicalAppRow +
              (selectedDto?.id === edge.node.id ? ` ${style.selected}` : "")
            }
          >
            <div> {convertToDateTime(edge.node.scheduledTime).date} </div>
            <div> {edge.node.status} </div>
            <div>{edge.node.workOrder.service} </div>
          </div>
        );
      })}
    </div>
  );
};
