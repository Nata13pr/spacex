import { Component } from "react";

export default class SearchBar extends Component {
  state = {
    name: "",
  };

  handleChangeName = (e) => {
    this.setState({ name: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.name);
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input onChange={this.handleChangeName} />
        </form>
      </header>
    );
  }
}
