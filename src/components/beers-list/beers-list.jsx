import React, { Component } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { Link } from "react-router-dom";

const StyledBeerItem = styled.div`
  padding-left: 10px;
  margin-bottom: 10px;
`;

const StyledSelectButton = styled.div`
  position: absolute;
  top: 50px;
  right: 5px;
  font-style: italic;
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
      // 1 update state
      (state) => {
        state.base = value
        return state
      },
      // 2 after state has been updated
      () => {
        this.sortMyBeers(this.state.apiBeers)
      }
    )
  }

  render() {
    const { apiBeers, selection, base } = this.state;
    return (
      <div style={{position: "relative"}}>
        <h1 className="title">PUNK BEERS!</h1>
        <StyledSelectButton>
          <span>Sort by: </span>
            <select
              defaultValue={base}
              onChange={this.handleSelection}
              style={{ border:"0.8px solid grey", borderRadius: "4px", padding: "2.5px"}}
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
        <div className="grid-template">
          {apiBeers.map((beer) =>
            <StyledBeerItem key={beer.name}>
              <h3 style={{ margin: "10px 0 0 0"}}>{beer.name}</h3>
              <h5 style={{ fontStyle: "oblique", margin: "5px 0"}}>ABV: {beer.abv}</h5>
                <img src={beer.image_url} />
                <div >
                <Link className="more-details"  to="/beer-details" onClick={()=>{
                    window.localStorage.setItem("beer", JSON.stringify(beer))
                  }}>
                    More details
                  </Link>
                </div>
            </StyledBeerItem>
          )}
        </div>
      </div>
    )
  }
}
