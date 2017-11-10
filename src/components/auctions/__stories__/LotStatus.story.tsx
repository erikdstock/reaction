import { storiesOf } from "@storybook/react"
import * as React from "react"

import * as Artsy from "../../Components/Artsy"
import { artsyNetworkLayer } from "../../Relay/config"
import { LotStatus, LotStatusProps } from "../lotStatus"

// function LotStatusExample(props: LotStatusProps) {
//   Relay.injectNetworkLayer(props.user)
// }

storiesOf("Auctions/Lot Status", module).add("Default", () => {

  // see reaction/src/components/__stories__/ArtworkGrid.story.tsx
  return (
    <div>
      <LotStatus
        title="Big Painting"
        href="artsy.net/art/big-painting"
        artistName="Famous Painter"
        imgRef="https://d32dm0rphc51dk.cloudfront.net/klv9TQbloHqFgYc0F5cIMg/square.jpg"        artistName="Famous Painter"
        lotLabel="108"
        displaySellingPrice="$48,000"
        displayHighBidAmount="$55,000"
      />
    </div>
  )
})