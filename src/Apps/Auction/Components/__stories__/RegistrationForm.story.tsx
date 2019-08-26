import { track } from "Artsy"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { StripeWrappedRegistrationForm } from "../RegistrationForm"

const TrackedLayout = track()(Section)

storiesOf("Apps/Auction/Components", module).add("RegistrationForm", () => {
  return (
    <TrackedLayout>
      <StripeWrappedRegistrationForm
        onSubmit={(values, actions, token) => {
          window.alert(JSON.stringify({ ...values, token: token.id }, null, 2))
          actions.setSubmitting(false)
        }}
        trackSubmissionErrors={errors =>
          console.warn("Tracking errors: ", errors)
        }
      />
    </TrackedLayout>
  )
})
