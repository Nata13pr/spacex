import { Component } from "react";

class OurCoffee extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        data: [
          { name: "AROMISTICO Coffee 1 kg", country: "Brazil", price: 6.99 },
          { name: "AROMISTICO Coffee 1 kg", country: "Kenya", price: 6.99 },
          { name: "AROMISTICO Coffee 1 kg", country: "Columbia", price: 6.99 }
        ],
        term: ""
      };
    }
  
    commitInputChanges = (e) => {
      this.setState({ term: e.target.value });
    };
  
    render() {
      const { data, term } = this.state;
  
      return (
        <div>
          <div className="filter">
            <div className="filter_first">
              <h2>Looking for</h2>
              <input
                type="text"
                placeholder="start typing here"
                onChange={this.commitInputChanges}
              />
            </div>
          </div>
          {data
            .filter((item) =>
              item.country.toLowerCase().includes(term.toLowerCase())
            )
            .map((item) => (
              <div key={item.country} className="product">
                <img src={"coffee"} alt="" />
                <h2 className="item_name">{item.name}</h2>
                <h2 className="item_from">{item.country}</h2>
                <h2 className="item_price">{item.price}</h2>
              </div>
            ))}
        </div>
      );
    }
  }
  
  export default OurCoffee;