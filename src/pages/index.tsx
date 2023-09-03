import serverSideProps from "@/lib/getPageProps";
import { HomePageProps, AppointmentList } from "../types";
import { DateSelector } from "@/ui/DateSelector";
import { useCallback, useState } from "react";
import Appointments from "@/ui/Appointments";
import style from '../styles/form.module.css'

function getAppointmentTimeAvailability({
  token,
  formattedDate,
}: {
  token: string;
  formattedDate: string;
}) {
  const appHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  return fetch(`/availability/${formattedDate}`, {
    headers: appHeaders,
  }).then((data) => data.json());
}

export default function Home(props: HomePageProps) {
  const { token } = props.data;
  const [appointments, setAppointments] = useState<AppointmentList>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onDateChange = useCallback(async (formattedDate: string) => {
    console.log(formattedDate);
    if (formattedDate.length === 10) {
      try {
        setLoading(true);
        let app = await getAppointmentTimeAvailability({ token, formattedDate })
        setAppointments(app);
        debugger;
      } catch (error) {
        setAppointments([]);
        alert(`Not able to get appointments`);
      }
      finally {
        setLoading(false)
      }
    }
  },[token]);

  return (
    <div>
      <h3>Hello</h3>
      <div>Pick a date to get appointment list: </div>
      {loading && (<div>loading....</div>)}
      <div className={style.calendarSection}>
        <div>
          <DateSelector onDateChange={onDateChange} />
        </div>
        <div>
          {appointments.length > 0 && (
           <Appointments appointments={appointments} />
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = serverSideProps;
