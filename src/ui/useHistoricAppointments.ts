import { AppointmentDto, Connection, FetchAppointmentParams, PageInfo } from '@/types';
import { useCallback, useState, useMemo, useRef } from 'react';

function getHistoricAppointments({
  token,
  params
}: {
  token: string;
  params: FetchAppointmentParams
}) {
  const appHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
  let searchParams = new URLSearchParams({ size: params.size.toString() });
  if (params && (params as any).after) {
    searchParams = new URLSearchParams({ size: params.size.toString(), after: (params as any).after })
  }

  return fetch('/appointments?' + searchParams, {
    headers: appHeaders,
  }).then((data) => data.json());
}

function useHistoricAppointments({ token }: { token: string }) {

  const historicData = useRef<Array<Connection<AppointmentDto>>>([]);
  const [currentPage, setCurrentPage] = useState<PageInfo | null>(null);
  const [navigation, setNavigation] = useState<PageInfo[]>([]);
  const currentPageIndex = useMemo(() => {
    return navigation.findIndex((el) => el.nextCursor === currentPage?.nextCursor && el.previousCursor === currentPage?.previousCursor)
  }, [navigation, currentPage]);

  const currentData: Connection<AppointmentDto>['edges'] | null = useMemo(() => {
    if (currentPageIndex>-1) {
      return historicData.current? historicData.current[currentPageIndex]?.edges : null;
    }
    return null;
  }, [currentPageIndex, historicData]);

  function fetchAppointments(params: FetchAppointmentParams) {
    return getHistoricAppointments({ token, params }).then((data: Connection<AppointmentDto>) => {
      historicData.current.push(data);
      const { pageInfo } = data
      setCurrentPage(pageInfo);
      if (navigation.find((el) => el.nextCursor === pageInfo.nextCursor && el.previousCursor === pageInfo.previousCursor) === undefined) {
        setNavigation((nav) => [...nav, data.pageInfo]);
      }
    });
  
  }

  return {
    fetchAppointments: useCallback(fetchAppointments, [navigation, token]),
    currentPage,
    navigation,
    currentData,
    currentPageIndex,
    setCurrentPage,
  }
}


export default useHistoricAppointments;