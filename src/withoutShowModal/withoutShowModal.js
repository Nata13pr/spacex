import { useContext, useEffect, useState } from "react";
import Filter from "../Components/Filter/Filter";
import Modal from "../Components/Modal/Modal";
import useLocalStorage from "../hooks/useLocalStorage";
import authContext from '../context/auth/context.js'

export default function AppNew2() {
const {selectImage,selectedImage,showModal,toggleModal,details,filter,changeFilter,getVisibleData,handlerDetails}=useContext(authContext)
  
return (
    <div className="App">
      {selectedImage ?(
        <Modal onClose={toggleModal}>
          {selectedImage ?? "No details available"}
        </Modal>
      ):<h2>"No details available"</h2>}
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
            <li key={item.launch_date_unix + index} onClick={()=>selectImage(item)}>
              <img
                src={item.links.mission_patch_small}
                alt={item.mission_name}
                // onClick={() => handlerDetails(item)}
              />
            </li>
          );
        })}
      </ul>
      <button 
      // onClick={()=>setPage(page=>page+1)}
      >Load More</button>
    </div>
  );
}
