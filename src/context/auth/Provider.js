import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import authContext from "./context";

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState("");
  const [rocketNumber, setRocketNumber] = useState('')
  const [rocketName, setRocketName] = useState('')
  const [flight, setFlight] = useState('')
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    const getVisibleData = () => {
   
      return data.filter(
        (item) =>
          item.name.toLowerCase().includes(rocketName.toLowerCase().trim()) || data
          .filter(
            (item) =>
              item.name.toLowerCase().includes(rocketName.toLowerCase().trim())) || data
              .filter(
                (item) => item.flight_number === Number(flight.toLowerCase().trim()) || data
              )
          );
  
    };
    setData(getVisibleData());
  }, [rocketName, flight, rocketNumber]);

  const rocketNameVisible = () => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(rocketName.toLowerCase().trim()) 
    );
  };

  const flightVisible = () => {
    return data.filter(
      (item) => item.flight_number === Number(flight.toLowerCase().trim()) 
    );
  };

  const rocketNumberVisible = () => {
    return (
      data.filter((item) =>
        item.rocket.toLowerCase().includes(rocketNumber.toLowerCase().trim())
      ) 
    );
  };
  
  



const fetchLaunches=()=>{
  return axios.post('https://api.spacexdata.com/v5/launches/query',{
    query: {
      
    },
    options: {
      page
    },
  })
}

  useEffect(() => {
    
      fetchLaunches()
        .then((response) => {
          if (response.status !== 200) {
            console.log("error");
            return Promise.reject(new Error("No data available"));
          }
          console.log(response);
          setData((prev) => [...prev, ...response.data.docs]);

          return "next then will get this string. Becouse i return this string.";
        })
    
        .catch((error) => {
          setError(error);
        });
    
    
  }, []);

 
  const handleAddPage = (page) => {
    setPage((page) => page + 1);
    fetchLaunches().then(response=>{
      setData((prev)=>{
        return [...prev,...response.data.docs]
      })
    })

  };

  const handleChangeFIlter = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "rocketNumber":
        setRocketNumber(value);
        break;

      case "rocketName":
        setRocketName(value);
        break;

      case "flight":
        setFlight(value);
        break;

      default:
        return;
    }
  };

  

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const handlerDetails = (e) => {
    setDetails(e.details);
  };

  const providerValue = useMemo(() => {
    return {
      data,
      error,
      filter,
      showModal,
      details,
      rocketNumber,
      rocketName,
      flight,
      handleChangeFIlter,
      toggleModal,
      changeFilter,
      // getVisibleData,
      handlerDetails,
      handleAddPage,
      page,
    };
  }, [
    data,
    error,
    filter,
    showModal,
    details,
    rocketNumber,
    rocketName,
    flight,
    page,
    // getVisibleData,
    handleChangeFIlter,
  ]);

  return (
    <authContext.Provider value={providerValue}>
      {children}
    </authContext.Provider>
  );
}
