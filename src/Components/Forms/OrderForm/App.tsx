import Nav from "../../Nav"
import React, { Component } from "react"
import Title from "../../Title"
import styled from "styled-components"
import { PaymentForm } from "./Forms/PaymentForm"
import { MetaStep } from "../../StepMarker"
import { ReviewForm } from "./Forms/ReviewForm"
import { ShippingForm } from "./Forms/ShippingForm"
import { validationSchema, initialValues, InputValues } from "./formik"
// import { Formik, FormikProps, Field } from "formik"

import { Wizard, FormStep, FormikHandler } from "../Wizard"
// import { FormikInput } from "../FormikInput"
// import { FormContainer } from "../../Authorization/commonElements"

export const forms: MetaStep[] = [
  {
    label: "Shipping",
    component: ShippingForm,
    stepName: "shipping",
  },
  {
    label: "Payment",
    component: PaymentForm,
    stepName: "payment",
  },
  {
    label: "Review",
    component: ReviewForm,
    stepName: "review",
  },
]

export class App extends Component<{ onSubmit: any }> {
  render() {
    return (
      <Container>
        <Wizard initialValues={initialValues} onSubmit={this.props.onSubmit}>
          {forms.map(({ component: FormComponent, stepName }) => (
            <FormStep key={stepName} validate={validationSchema[stepName]}>
              <FormComponent
              // nextStep={() => this.nextStep(path)}
              // gotoStep={this.gotoStep}
              />
            </FormStep>
          ))}
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

export const StyledTitle = Title.extend`
  flex-grow: 1;
`
