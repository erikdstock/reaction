/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Register_sale$ref: unique symbol;
export type Register_sale$ref = typeof _Register_sale$ref;
export type Register_sale = {
    readonly id: string;
    readonly auction_state: string | null;
    readonly " $refType": Register_sale$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Register_sale",
  "type": "Sale",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "auction_state",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '508e1390c3516733867b5a9cf90a6a3f';
export default node;
