import { storiesOf } from "@storybook/react"
import * as React from "react"

import LotStatus from "../lotStatus"

storiesOf("Auctions/Lot Status", module).add("Default", () => {

  // see reaction/src/components/__stories__/ArtworkGrid.story.tsx
  return (
    <LotStatus />
  )
})