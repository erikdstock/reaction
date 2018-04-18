import React from "react"
import { Formik, FormikBag } from "formik"

// Header bits from all over (clean up)
import Nav from "../Nav"
import { StyledTitle } from "./OrderForm/App"

export type FormikHandler = (values: any, bag?: FormikBag<any, any>) => any
interface FormStepProps {
  validate?: FormikHandler
}

type FormStepType = React.SFC<FormStepProps>
export const FormStep: FormStepType = ({ validate, children }) =>
  React.Children.only(children)

interface Props {
  initialValues: any
  onSubmit: FormikHandler
  // children: any
  // children: (
  //   { prevPage, nextPage, currentPage }
  // ) => React.ReactElement<FormStepType>
  // children: Array<React.ReactElement<FormStepType>>
}

interface State {
  page: number
  values: any
}

export class Wizard extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues,
    }
  }

  get pages(): React.ReactChild[] {
    return React.Children.toArray(this.props.children)
  }
  get activePage() {
    return this.pages[this.state.page] as React.ReactElement<FormStepProps>
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.pages.length - 1),
      values,
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }))

  validate = values => {
    const activePage = this.activePage
    return activePage.props && activePage.props.validate
      ? activePage.props.validate(values)
      : {}
  }

  isLastPage = () => this.state.page === this.pages.length - 1

  handleSubmit = (values, bag) => {
    const { onSubmit } = this.props
    if (this.isLastPage()) {
      return onSubmit(values)
    } else {
      this.next(values)
      bag.setSubmitting(false)
    }
  }
  render() {
    const { page, values } = this.state
    const isLastPage = this.isLastPage()
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={({ values, handleSubmit, isSubmitting, handleReset }) => (
          <form onSubmit={handleSubmit}>
            {/* {true && (
              <Nav //Render a header
                height={70}
                logoIcon="logotype"
                logoLink="https://www.artsy.net"
              >
                <StyledTitle titleSize="xsmall">Secure Checkout</StyledTitle>

                <StepMarker
                  style={{ marginTop: 15, marginRight: 15 }}
                  steps={forms}
                  currentStepIndex={page}
                >

              </Nav>
            )} */}
            {this.activePage}
            <div className="buttons">
              {page > 0 && (
                <button type="button" onClick={this.previous}>
                  « Previous
                </button>
              )}

              {!isLastPage && <button type="submit">Next »</button>}
              {isLastPage && (
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              )}
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    )
  }
}
