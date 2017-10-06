import { storiesOf } from "@storybook/react"
import * as React from "react"

import MyActiveBids from "../my_active_bids"

storiesOf("Components/Auctions/My Active Bids", module).add("Default", () => {
  return (
    <div>
      <MyActiveBids />
    </div>
  )
})
