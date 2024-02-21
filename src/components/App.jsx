import './App.css'
import DriversTable from './DriversTable/DriversTable'
import Header from './Header/Header'
import React, { useEffect, useState } from 'react';
import { getDrivers } from '../services/drivers';


function App() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getDrivers();
      if (response.status === 200) {
        setRows(response.data);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Header />
      <DriversTable rows={rows} loading={loading} />
    </>
  )
}

export default App
