import React, { Component } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { Link } from "react-router-dom";

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


export default class BeersList extends Component {
  state = {
    apiBeers: [],
    selection: ["name", "abv"],
    base: "name"
  }

  componentDidMount() {
    axios
      .get(`https://api.punkapi.com/v2/beers`)
      .then(res => {
        console.log(res.data)
        this.sortMyBeers(res.data)
      })
  }

  sortMyBeers = (apiBeers) => {
    this.setState((state) => {
      if ("name" === state.base) {
        state.apiBeers = apiBeers.sort( (a,b) => a.name.localeCompare(b.name))
      } else {
        state.apiBeers = apiBeers.sort( (a,b) => a.abv-b.abv)
      }
      return state
    }) 
  }

  handleSelection = (evt) => {
    const { value } = evt.target;
    this.setState(
      // 1 actualizeaza state
      (state) => {
        state.base = value
        return state
      },
      // 2 dupa ce este actualizat state
      () => {
        this.sortMyBeers(this.state.apiBeers)
      }
    )
  }

  render() {
    const { apiBeers, selection, base } = this.state;
    return (
      <div>
        <h1>PUNK BEERS!</h1>
        <StyledSelectButton>
          <span>Sort by: </span>
            <select
              defaultValue={base}
              onChange={this.handleSelection}
            >
              {selection.map(select =>
                <option 
                  key={select}
                  value={select}>
                  beer {select}
                </option>
              )}
            </select>
        </StyledSelectButton>
        {apiBeers.map((beer) =>
          <StyledBeerItem key={beer.name}>
            <h3>{beer.name}</h3>
            <h4>{beer.abv}</h4>
            <img src={beer.image_url} />
            <div>
              <Link to="/beer-details" onClick={()=>{
                console.log("haha")
                window.localStorage.setItem("beer", JSON.stringify(beer))
              }}>
                More details
              </Link>
            </div>
          </StyledBeerItem>
        )}
      </div>
    )
  }
}
