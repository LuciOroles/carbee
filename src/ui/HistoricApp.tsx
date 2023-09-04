import React, { useEffect, useState } from "react";
import { AppointmentEdges } from "./AppointmentEdges";
import useHistoricAppointments from "./useHistoricAppointments";
import style from "../styles/form.module.css";
import { AppointmentDto } from "@/types";
import { AppDetails } from "./AppDetails";
interface IHistoricAppointmentsProps {
  token: string;
}

export const HistoricAppointments: React.FC<IHistoricAppointmentsProps> = ({
  token,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedDto, setSelectedDto] = useState<AppointmentDto | null>(null);
  const {
    currentPageIndex,
    currentData,
    currentPage,
    fetchAppointments,
    navigation,
    setCurrentPage,
  } = useHistoricAppointments({
    token,
  });

  useEffect(() => {
    setLoading(true);

    fetchAppointments({ size: 20 })
      .catch((err) => {
        alert(`not able to read historical`);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  const onNextClick = () => {
    setSelectedDto(null);
    setLoading(true);
    const lastNavItem = navigation[navigation.length - 1];
    if (lastNavItem.hasNextPage && currentPageIndex === navigation.length - 1) {
      fetchAppointments({
        size: 20,
        after: lastNavItem.nextCursor,
      })
        .catch((err) => {
          alert(`not able to read historical`);
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    
    } else {
      setCurrentPage(navigation[currentPageIndex + 1]);
    }
    setLoading(false);
  };

  const onPreviousNav = () => {
    setSelectedDto(null);
    if (currentPageIndex > 0) {
      setCurrentPage(navigation[currentPageIndex - 1]);
    }
  };

  return (
    <section>
      <h3>History of appointments:</h3>
      {loading && <div>loading....</div>}
      <div className={style.historyPanel}>
        <div>
          {currentData && (
            <AppointmentEdges
              edges={currentData}
              setSelectedDto={setSelectedDto}
              selectedDto={selectedDto}
            />
          )}
          <div>
            {currentPageIndex > 0 && (
              <button onClick={onPreviousNav}>Prev</button>
            )}
            {navigation &&
              navigation.map((nav, i) => {
                const isCurrentPage =
                  nav.nextCursor === currentPage?.nextCursor &&
                  nav.previousCursor === currentPage.previousCursor;

                return (
                  <span
                    key={i}
                    className={
                      style.navNumber +
                      (isCurrentPage ? ` ${style.navNumberActive}` : "")
                    }
                  >
                    {i + 1}
                  </span>
                );
              })}
            {currentPageIndex <= navigation.length - 1 &&
              currentPage?.hasNextPage && (
                <button onClick={onNextClick}>Next</button>
              )}
          </div>
        </div>
        <div>{selectedDto && <AppDetails dto={selectedDto} />}</div>
      </div>
    </section>
  );
};
