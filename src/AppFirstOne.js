import "./App.css";
import { Component } from "react";
import SearchBar from "./Components/SearchBar/SearchBar";
import Gallery from "./Components/Gallery/Gallery";
import Modal from "./Components/Modal/Modal";
import Filter from "./Components/Filter/Filter";


class App extends Component {
  state = {
  
    data: [],
    error: null,
    filter: "",
    showModal: false,
    details:'',
    
  };

  componentDidMount() {
    // const data = localStorage.getItem("data");
    // const parsedData = JSON.parse(data);

    // if (parsedData) {
    //   this.setState({ data: parsedData });
    // }

    fetch("https://api.spacexdata.com/v3/launches")
      .then((response) => {
        if (response.ok) {
         
          return response.json();
        }
        return Promise.reject(new Error("No data available"));
      })
      .then((data) => {
        console.log(data);
        this.setState((prevState) => {
          return {
            ...prevState,
            data: [...data],
          };
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.data !== prevState.data) {
  //     localStorage.setItem("data", JSON.stringify(this.state.data));
  //   }

  //   if (
  //     this.state.data.length > prevState.data.length &&
  //     prevState.data.length !== 0
  //   ) {
  //     this.toggleModal();
  //   }
  // }
      
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = (name) => {
    this.setState({ name });
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleData=()=>{
    const {filter,data}=this.state;

    const normalizedFilter=filter.toLowerCase();

    return data.filter(item=>
      item.rocket.rocket_name.toLowerCase().includes(normalizedFilter))
  }


  handlerDetails=(e)=>{
    this.setState({details:e.details})
  }

  render() {
    const visibleData=this.getVisibleData();
    console.log(visibleData);
    return (
      <div className="App">
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
         {this.state.details ? this.state.details : 'No details available'}
          </Modal>
        )}
        <Filter names={['Rocket name','Mission name','Flight number']} value={this.state.filter} onChange={this.changeFilter} />
   
        <ul>
          {visibleData.map((item, index) => (
            <li key={item.launch_date_unix+index} onClick={this.toggleModal}>
              <img
                src={item.links.mission_patch_small}
                alt={item.mission_name}
                onClick={()=>this.handlerDetails(item)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
