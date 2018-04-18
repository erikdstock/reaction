import yup from "yup"

export interface Inputs<T> {
  fullName: T
  addressLine1: T
  addressLine2: T
  city: T
  state: T
  postalCode: T
  country: T

  nameOnCard: T
  cardNumber: T
  expiration: T
  securityCode: T
  agreeToTerms: T

  sameAsShipping: T

  billingAddress: {
    // TODO: Only validate when sameAsShipping: false
  }
}

export interface InputValues extends Inputs<string | boolean> {}

// NOTE: This is super WIP...
export const validationSchema: Inputs<yup.Schema<any>> = {
  fullName: yup.string().required("Full name is required"),
  addressLine1: yup.string().required("Address is required"),
  addressLine2: yup.string().notRequired(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  postalCode: yup.string().required("Postal code is required"),
  country: yup.string().required("Country"),

  nameOnCard: yup.string().required("Name is required"),
  cardNumber: yup.string().required("Card number is required"),
  expiration: yup.string().required("Exipration is required"),
  securityCode: yup.string().required("Security code is required"),
  agreeToTerms: yup.boolean().required("You must agree to terms"),

  sameAsShipping: yup.boolean(),

  billingAddress: {
    // TODO: Only validate when sameAsShipping: false
  },
}

export const initialValues: InputValues = {
  // ShippingForm.jsx
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",

  // PaymentForm.jsx
  nameOnCard: "",
  cardNumber: "",
  expiration: "",
  securityCode: "",

  sameAsShipping: true,

  billingAddress: {
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },

  // ReviewForm
  agreeToTerms: false,
}

// export const formikConfiguration = {
//   mapPropsToValues: () => ({
//     // ShippingForm.jsx
//     fullName: "",
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",

//     // PaymentForm.jsx
//     nameOnCard: "",
//     cardNumber: "",
//     expiration: "",
//     securityCode: "",

//     sameAsShipping: true,

//     billingAddress: {
//       fullName: "",
//       addressLine1: "",
//       addressLine2: "",
//       city: "",
//       state: "",
//       postalCode: "",
//       country: ""
//     },

//     // ReviewForm
//     agreeToTerms: false
//   }),

//   validationSchema,

//   handleSubmit: (values, { props, setSubmitting, setErrors }) => {
//     setSubmitting(true)
//   }
// }
