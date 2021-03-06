import { FilterState } from "Apps/Collect/FilterState"
import React from "react"
import { graphql } from "react-relay"
import { Provider } from "unstated"
import { CollectAppFragmentContainer as CollectApp } from "./CollectApp"

export const routes = [
  {
    path: "/collect2/:medium?",
    Component: CollectApp,
    query: graphql`
      query routes_CollectAppQuery(
        $medium: String
        $major_periods: [String]
        $partner_id: ID
        $for_sale: Boolean
        $sort: String
        $at_auction: Boolean
        $ecommerce: Boolean
        $inquireable_only: Boolean
        $price_range: String
      ) {
        viewer {
          ...CollectApp_viewer
            @arguments(
              medium: $medium
              major_periods: $major_periods
              partner_id: $partner_id
              for_sale: $for_sale
              sort: $sort
              at_auction: $at_auction
              ecommerce: $ecommerce
              inquireable_only: $inquireable_only
              price_range: $price_range
            )
        }
      }
    `,
    render: ({ props, Component }) => {
      if (!props) {
        return null
      }

      const { __fragments, __id, ...remainingProps } = props
      return (
        <Provider
          inject={[
            new FilterState({ ...props.params, ...props.location.query }),
          ]}
        >
          <Component {...remainingProps} query={{ __id, __fragments }} />
        </Provider>
      )
    },
    prepareVariables: (params, props) => {
      const initialFilterState = props.location ? props.location.query : {}
      if (params.medium) {
        initialFilterState.medium = params.medium
        if (props.location.query) {
          props.location.query.medium = params.medium
        }
      }
      return { ...initialFilterState, ...params }
    },
  },
]
