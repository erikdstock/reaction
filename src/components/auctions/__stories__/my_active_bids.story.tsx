import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"

import MyActiveBids from "../my_active_bids"

storiesOf("Auctions/My Active Bids", module).add("Default", () => {
  const Container = styled.div`
    width: 50%
  `

  return (
    <Container>
      <div>
        <MyActiveBids />
      </div>
    </Container>
  )
})
