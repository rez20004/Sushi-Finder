import React, { Component } from "react";
import Restaurant from "./Components/Restaurant";
import styled from "styled-components";
import sushi from "./sushi.png";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const RestList = styled.ul`
  width: 80%;
  margin: 0 auto;
  max-width: 800px;
  min-width: 250px;
  padding: 0;
  @media (max-width: 420px) {
    width: 90%;
  }
`;

const SushiImage = styled.img`
  width: 30px;
  filter: opacity(25%);
  @media (max-width: 420px) {
    width: 24px;
  }
`;

const LocationForm = styled.section`
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
`;

const LocationInput = styled.input`
  width: 100%;
  height: 60px;
  background: none;
  border: none;
  border-bottom: 1px solid #34495e;
  outline: none;
  font: 300 28px "Ubuntu", sans-serif;
  padding-top: 20px;
  color: #34495e;
  text-align: center;
  &:focus::-webkit-input-placeholder {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.1s, opacity 0.1s linear;
  }
  @media (max-width: 420px) {
    font-size: 22px;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: [] };
  }
  _handleKeyPress = e => {
    if (e.key === "Enter" && e.target.value.length > 2) {
      const text = e.target.value;
      geocodeByAddress(text)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("Success Yay", { lat, lng });
          const url = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lng}&radius=1000&cuisines=177&sort=real_distance`;

          fetch(url, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "user-key": "d9a165d92fbd3f531f67834ac936aed9",
              "Content-Type": "application/json"
            }
          })
            .then(resp => resp.json()) // Transform the data into json
            .then(data => {
              console.log(data);
              const restaurants = data.restaurants;
              this.setState({ restaurants });
            });
        });
    }
  };
  render() {
    const restaurants = this.state.restaurants.map(function(restaurant, i) {
      let location = restaurant.restaurant;
      return <Restaurant location={location} key={location.id} />;
    });
    return (
      <div className="App">
        <header>
          <h1>
            sushi<span>Finder</span>
          </h1>

          <h2>
            Discover the best <SushiImage src={sushi} /> near you.
          </h2>
        </header>

        <LocationForm>
          <LocationInput
            type="text"
            placeholder="Where are you dining?"
            onKeyPress={this._handleKeyPress}
          />
        </LocationForm>

        <RestList> {restaurants} </RestList>
      </div>
    );
  }
}

export default App;
