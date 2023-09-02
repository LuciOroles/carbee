import serverSideProps from '@/lib/getPageProps';
import { HomePageProps } from '../types';

export default function Home(props: HomePageProps) {
  
  return (
    <div>Token {props.data.token} </div>
  )
}


export const getServerSideProps = serverSideProps;