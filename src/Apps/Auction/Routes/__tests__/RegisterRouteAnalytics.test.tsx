// Begun from example in Register_analytics.test.tsx
import { RegisterAppResponseFixture } from "Apps/__tests__/Fixtures/Auction/Routes/Register"
import { mockTracking } from "Artsy/Analytics"
import { createMockNetworkLayer2 } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { Environment, RecordSource, Store } from "relay-runtime"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import { RegisterRoute } from "../Register"

jest.unmock("react-tracking")

jest.mock("react-stripe-elements", () => ({
  Elements: ({ children }) => children,
  StripeProvider: ({ children }) => children,
  CardElement: () => null,
  injectStripe: x => x,
}))

const { Component: TrackedRegisterRoute, dispatch: mockTrack } = mockTracking(
  RegisterRoute
)

const network = createMockNetworkLayer2({ mockData: {} })
const source = new RecordSource()
const store = new Store(source)
const environment = new Environment({ network, store })

const relay = { environment }
const defaultProps = { ...RegisterAppResponseFixture, relay }

describe("Auction Registration Analytics ", () => {
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}

    window.sd = { STRIPE_PUBLISHABLE_KEY: "" }
  })

  const mountRoute = (propOverrides = {}) => {
    const props = { ...defaultProps, ...propOverrides }
    return mount(<TrackedRegisterRoute {...props as any} />)
  }
  it("tracks form submission failure", async () => {
    const wrapper = mountRoute()

    await wrapper
      .find("form")
      .first()
      .simulate("submit")
    await flushPromiseQueue()

    expect(mockTrack).toHaveBeenCalledWith({
      auction_slug: "whatever-slug",
      auction_state: "open",
      error_messages: [
        "Name is required",
        "Address is required",
        "Country is required",
        "City is required",
        "State is required",
        "Postal code is required",
        "Telephone is required",
        "You must agree to the Conditions of Sale",
      ],
      event: "Registration failed to submit",
      sale_id: "abcde",
      user_id: "1",
    })
  })
  it("tracks form submission success", async () => {
    const wrapper = mountRoute()

    await wrapper
      .find("form")
      .first()
      .simulate("submit")

    await flushPromiseQueue()

    expect(mockTrack).toHaveBeenCalledWith({
      auction_slug: "whatever-slug",
      auction_state: "open",

      event: "Registration success!!!!!!",
      sale_id: "abcde",
      user_id: "1",
    })
  })
})
