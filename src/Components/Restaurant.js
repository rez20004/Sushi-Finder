import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
0% {
   opacity: 0;
   
}
100% {
   opacity: 1;
  
}
`;

const RestRating = styled.p`
  float: right;
  display: inline-block;
`;

const RestTitle = styled.p`
  float: left;
  display: inline-block;
  overflow: hidden;
`;

const RestDiv = styled.div`
  width: 100%;
  height: 100%;
  line-height: 60px;
  font-size: 20px;
  padding: 0 8px 0 8px;
  margin-top: 8px;
  color: #34495e;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  &:hover {
    background: rgba(0, 0, 0, 0.02);
    cursor: pointer;
  }
  @media (max-width: 420px) {
    font-size: 16px;
    line-height: 30px;
  }
`;

const ExpandedContent = styled.div`
  &:hover {
    cursor: default;
  }
`;

const RestBox = styled.div`
  display: inline-block;
  width: 100%;
`;

const Address = styled.p`
  font-size: 15px;
  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: false };
  }
  expand = () => {
    this.setState((prevState, props) => {
      return {
        expand: !prevState.expand
      };
    });
  };
  childOnClick = e => {
    e.stopPropagation();
  };
  render() {
    const { location } = this.props;
    return (
      <RestDiv onClick={this.expand}>
        <RestBox>
          <RestTitle> {location.name}</RestTitle>
          <RestRating>
            Price level: {location.price_range} - Rating: {location.user_rating.aggregate_rating}
          </RestRating>
        </RestBox>
        {this.state.expand && (
          <ExpandedContent onClick={this.childOnClick}>
            <a href={location.menu_url}>Menu</a>
            <Address>{location.location.address}</Address>
          </ExpandedContent>
        )}
      </RestDiv>
    );
  }
}

Restaurant.propTypes = {
  location: PropTypes.object
};

export default Restaurant;
