// pages/index.js
import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer'
import SleepForm from "../components/SleepForm";
import SleepCard from "../components/SleepCard";
import SleepRatingChart from '../components/SleepRatingChart'; 
import { useQuery } from "react-query";
import axios from "axios";
import ReactQueryClient from "../lib/reactQueryClient";

const SleepRecordsPage = () => {
  const {
    data: sleepRecords,
    isLoading,
    isError,
  } = useQuery("sleepRecords", async () => {
    const response = await axios.get("http://localhost:8080/api/sleep-records");
    return response.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  // Create datasets for the scatter plot

  return (
    <div>
     <Header/>

      <SleepForm />
     
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sleepRecords.map((record) => (
            <SleepCard key={record.id} sleepRecord={record} />
          ))}
        </div>
        
        <SleepRatingChart sleepRecords={sleepRecords} />
        
      </div>
      <Footer/>
    </div>
  );
};

export default function Home() {
  return (
    <ReactQueryClient>
      <SleepRecordsPage />
    </ReactQueryClient>
  );
}
