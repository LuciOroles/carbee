import {  AppointmentEdge } from '@/types';
import  React, {  useEffect, useState } from 'react';
import { AppointmentEdges } from './AppointmentEdges';
import useHistoricAppointments from './useHistoricAppointments';

interface IHistoricAppointmentsProps {
    token: string;
}

export const HistoricAppointments: React.FC<IHistoricAppointmentsProps> = ({token}) => {
   
    const { currentPage, dataGetter, viewPicker } = useHistoricAppointments({token});

    const [edges, setEdges] = useState <Array<AppointmentEdge>>([]);

    useEffect(() => {
          dataGetter();
          debugger;
    }, [dataGetter]);
   
    return (
      <section>
        <h3>History of appointments:</h3>
        {edges.length > 0 && <AppointmentEdges edges={edges} />}
        <div>
            {currentPage && (
                <button type='button' onClick={() => {
                    const data = viewPicker({ nextCursor: currentPage.nextCursor, previousCursor: currentPage.previousCursor })
                    setEdges(data?.edges || [])
                }}>
                    Current
                </button>
            )}
        </div>
      
      </section>
    );
};
