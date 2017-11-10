import PropTypes from "prop-types"
import React from "react"
import Relay from "react-relay"
import styled from "styled-components"
import colors from "../../assets/colors"
import * as fonts from "../../assets/fonts"

const NarrowContainer = styled.div`
  min-width: 260px
`

export interface LotStatusListProps extends React.HTMLProps<ArtworkMetadata> {
  artwork: any
  extended?: boolean
}

export const LotStatusList = <div />

const StyledLotStatusList = styled(LotStatusList)

export default Relay.createContainer(StyledLotStatusList)