import serverSideProps from "@/lib/getPageProps";
import { HomePageProps } from "../types";
import { DateSelector } from "@/ui/DateSelector";

export default function Home(props: HomePageProps) {

  const onDateChange = (formattedDate: string) => {
    console.log(formattedDate);
    if (formattedDate.length==10) {

      fetch(`/availability/${formattedDate}`,{
        headers: {
          'Authorization': `Bearer ${props.data.token}`
        }
      }).then(console.log).catch(console.log);
    }
  }

  return (
    <div>
      <h3>Hello</h3>
      <div>
        <div>Get availability for: </div>
        <DateSelector onDateChange={onDateChange} />

      </div>
    </div>
  );
}

export const getServerSideProps = serverSideProps;
