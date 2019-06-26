import React from 'react';
import { Link } from "react-router-dom"


class BeerDetails extends React.Component {
  render() {
    const beer = JSON.parse(window.localStorage.getItem("beer"))
    return (
      <div>
        <Link to="/">
          <span>back</span>
        </Link>
        <h1>Beers details</h1>
        <pre>
          {JSON.stringify(beer,null,2)}
        </pre>
      </div>
    )
  }
}
export default BeerDetails