import { Box, Separator, Serif } from "@artsy/palette"
import {
  ConfirmBidCreateBidderPositionMutation,
  ConfirmBidCreateBidderPositionMutationResponse,
} from "__generated__/ConfirmBidCreateBidderPositionMutation.graphql"
import { routes_ConfirmBidQueryResponse } from "__generated__/routes_ConfirmBidQuery.graphql"
import { BidFormFragmentContainer as BidForm } from "Apps/Auction/Components/BidForm"
import { LotInfoFragmentContainer as LotInfo } from "Apps/Auction/Components/LotInfo"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { FormikActions } from "formik"

import qs from "qs"
import React from "react"
import { Title } from "react-head"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { TrackingProp } from "react-tracking"
import { PayloadError } from "relay-runtime"
import { data as sd } from "sharify"
import { get } from "Utils/get"
import createLogger from "Utils/logger"

const logger = createLogger("Apps/Auction/Routes/ConfirmBid")

interface ConfirmBidProps {
  artwork: routes_ConfirmBidQueryResponse["artwork"]
  me: routes_ConfirmBidQueryResponse["me"]
  relay: RelayProp
  location: Location
  tracking: TrackingProp
}

interface ResultsAndErrors {
  results: ConfirmBidCreateBidderPositionMutationResponse
  errors: PayloadError[]
}

export const ConfirmBidRoute: React.FC<ConfirmBidProps> = props => {
  const { me, artwork, tracking } = props
  const { saleArtwork } = artwork
  const { sale } = saleArtwork
  logger.log({
    me,
    sale,
    artwork,
    saleArtwork,
  })

  const commonProperties = {
    auction_slug: sale.id,
    artwork_slug: artwork.id,
    sale_id: sale._id,
    user_id: me.id,
  }

  function createBidderPosition(maxBidAmountCents: number) {
    return new Promise<ResultsAndErrors>(async (resolve, reject) => {
      commitMutation<ConfirmBidCreateBidderPositionMutation>(
        props.relay.environment,
        {
          onCompleted: (results, errors) => {
            resolve({ results, errors })
          },
          onError: error => {
            reject(error)
          },
          mutation: graphql`
            mutation ConfirmBidCreateBidderPositionMutation(
              $input: BidderPositionInput!
            ) {
              createBidderPosition(input: $input) {
                result {
                  position {
                    id
                  }
                  status
                  message_header
                  message_description_md
                }
              }
            }
          `,
          variables: {
            input: {
              sale_id: sale.id,
              artwork_id: artwork.id,
              max_bid_amount_cents: maxBidAmountCents,
            },
          },
        }
      )
    })
  }

  function handleMutationError(
    actions: FormikActions<object>,
    error: Error,
    bidderId: string
  ) {
    logger.error(error)

    let errorMessages: string[]
    if (Array.isArray(error)) {
      errorMessages = error.map(e => e.message)
    } else if (typeof error === "string") {
      errorMessages = [error]
    } else if (error.message) {
      errorMessages = [error.message]
    }

    trackConfirmBidFailed(bidderId, errorMessages)

    actions.setSubmitting(false)
    actions.setStatus("submissionFailed")
  }

  function trackConfirmBidFailed(bidderId: string, errors: string[]) {
    tracking.trackEvent({
      action_type: Schema.ActionType.ConfirmBidFailed,
      bidder_id: bidderId,
      error_messages: errors,
      ...commonProperties,
    })
  }

  function trackConfirmBidSuccess(positionId: string, bidderId: string) {
    tracking.trackEvent({
      action_type: Schema.ActionType.ConfirmBidSubmitted,
      bidder_position_id: positionId,
      bidder_id: bidderId,
      ...commonProperties,
    })
  }

  async function handleSubmit(
    values: { selectedBid: number },
    actions: FormikActions<object>
  ) {
    const bidderId = sale.registrationStatus.id
    try {
      // TODO:: where to handle/check for these errors
      // are they the same as the !SUCCESS below?
      // other errors like in the catch down below, etc
      // can they all be handled by the same function? Some may require
      // an error message, others a modal, etc.
      const { results, errors } = await createBidderPosition(
        Number(values.selectedBid)
      )

      if (results.createBidderPosition.result.status !== "SUCCESS") {
        trackConfirmBidFailed(bidderId, [
          "ConfirmBidCreateBidderPositionMutation failed",
        ])
      } else {
        const positionId = results.createBidderPosition.result.position.id
        trackConfirmBidSuccess(positionId, bidderId)
        const { isWinning } = await pollBidResult(
          results.createBidderPosition.result.position.id
        )
        if (isWinning) {
          console.log("they are 'winning' ;) ")
          window.location.assign(
            `${sd.APP_URL}/auction/${sale.id}/artwork/${artwork.id}/confirm-bid`
          )
        } else {
          console.log("not winning")
        }
      }
    } catch (error) {
      handleMutationError(actions, error, bidderId)
    }
    actions.setSubmitting(false)
  }

  function pollBidResult(bidderPositionId: string) {
    return new Promise<{ isWinning: boolean }>((resolve, reject) => {
      console.log("TODO: implement polling for the actual result")
      resolve({ isWinning: true })
    })
  }

  return (
    <AppContainer>
      <Title>Auction Registration</Title>
      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="8">Confirm your bid</Serif>
        <Separator />
        <LotInfo artwork={artwork} saleArtwork={artwork.saleArtwork} />
        <Separator />
        <BidForm
          initialSelectedBid={getInitialSelectedBid(props.location)}
          showPricingTransparency={false}
          saleArtwork={saleArtwork}
          onSubmit={handleSubmit}
        />
      </Box>
    </AppContainer>
  )
}

const getInitialSelectedBid = (location: Location): string | undefined => {
  return get(
    qs,
    querystring => querystring.parse(location.search.slice(1)).bid,
    undefined
  )
}

const TrackingWrappedConfirmBidRoute: React.FC<ConfirmBidProps> = props => {
  const Component = track({
    context_page: Schema.PageName.AuctionConfirmBidPage,
  })(ConfirmBidRoute)

  return <Component {...props} />
}

export const ConfirmBidRouteFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(TrackingWrappedConfirmBidRoute),
  {}
)
