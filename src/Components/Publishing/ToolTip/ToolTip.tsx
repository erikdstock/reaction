import styled from "styled-components"
import React from "react"
import { ArtistToolTip } from "./Artist"
import { GeneToolTip } from "./Gene"
import { ArrowDown, ArrowContainer } from "./Components/ArrowDown"

interface Props {
  entity: object
  model: string
  showTestVariant?: boolean
}

export class ToolTip extends React.Component<Props, null> {
  getToolTip = () => {
    const { entity, model, showTestVariant } = this.props

    switch (model) {
      case "artist": {
        return <ArtistToolTip showTestVariant={showTestVariant} {...entity} />
      }
      case "gene": {
        return <GeneToolTip {...entity} />
      }
      default: {
        return null
      }
    }
  }

  render() {
    return (
      <ToolTipContainer>
        {this.getToolTip()}
        <ArrowDown />
      </ToolTipContainer>
    )
  }
}

export const ToolTipContainer = styled.div`
  position: relative;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  padding: 20px;
  background: white;
  margin-bottom: 15px;
  width: fit-content;
  ${ArrowContainer} {
    bottom: -15px;
    left: calc(50% - 30px);
  }
`
