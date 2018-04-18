import Nav from "../../Nav"
import React, { Component } from "react"
import Title from "../../Title"
import styled from "styled-components"
import { PaymentForm } from "./Forms/PaymentForm"
import { RenderProps as StepRenderProps } from "../../StepMarker"
import { ReviewForm } from "./Forms/ReviewForm"
import { ShippingForm } from "./Forms/ShippingForm"
import { StepMarker } from "../../StepMarker"
import { validationSchema, initialValues, InputValues } from "./formik"
import { Formik, FormikProps, Field } from "formik"
import Yup from "yup"
import { Wizard, FormStep } from "../Wizard"
import { FormikInput } from "../FormikInput"
import { FormContainer } from "../../Authorization/commonElements"

// export const Step = props => <FormContainer>{props.children}</FormContainer>

export const forms = [
  {
    label: "Shipping",
    isActive: false,
    isComplete: false,
    component: ShippingForm,
    stepName: "shipping",
    // path: "/shipping"
  },
  {
    label: "Payment",
    isActive: false,
    isComplete: false,
    component: PaymentForm,
    stepName: "payment",
    // path: "/payment",
  },
  {
    label: "Review",
    isActive: false,
    isComplete: false,
    component: ReviewForm,
    stepName: "review",
    // path: "/review",
  },
]

export class App extends Component<{ onSubmit: any }> {
  render() {
    return (
      <Container>
        <Wizard
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            favoriteColor: "",
          }}
          onSubmit={this.props.onSubmit}
        >
          {/* <Nav
                height={70}
                logoIcon="logotype"
                logoLink="https://www.artsy.net"
              >
                <StyledTitle titleSize="xsmall">Secure Checkout</StyledTitle>

                <StepMarker
                  style={{ marginTop: 15, marginRight: 15 }}
                  steps={forms}
                >
                  {stepper => {
                    this.registerStepper(stepper)
                  }}
                </StepMarker>
              </Nav> */}
          {forms.map(({ component: FormComponent, stepName }) => (
            <FormStep validate={validationSchema[stepName]}>
              <FormComponent
                key={stepName}
                // nextStep={() => this.nextStep(path)}
                // gotoStep={this.gotoStep}
              />
            </FormStep>
          ))}
          {/* <FormStep>
          <div>
            <label>First Name</label>
            <FormikInput
              name="firstName"
              type="text"
              placeholder="First Name"
            />
            <label>Last Name</label>
            <FormikInput name="lastName" type="text" placeholder="Last Name" />
          </div>
        </FormStep> */}
          {/*} <FormStep
          // validate={values => {
          //   const errors = {}
          //   if (!values.email) {
          //     errors.email = "Required"
          //   }
          //   if (!values.favoriteColor) {
          //     errors.favoriteColor = "Required"
          //   }
          //   return errors
          // }}
        // >
          /* <div>
            <label>Email</label>
            <Field
              name="email"
              component={FormikInput}
              type="email"
              placeholder="Email"
            />
            <Error name="email" />
          </div>
          <div>
            <label>Favorite Color</label>
            <Field name="favoriteColor" component="select">
              <option />
              <option value="#ff0000">❤️ Red</option>
              <option value="#00ff00">💚 Green</option>
              <option value="#0000ff">💙 Blue</option>
            </Field>
            <Error name="favoriteColor" /> */}
          {/* </div> */}
          {/* </FormStep> */}
        </Wizard>
      </Container>
    )
  }
}
// export const App = compose(withFormik(formikConfiguration))(Form)
const Container = styled.div``

// const FormContainer = styled.div`
//   max-width: 540px;
//   margin: 0 auto;
// `

// const StyledTitle = Title.extend`
//   flex-grow: 1;
// `
