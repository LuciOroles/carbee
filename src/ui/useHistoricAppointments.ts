import { AppointmentDto,  Connection,  PageIdentifier, PageInfo } from '@/types';
import   { useCallback,   useState } from 'react';

interface IHistoricAppointmentsProps {
    token: string;
}

function getHistoricAppointments({
    token,
  }: {
    token: string;
    
  }) {
    const appHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
    const searchParams = new URLSearchParams({ size: '20' })
    return fetch('/appointments?'+ searchParams, {
      headers: appHeaders,
      
    }).then((data) => data.json());
  }

function useHistoricAppointments({ token }: {token: string} ) {

    const [ historicData, setHistoricalData] =  useState<Array<Connection<AppointmentDto>> >([]); 

    const [currentPage, setCurrentPage] = useState<PageInfo | null>(null);

    function dataGetter() {
        getHistoricAppointments({token}).then((data: Connection<AppointmentDto>) => {
            setHistoricalData(_hd => [..._hd, data] );
            setCurrentPage(data.pageInfo);
        });
    }

    function viewPicker(pageId: PageIdentifier): Connection<AppointmentDto> | null {
       return   historicData.filter((connection) => {
            if (connection.pageInfo.nextCursor === pageId.nextCursor &&
                connection.pageInfo.previousCursor === pageId.previousCursor
                ) {
                    return true;
                }
            else {
                return false;
            }
        })?.[0] || null;
    }

    return {
        dataGetter: useCallback(dataGetter, [token]),
        currentPage,
        historicData,
        viewPicker,
    }
}


export default useHistoricAppointments;