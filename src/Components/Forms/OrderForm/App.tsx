import Nav from "../../Nav"
import React, { Component } from "react"
import Title from "../../Title"
import compose from "lodash/fp/compose"
import styled from "styled-components"
import { PaymentForm } from "./Forms/PaymentForm"
import { RenderProps as StepRenderProps } from "../../StepMarker"
import { ReviewForm } from "./Forms/ReviewForm"
import { ShippingForm } from "./Forms/ShippingForm"
import { StepMarker } from "../../StepMarker"
import { formikConfiguration, validationSchema } from "./formik"
import { Formik, withFormik, FormikProps } from "formik"
import Yup from "yup"
import Wizard from "../../Wizard"

export const Step = props => <FormContainer>{props.children}</FormContainer>

interface InputValues {}

export const forms = [
  {
    label: "Shipping",
    isActive: false,
    isComplete: false,
    component: ShippingForm
    // path: "/shipping"
  },
  {
    label: "Payment",
    isActive: false,
    isComplete: false,
    component: PaymentForm
    // path: "/payment",
  },
  {
    label: "Review",
    isActive: false,
    isComplete: false,
    component: ReviewForm
    // path: "/review",
  }
]

class Form extends Component<any> {
  stepper: StepRenderProps

  registerStepper = (stepper: StepRenderProps) => {
    this.stepper = stepper
  }

  // gotoStep = path => {
  //   const formIndex = forms.findIndex(form => form.path === path)
  //   this.stepper.gotoStep(formIndex)
  //   this.props.history.push(path)
  // }

  // nextStep = path => {
  //   this.stepper.nextStep()

  //   setTimeout(() => {
  //     const { currentStep, steps } = this.stepper.stepState
  //     const step = steps[currentStep] as any

  //     if (step) {
  //       const nextStepPath = step.path
  //       this.props.history.push(nextStepPath)
  //     }
  //   })
  // }
  render() {
    const props = this.props
    return (
      <Formik
        initialValues={props.values}
        onSubmit={props.handleSubmit}
        validationSchema={Yup.object().shape(validationSchema)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }: FormikProps<InputValues>) => (
          <Container>
            <Nav
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
            </Nav>

            <Wizard errors={errors}>
              {forms.map(({ component: FormComponent }, key) => (
                <Step>
                  <FormComponent />
                </Step>
              ))}
            </Wizard>
            <FormContainer>
              {/* forms.map(({ path, component: FormComponent }, key) => {
                return (
                  <Route
                    path={path}
                    key={key}
                    render={() => {
                      return (
                        <FormComponent
                          nextStep={() => this.nextStep(path)}
                          gotoStep={this.gotoStep}
                        />
                      )
                    }}
                  />
                )
              })*/}
            </FormContainer>
          </Container>
        )}
      </Formik>
    )
  }
}

const Container = styled.div``

const FormContainer = styled.div`
  max-width: 540px;
  margin: 0 auto;
`

const StyledTitle = Title.extend`
  flex-grow: 1;
`

export const App = compose(withFormik(formikConfiguration))(Form)
