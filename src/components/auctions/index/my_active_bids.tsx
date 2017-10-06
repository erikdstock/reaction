import * as React from "react"
// import styled from "styled-components"
import metaphysics from "../../../utils/metaphysics"

// const Image = styled.img`
//   width: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
// `

interface State {
  lot_standings?: any
}

export default class MyActiveBids extends React.Component<null, State> {
  componentDidMount() {
    const query = `{
      me {
        bidder_positions {
          id
        }
      }
    }`
    metaphysics<any>(query).then(data => {
      // console.log(data)
    })
  }
  render() {
    return <div>My Active Bids</div>
  }
}
