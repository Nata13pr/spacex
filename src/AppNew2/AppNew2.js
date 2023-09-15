import { useContext, useEffect, useState } from "react";
import Filter from "../Components/Filter/Filter";
import Modal from "../Components/Modal/Modal";
import useLocalStorage from "../hooks/useLocalStorage";
import authContext from '../context/auth/context.js'

export default function AppNew2() {
const {handleAddPage,showModal,toggleModal,details,filter,changeFilter,getVisibleData,handlerDetails}=useContext(authContext)
console.log(getVisibleData());
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
      <button 
      onClick={()=>handleAddPage()}
      >Load More</button>
    </div>
  );
}
