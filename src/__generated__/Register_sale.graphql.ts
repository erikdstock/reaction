/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Register_sale$ref: unique symbol;
export type Register_sale$ref = typeof _Register_sale$ref;
export type Register_sale = {
    readonly id: string;
    readonly _id: string;
    readonly status: string | null;
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
      "name": "_id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "status",
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
(node as any).hash = '6cb810d08c8eb385cdf81e6fa877f372';
export default node;
