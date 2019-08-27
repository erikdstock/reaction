import { redirects_me } from "__generated__/redirects_me.graphql"
import { redirects_sale } from "__generated__/redirects_sale.graphql"
import { Register_me } from "__generated__/Register_me.graphql"
import { Register_sale } from "__generated__/Register_sale.graphql"

export interface RegisterQueryResponse {
  sale: redirects_sale
  me: redirects_me
}

export const RegisterQueryResponseFixture: RegisterQueryResponse = {
  sale: {
    " $refType": undefined,
    is_auction: true,
    id: "an-example-auction-sale",
    is_registration_closed: false,
    is_open: true,
    is_preview: false,
    registrationStatus: null,
  },
  me: {
    " $refType": undefined,
    has_qualified_credit_cards: false,
  },
}

export const RegisterAppResponseFixture: {
  sale: Register_sale
  me: Register_me
} = {
  sale: {
    status: "open",
    id: "whatever-slug",
    _id: "abcde",
    " $refType": undefined,
  },
  me: {
    id: "1",
    " $refType": undefined,
  },
}
