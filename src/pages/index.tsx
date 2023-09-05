import { HomePageProps } from "../types";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Home(props: HomePageProps) {
  
  const router = useRouter ();
  useEffect(() => {
    router.push('/dashboard')
  }, []);

  return (
    <div>
      Hello!
    </div>
  );
}