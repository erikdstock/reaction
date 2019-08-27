/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Register_me$ref } from "./Register_me.graphql";
import { Register_sale$ref } from "./Register_sale.graphql";
import { redirects_me$ref } from "./redirects_me.graphql";
import { redirects_sale$ref } from "./redirects_sale.graphql";
export type routes_RegisterQueryVariables = {
    readonly saleID: string;
};
export type routes_RegisterQueryResponse = {
    readonly sale: ({
        readonly " $fragmentRefs": redirects_sale$ref & Register_sale$ref;
    }) | null;
    readonly me: ({
        readonly " $fragmentRefs": redirects_me$ref & Register_me$ref;
    }) | null;
};
export type routes_RegisterQuery = {
    readonly response: routes_RegisterQueryResponse;
    readonly variables: routes_RegisterQueryVariables;
};



/*
query routes_RegisterQuery(
  $saleID: String!
) {
  sale(id: $saleID) {
    ...redirects_sale
    ...Register_sale
    __id
  }
  me {
    ...redirects_me
    ...Register_me
    __id
  }
}

fragment redirects_sale on Sale {
  id
  is_auction
  is_registration_closed
  is_preview
  is_open
  registrationStatus {
    qualified_for_bidding
    __id
  }
  __id
}

fragment Register_sale on Sale {
  id
  _id
  auction_state: status
  __id
}

fragment redirects_me on Me {
  has_qualified_credit_cards
  __id
}

fragment Register_me on Me {
  id
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "saleID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "saleID",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_RegisterQuery",
  "id": null,
  "text": "query routes_RegisterQuery(\n  $saleID: String!\n) {\n  sale(id: $saleID) {\n    ...redirects_sale\n    ...Register_sale\n    __id\n  }\n  me {\n    ...redirects_me\n    ...Register_me\n    __id\n  }\n}\n\nfragment redirects_sale on Sale {\n  id\n  is_auction\n  is_registration_closed\n  is_preview\n  is_open\n  registrationStatus {\n    qualified_for_bidding\n    __id\n  }\n  __id\n}\n\nfragment Register_sale on Sale {\n  id\n  _id\n  auction_state: status\n  __id\n}\n\nfragment redirects_me on Me {\n  has_qualified_credit_cards\n  __id\n}\n\nfragment Register_me on Me {\n  id\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_RegisterQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": null,
        "args": v1,
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "redirects_sale",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "Register_sale",
            "args": null
          },
          v2
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "redirects_me",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "Register_me",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_RegisterQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": null,
        "args": v1,
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          v3,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_auction",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_registration_closed",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_preview",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_open",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "registrationStatus",
            "storageKey": null,
            "args": null,
            "concreteType": "Bidder",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "qualified_for_bidding",
                "args": null,
                "storageKey": null
              },
              v2
            ]
          },
          v2,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "auction_state",
            "name": "status",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "has_qualified_credit_cards",
            "args": null,
            "storageKey": null
          },
          v2,
          v3
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'ddad0825ab95c130017188b4da275e89';
export default node;
