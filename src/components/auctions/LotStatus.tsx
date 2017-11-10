import PropTypes from "prop-types"
import React from "react"
import Relay from "react-relay"
import styled from "styled-components"
import colors from "../../assets/colors"
import * as fonts from "../../assets/fonts"

// const NarrowContainer = styled.div`
//   min-width: 260px
// `

export interface LotStatusProps extends React.HTMLProps<LotStatus> {
  title: string
  href: string
  artistName: string
  lotLabel: string
  displaySellingPrice: string
  displayHighBidAmount: string
  imgRef?: string
  bid?: object
}


const LotStatusAnchor = styled.a`
  display: flex;
  width: 100%;
  height: 77px;
  border: 1px solid ${colors.grayMedium}
`

const Image = styled.img`
  flex: none
  width: 60px;
  height: 60px;
`

export class LotStatus extends React.Component<LotStatusProps, null> {
  render() {
    return (
      <LotStatusAnchor href={this.props.href} >
        <Image  />
      </LotStatusAnchor>
    )
  }
}

const StyledLotStatus = styled(LotStatus)``

export default Relay.createContainer(StyledLotStatus)