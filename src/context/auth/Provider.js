import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import authContext from './context'

export default function Provider ({children}){
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [details, setDetails] = useState("");
    const [mission, setMission] = useLocalStorage('mission','')
    const [rocket, setRocket] = useLocalStorage('rocket','')
    const [flight, setFlight] = useLocalStorage('flight','');
    const [page,setPage]=useState(1);
  
  useEffect (()=>{
      window.localStorage.setItem('mission',JSON.stringify(mission))
  },[mission]);
  
  useEffect(()=>{
      window.localStorage.setItem('rocket',JSON.stringify(rocket));
  },[rocket])
  
  
  useEffect(()=>{
      window.localStorage.setItem('flight',JSON.stringify(flight))
  },[flight])
    useEffect(() => {
      // fetchLaunches();
      const fetchLaunches = () => {
        fetch(`https://api.spacexdata.com/v3/launches?page=${page}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(new Error("No data available"));
          })
          .then((data) => {
            console.log(data);
            setData(prev=>[...prev,...data]);
          })
          .catch((error) => {
            setError(error);
          });
      };
      fetchLaunches();
    }, []);
  
const handleAddPage=()=>{
    setPage(page=>page+1)
}

    const handleChangeFIlter = (event) => {
      const { name, value } = event.target;
  
      switch (name) {
        case "mission":
          setMission(value);
          break;
  
        case "rocket":
          setRocket(value);
          break;
  
        case "flight":
          setFlight(value);
          break;
  
        default:
          return;
      }
    };
  
    // const fetchLaunches = () => {
    //   fetch("https://api.spacexdata.com/v3/launches")
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //       }
    //       return Promise.reject(new Error("No data available"));
    //     })
    //     .then((data) => {
    //       console.log(data);
    //       setData((prevState) => [...data]);
    //     })
    //     .catch((error) => {
    //       setError(error);
    //     });
    // };
  
    const toggleModal = () => {
      setShowModal((prevState) => !prevState);
    };
  
    const changeFilter = (e) => {
      setFilter(e.currentTarget.value);
    };
  
    const getVisibleData = () => {
      const normalizedFilter = filter.toLowerCase().trim();
      return data.filter((item) =>
        item.rocket.rocket_name.toLowerCase().includes(normalizedFilter)
      );
    };
  
    const handlerDetails = (e) => {
      setDetails(e.details);
    };

    const providerValue=useMemo(()=>{
        return{data,error,filter,showModal,details,mission,rocket,flight,handleChangeFIlter,toggleModal,changeFilter,getVisibleData,handlerDetails,handleAddPage}
    },[data,error,filter,showModal,details,mission,rocket,flight,getVisibleData,handleChangeFIlter])

    return(
        <authContext.Provider value={providerValue}>
            {children}
        </authContext.Provider>
    )
}