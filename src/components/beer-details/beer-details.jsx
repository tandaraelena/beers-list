import React from 'react';
import { Link } from "react-router-dom"


class BeerDetails extends React.Component {
  render() {
    const beer = JSON.parse(window.localStorage.getItem("beer"))
    return (
      <div className="beer-details">
        <Link className="back" to="/">
          <span> {" < "} back</span>
        </Link>
        <h1 className="beer-name">{beer.name}</h1>
        {/* <pre>
          {JSON.stringify(beer,null,2)}
        </pre> */}
        <img src={beer.image_url}/>
        <h2 style={{marginLeft:"20px"}}>ABV: {beer.abv}</h2>
        <p className="tagline">{beer.tagline}</p>
        <p>{beer.description}</p>
      </div>
    )
  }
}
export default BeerDetails