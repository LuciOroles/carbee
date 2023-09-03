import { AppointmentEdge } from "@/types";
import React from "react";

interface IAppointmentEdgesProps {
  edges: Array<AppointmentEdge>;
}

export const AppointmentEdges: React.FC<IAppointmentEdgesProps> = ({
  edges,
}) => {
  return (
    <table>
      <tbody>
      <tr>
        <td>Duration</td>
        <td>Date </td>
        <td>Status </td>
      </tr>
      {edges.map((edge) => {
        return <tr key={edge.node.id}>
          <td>{edge.node.duration} </td>  
          <td> {edge.node.scheduledTime} </td>  
          <td> {edge.node.status} </td>
          </tr>;
      })}
      </tbody>
    </table>
  );
};
