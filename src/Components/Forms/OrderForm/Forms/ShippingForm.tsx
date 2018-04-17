import { FormikInput } from "../../FormikInput"
import InvertedButton from "../../../Buttons/Inverted"
import React, { Fragment } from "react"
import Text from "../../../Text"
import Title from "../../../Title"
import colors from "../../../../Assets/Colors"
import { Grid, Row, Col } from "react-styled-flexboxgrid"
import { FormikProps } from "formik"
/*
                      <FormikInput
                      formik={formikProps}
                      input={{
                        name: "fullName",
                        placeholder: "Your Name",
                        type: "text"
                      }}
                    />
  */
export const ShippingForm = (props: FormikProps<any> & {}) => {
  debugger
  return (
    <Grid fluid>
      <Row>
        <Col xs>
          <Title titleSize="xsmall" fontWeight="bold">
            Shipping details
          </Title>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Text textSize="medium">
            Upon processing your order, an Artsy Specialist will connect you
            with the seller for shipping arrangements. Any shipping fees will be
            collected at that time.
          </Text>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Title titleSize="xsmall" fontWeight="bold">
            Shipping address
          </Title>
        </Col>
      </Row>

      <AddressFormInputs {...props} />

      <Row>
        <Col xs>
          <InvertedButton block onClick={() => props.nextStep()}>
            CONTINUE TO PAYMENT
          </InvertedButton>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Text color={colors.graySemibold} textSize="medium" align="center">
            Questions? Email{" "}
            <a href="mailto:orders@artsy.net">orders@artsy.net.</a>
          </Text>
        </Col>
      </Row>
    </Grid>
  )
}

// Imported in `PaymentForm` if addresss is different than shipping
export const AddressFormInputs = (props: FormikProps<any>) => {
  debugger
  const { values, touched, errors, handleChange, handleBlur } = props
  return (
    <Fragment>
      <Row>
        <Col xs>
          <FormikInput
            formik={{ values, errors, touched, handleBlur, handleChange }}
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.fullName}
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <FormikInput
            formik={{ values, errors, touched, handleBlur, handleChange }}
            name="addressLine1"
            placeholder="Address Line 1"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <FormikInput
            formik={{ values, errors, touched, handleBlur, handleChange }}
            name="addressLine2"
            placeholder="Address Line 2 (Optional)"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormikInput
            formik={{ values, errors, touched, handleBlur, handleChange }}
            name="city"
            placeholder="City"
            block
          />
        </Col>
        <Col xs={6}>
          <FormikInput
            formik={{ values, errors, touched, handleBlur, handleChange }}
            name="state"
            placeholder="State / Province / Region"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormikInput
            formik={{ values, errors, touched, handleBlur, handleChange }}
            name="postalCode"
            placeholder="Postal Code"
            block
          />
        </Col>
        <Col xs={6}>
          <FormikInput
            formik={{ values, errors, touched, handleBlur, handleChange }}
            name="country"
            placeholder="Country"
            block
          />
        </Col>
      </Row>
    </Fragment>
  )
}
