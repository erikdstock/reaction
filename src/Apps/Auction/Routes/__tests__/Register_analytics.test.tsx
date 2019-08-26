// Begun from example in Register_analytics.test.tsx
import {
  RegisterAppResponseFixture,
  RegisterQueryResponseFixture,
} from "Apps/__tests__/Fixtures/Auction/Routes/Register"
import { mockTracking } from "Artsy/Analytics"
import { createMockNetworkLayer2 } from "DevTools"
import { createTestEnv } from "DevTools/createTestEnv"
import { expectOne, RootTestPage } from "DevTools/RootTestPage"
// import { MockBoot } from "DevTools"
import { mount } from "enzyme"
// import { RegistrationFormProps } from "Apps/Auction/Components/RegistrationForm"
// import { SystemContextProvider } from "Artsy"
import React from "react"
import { graphql } from "react-relay"
import { Environment, RecordSource, Store } from "relay-runtime"
import { RegisterFragmentContainer, RegisterRoute } from "../Register"

jest.unmock("react-tracking")
jest.unmock("react-relay")

jest.mock("react-stripe-elements", () => ({
  Elements: ({ children }) => children,
  StripeProvider: ({ children }) => children,
  CardElement: () => jest.fn(),
  injectStripe: () => jest.fn(),
}))

const defaultProps = { ...RegisterAppResponseFixture, relay: {} }

describe("Auction Registration Analytics ", () => {
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}

    window.sd = { STRIPE_PUBLISHABLE_KEY: "" }
  })
  it("tracks clicking submit", () => {
    const { Component, dispatch } = mockTracking(RegisterRoute)

    const network = createMockNetworkLayer2({ mockData: {} })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    const relay = { environment }

    const wrapper = mount(<Component {...{ ...defaultProps, relay }} />)
  })
})
