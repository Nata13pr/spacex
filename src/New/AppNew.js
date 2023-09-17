import { useEffect, useState } from "react";
import Filter from "../Components/Filter/Filter";
import Modal from "../Components/Modal/Modal";
import useLocalStorage from "../hooks/useLocalStorage";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState("");
  const [mission, setMission] = useLocalStorage("mission", "");
  const [rocket, setRocket] = useLocalStorage("rocket", "");
  const [flight, setFlight] = useLocalStorage("flight", "");
  const [page, setPage] = useState("");

  useEffect(() => {
    window.localStorage.setItem("mission", JSON.stringify(mission));
  }, [mission]);

  useEffect(() => {
    window.localStorage.setItem("rocket", JSON.stringify(rocket));
  }, [rocket]);

  useEffect(() => {
    window.localStorage.setItem("flight", JSON.stringify(flight));
  }, [flight]);
  useEffect(() => {
    // fetchLaunches();
    const fetchLaunches = () => {
      fetch("https://api.spacexdata.com/v3/launches")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error("No data available"));
        })
        .then((data) => {
          console.log(data);
          setData((prevState) => [...data]);
        })
        .catch((error) => {
          setError(error);
        });
    };
    fetchLaunches();
  }, []);

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
    const normalizedFilter = filter.toLowerCase();
    return data.filter((item) =>
      item.rocket.rocket_name.toLowerCase().includes(normalizedFilter)
    );
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
      <Filter
        names={["rocket", "mission", "flight"]}
        value={filter}
        onChange={changeFilter}
      />
      {/* <SearchBar  onSubmit={this.handleFormSubmit}/>
       <Gallery searchName={this.state.name}/> */}
      <ul>
        {getVisibleData().map((item, index) => {
          return (
            <li key={item.launch_date_unix + index} onClick={toggleModal}>
              <img
                src={item.links.mission_patch_small}
                alt={item.mission_name}
                onClick={() => handlerDetails(item)}
              />
            </li>
          );
        })}
      </ul>
      <button onClick={() => setPage((page) => page + 1)}>Load More</button>
    </div>
  );
}
