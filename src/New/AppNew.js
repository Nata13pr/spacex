export default function  App (){
    return(
        <div className="App">
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
         {this.state.details ? this.state.details : 'No details available'}
          </Modal>
        )}
        <Filter names={['Rocket name','Mission name','Flight number']} value={this.state.filter} onChange={this.changeFilter} />
        {/* <SearchBar  onSubmit={this.handleFormSubmit}/>
       <Gallery searchName={this.state.name}/> */}
        <ul>
          {visibleData.map((item, index) => (
            <li key={item.launch_date_unix + index} onClick={this.toggleModal}>
              <img
                src={item.links.mission_patch_small}
                alt={item.mission_name}
                onClick={()=>this.handlerDetails(item)}
              />
            </li>
          ))}
        </ul>
        </div>
    )
}