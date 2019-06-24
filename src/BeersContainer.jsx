import React, { Component } from 'react';
import styled from "styled-components";
import axios from 'axios';


const StyledBeerItem = styled.div`
  img {
    max-width: 160px;
  }
`;

const StyledSelectButton = styled.div`
  span {
    color:red
  }
`;


export default class BeersContainer extends Component {
  state = {
    apiBeers: [],
    selection: ["Beer name", "Beer abv"],
    base: ""
  }

  componentDidMount = () => {
    axios 
      .get(`https://api.punkapi.com/v2/beers`)
      .then( res => {
        console.log(res)
        this.setState({ 
          apiBeers: res.data,
        })
      })
  }

handleSelection = evt => {
  console.log(evt)
  const { value } = evt.target;
  this.setState ({ base: value })
}

  render() {
    const { apiBeers, selection, handleSelection } = this.state;
    return (
      <div>
        <StyledSelectButton>
          <span>Select criteria</span>
          <select  
            value={selection}
            onChange={handleSelection}
          >
            {selection.map(select => 
              <option key={select} value={select}>
                {select}
              </option>
              )}
          </select>
        </StyledSelectButton>
        {apiBeers.map( (beer) => 
          <StyledBeerItem >
            <h3>{beer.name}</h3>
            <h4>{beer.abv}</h4>
            <img src={ beer.image_url }/>
          </StyledBeerItem>
        )}
      </div>
    )
  }
}
