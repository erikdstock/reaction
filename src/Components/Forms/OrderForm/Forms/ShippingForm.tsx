import { FormikInput } from "../../Wizard/FormikInput"
import InvertedButton from "../../../Buttons/Inverted"
import React, { Fragment } from "react"
import Text from "../../../Text"
import Title from "../../../Title"
import colors from "../../../../Assets/Colors"
import { Grid, Row, Col } from "react-styled-flexboxgrid"

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
export const ShippingForm = (props: any) => {
  console.log("shippingForm props:", props)
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
export const AddressFormInputs = () => {
  return (
    <Fragment>
      <Row>
        <Col xs>
          <FormikInput
            name="fullName"
            type="text"
            placeholder="Full Name"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <FormikInput name="addressLine1" placeholder="Address Line 1" block />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <FormikInput
            name="addressLine2"
            type="text"
            placeholder="Address Line 2 (Optional)"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormikInput name="city" type="text" placeholder="City" block />
        </Col>
        <Col xs={6}>
          <FormikInput
            name="state"
            type="text"
            placeholder="State / Province / Region"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormikInput
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            block
          />
        </Col>
        <Col xs={6}>
          <FormikInput type="text" name="country" placeholder="Country" block />
        </Col>
      </Row>
    </Fragment>
  )
}
