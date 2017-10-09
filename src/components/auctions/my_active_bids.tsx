import * as PropTypes from "prop-types"
import * as React from "react"
import styled from "styled-components"
import colors from "../../assets/colors"
import * as fonts from "../../assets/fonts"

const NarrowContainer = styled.div`
  min-width: 260px
  max-width: 400px
`

const Header = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.grayMedium}
  ${fonts.primary.style}
`

interface State {
  lotStandings?: any
}

export default class MyActiveBids extends React.Component<null, State> {
  render() {
    // if (myActiveBids && myActiveBids.length)
    return (
      <NarrowContainer>
        <Header>
          Your Active Bids
        </Header>
        <ul>
          <ActiveBidListItem
            title="Excellence on a Canvas"
            href="#"
            imgRef="https://d32dm0rphc51dk.cloudfront.net/klv9TQbloHqFgYc0F5cIMg/square.jpg"
            artistName="Tony Smerhic"
            lotLabel="Lot 13"
            leading
            lotStatus="reserve_met"
            displaySellingPrice="$1200"
            displayHighBidAmount="$1300"
          />
        </ul>
        {/* myActiveBids.map((activeBid) => <ActiveBid activeBid={activeBid} />) */}
      </NarrowContainer>
    )
  }
}

const ActiveBidListItemContainer = styled.a`
  height: 77px;
  padding: 7px;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px dotted black
`
const Image = styled.img`
  flex: none
  width: 60px;
  height: 60px;
`

interface ActiveBidProps extends React.HTMLProps<HTMLDivElement> {
  title: string
  href: string
  imgRef: string
  artistName: string
  lotLabel: string
  leading: boolean
  lotStatus: string
  displaySellingPrice: string
  displayHighBidAmount: string

  bid?: object
}

const ActiveBidListItem: React.SFC<ActiveBidProps> = props =>
  <li>
    <ActiveBidListItemContainer href={props.href}>
      <Image src={props.imgRef} />
      <LotInfo lotLabel={props.lotLabel} title={props.title} lotStatus={props.lotStatus} />
      <ActiveBidCTA isLeadingBidder reserveStatus="reserve_met" lotStatus="open" />
    </ActiveBidListItemContainer>
  </li>

const LotInfoContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  border: 1px solid red;
`
const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: none;
  height: 100%;
  width: 77px;
  margin-left: auto;
  border: 1px solid green;
`

interface LotInfoProps extends React.HTMLProps<HTMLDivElement> {
  lotLabel: string
  title: string
  lotStatus: string
}

const LotInfo: React.SFC<LotInfoProps> = props => {
  return (
    <LotInfoContainer>
      <div>{props.lotLabel}</div>
      <div>{props.title}</div>
      <div>{props.lotStatus}</div>
    </LotInfoContainer>
  )
}

// align-self: flex-end;

interface CTAProps extends React.HTMLProps<HTMLDivElement> {
  isLeadingBidder: boolean
  reserveStatus: string
  lotStatus: string
}

const ActiveBidCTA: React.SFC<CTAProps> = props => {
  const { isLeadingBidder, reserveStatus, lotStatus } = props
  return (
    <CTAContainer>
      <div>Winning</div>
      <div>Button to click</div>
    </CTAContainer>
  )
}
