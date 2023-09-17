import {  useEffect, useState } from "react";
import Filter from "./Components/Filter/Filter";
import Modal from "./Components/Modal/Modal";

import axios from "axios";

export default function AppNew2() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState("");
  const [rocketNumber, setRocketNumber] = useState('')
  const [rocketName, setRocketName] = useState('')
  const [flight, setFlight] = useState('')
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    
    fetchLaunches(currentPage)
      .then((response) => {
        if (response.status !== 200) {
          console.log("error");
          return Promise.reject(new Error("No data available"));
        }
        console.log(response);
        setData((prev) => [...response.data.docs]);

        return "next then will get this string. Becouse i return this string.";
      })
  
      .catch((error) => {
        setError(error);
      });
  
  
}, []);

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

  const fetchLaunches=(page)=>{
  return axios.post('https://api.spacexdata.com/v5/launches/query',{
    query: {
      
    },
    options: {
      page
    },
  })
}

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
  console.log(data);
  





 

 
  const handleAddPage = (page) => {
 
    fetchLaunches(page + 1).then(response=>{
      console.log(response);
      setData((prev)=>{
        return [...prev,...response.data.docs]
      })
    })
setCurrentPage(page + 1)
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
  return (
   
    <div className="App">
      {showModal && (
        <Modal onClose={toggleModal}>
          {details ? details : "No details available"}
        </Modal>
      )}
      {/* <Filter /> */}
      <>
      <label>
        Rocket name
        <input
          type="text"
          name="rocketName"
          value={rocketName}
          onChange={handleChangeFIlter}
        />
      </label>
      <label>
        Flight number
        <input
          type="text"
          name="flight"
          value={flight}
          onChange={handleChangeFIlter}
        />
      </label>
      <label>
        Rocket number
        <input
          type="text"
          name="rocketNumber"
          value={rocketNumber}
          onChange={handleChangeFIlter}
        />
      </label>
    </>
      {/* <SearchBar  onSubmit={this.handleFormSubmit}/>
       <Gallery searchName={this.state.name}/> */}
      <ul>
        {data.map((item, index) => {
          return (
            <li key={item.id} onClick={toggleModal}>
              <img
                src={item.links.patch.small}
                alt={item.name}
                onClick={() => handlerDetails(item)}
              />
            </li>
          );
        })}
      </ul>
      <button onClick={()=>handleAddPage(currentPage)}>Load More</button>
    </div>
  );
}
