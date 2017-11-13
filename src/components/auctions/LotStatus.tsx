import { get } from 'lodash'
import PropTypes from "prop-types"
import React from "react"
import Relay from "react-relay"
import styled from "styled-components"
import colors from "../../Assets/Colors"
import * as fonts from "../../Assets/Fonts"

import Buttons from '../Buttons'
const { Button, InvertedButton } = Buttons

// const NarrowContainer = styled.div`
//   min-width: 260px
// `

// Example lot standings query lot_standings{
//   is_highest_bidder
//   is_leading_bidder
//   sale {
//     name
//     id
//   }
//   sale_artwork{
//     artwork {
//       title
//     }
//   }
// }

const LotStandingStatus: React.SFC<LotStandingProps> = (props) => {
  return <div>{ props.isHighestBidder ? 'Winner' : 'Loser'}</div>
}

export interface LotStandingProps extends React.HTMLProps<any> {
  isLeadingBidder: boolean
  isHighestBidder: boolean // accounts for reserve
  reserveStatus: string
}

export interface LotStatusProps extends React.HTMLProps<LotStatus> {
  title: string
  href: string
  artistName: string
  lotLabel: string
  displaySellingPrice: string
  displayHighBidAmount: string
  imgRef?: string
  lotStanding?: LotStandingProps
}


const LotStatusContainer = styled.div`
  display: flex;
  width: 100%;
  height: 92px;
  border: 1px solid ${colors.grayMedium};
  text-decoration: none;
`

const Image = styled.img`
  flex: none;
  width: 60px;
  height: 60px;
  margin: 16px 12px 16px 16px;
`

const LotInfo = props =>
  <div>{props.title}, {props.artistName} </div>

const StyledLotInfo = styled(LotInfo)`
  display: flex;
  flex-direction: column;
`

const RightMatter = props => {
  const {lotStanding, href} = props
  let BidButton = Button
  if (get(lotStanding, 'isLeadingBidder') === false) {
    BidButton = InvertedButton
  }
  
  // const CTA = props.bid ? <Button>With Bid!</Button> : <InvertedButton >No Bid </ InvertedButton>
  return (
    <div>
      <div>{ lotStanding && 'bid' || 'nobid'}</div>
      <BidButton {...{href}}>Bid</BidButton>
    </div>
  )
}

const StyledRightMatter = styled(RightMatter)`
  display: flex;
  flex-direction: column;
`

// Should this be an anchor
export class LotStatus extends React.Component<LotStatusProps, null> {
  render() {
    const { imgRef, href, lotStanding, ...infoProps } = this.props
    return (
      <LotStatusContainer href={href} >
        <Image src={imgRef} />
        <StyledLotInfo {...infoProps} />
        <StyledRightMatter {...{href, lotStanding}} />
      </LotStatusContainer>
    )
  }
}

const StyledLotStatus = styled(LotStatus)``

export default LotStatus
// export default Relay.createContainer(StyledLotStatus)