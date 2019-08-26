import { Box, Separator, Serif } from "@artsy/palette"
import { FormikActions } from "formik"
import React, { useState } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { TrackingProp } from "react-tracking"
import { data as sd } from "sharify"

import { Register_me } from "__generated__/Register_me.graphql"
import { Register_sale } from "__generated__/Register_sale.graphql"
import { RegisterCreateBidderMutation } from "__generated__/RegisterCreateBidderMutation.graphql"
import { RegisterCreateCreditCardMutation } from "__generated__/RegisterCreateCreditCardMutation.graphql"

import { FormValues } from "Apps/Auction/Components/RegistrationForm"
import { StripeWrappedRegistrationForm } from "Apps/Auction/Components/RegistrationForm"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { ErrorModal } from "Components/Modal/ErrorModal"
import createLogger from "Utils/logger"

const logger = createLogger("Apps/Auction/Routes/Register")

interface RegisterProps {
  sale: Register_sale
  me: Register_me
  relay: RelayProp
  tracking: TrackingProp
}

export const RegisterRoute: React.FC<RegisterProps> = props => {
  const { relay, sale, tracking } = props
  const [showErrorModal, setShowErrorModal] = useState(false)

  function createBidder() {
    return new Promise(async (resolve, reject) => {
      commitMutation<RegisterCreateBidderMutation>(relay.environment, {
        onCompleted: (data, errors) => {
          resolve()
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation RegisterCreateBidderMutation($input: CreateBidderInput!) {
            createBidder(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: {
          input: { sale_id: sale.id },
        },
      })
    })
  }

  function createCreditCard(token) {
    return new Promise(async (resolve, reject) => {
      commitMutation<RegisterCreateCreditCardMutation>(relay.environment, {
        onCompleted: (data, errors) => {
          const {
            createCreditCard: { creditCardOrError },
          } = data

          if (creditCardOrError.creditCardEdge) {
            resolve()
          } else {
            if (errors) {
              reject(errors)
            } else {
              reject(creditCardOrError.mutationError)
            }
          }
        },
        onError: reject,
        mutation: graphql`
          mutation RegisterCreateCreditCardMutation($input: CreditCardInput!) {
            createCreditCard(input: $input) {
              creditCardOrError {
                ... on CreditCardMutationSuccess {
                  creditCardEdge {
                    node {
                      last_digits
                    }
                  }
                }
                ... on CreditCardMutationFailure {
                  mutationError {
                    type
                    message
                    detail
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: { token },
        },
      })
    })
  }

  function onSubmit(
    values: FormValues,
    actions: FormikActions<object>,
    token: stripe.Token
  ) {
    const { setSubmitting } = actions

    createCreditCard(token.id)
      .then(() => {
        createBidder().then(() => {
          setSubmitting(false)

          tracking.trackEvent({ event: "Registration submitted" })

          window.location.href = `${sd.APP_URL}/auction/${
            sale.id
          }/confirm-registration`
        })
      })
      .catch(error => {
        logger.error(error)

        tracking.trackEvent({ event: "Registration failed" })

        setSubmitting(false)
        setShowErrorModal(true)
      })
  }

  return (
    <AppContainer>
      <Box maxWidth={550} px={[2, 0]} mx="auto" my={[1, 0]}>
        <Serif size="10">Register to Bid on Artsy</Serif>
        <Separator mt={1} mb={2} />
        <StripeWrappedRegistrationForm onSubmit={onSubmit} />
      </Box>
      <ErrorModal
        show={showErrorModal}
        onClose={() => {
          setShowErrorModal(false)
        }}
      />
    </AppContainer>
  )
}

const TrackingWrappedRegisterRoute: React.FC<RegisterProps> = props => {
  const Component = track({
    context_page: Schema.PageName.AuctionRegistrationPage,
  })(RegisterRoute)

  return <Component {...props} />
}

export const RegisterFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(TrackingWrappedRegisterRoute),
  {
    sale: graphql`
      fragment Register_sale on Sale {
        id
        auction_state
      }
    `,
    me: graphql`
      fragment Register_me on Me {
        id
      }
    `,
  }
)
