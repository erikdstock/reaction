import { Box, Button, Flex, Input, Modal, Sans, Spacer } from "@artsy/palette"
import { FormikHelpers as FormikActions } from "formik"
import React from "react"
import styled from "styled-components"

import * as Yup from "yup"

import { useSystemContext } from "Artsy"
import { CountrySelect } from "Components/CountrySelect"
import { Step, Wizard } from "Components/Wizard"
import { FormValues, StepElement } from "Components/Wizard/types"

import { ApiError } from "../../ApiError"
import { EnableSecondFactor } from "../Mutation/EnableSecondFactor"
import { DeliverSecondFactor } from "./Mutation/DeliverSecondFactor"
import { UpdateSmsSecondFactor } from "./Mutation/UpdateSmsSecondFactor"

import { CreateSmsSecondFactorMutationResponse } from "__generated__/CreateSmsSecondFactorMutation.graphql"

interface SmsSecondFactorModalProps {
  onClose: () => void
  show?: boolean
  onComplete: () => void
  secondFactor: CreateSmsSecondFactorMutationResponse["createSmsSecondFactor"]["secondFactorOrErrors"]
}

// TODO: Port this box-sizing attribute to Palette component
const StyledInput = styled(Input)`
  box-sizing: border-box;
`

export const SmsSecondFactorModal: React.FC<SmsSecondFactorModalProps> = props => {
  const { secondFactor, onComplete } = props
  const { relayEnvironment } = useSystemContext()

  if (!secondFactor || secondFactor.__typename !== "SmsSecondFactor") {
    return null
  }

  const handleOnComplete = async (
    values: FormValues,
    actions: FormikActions<object>
  ) => {
    try {
      await EnableSecondFactor(relayEnvironment, {
        secondFactorID: secondFactor.internalID,
        code: values.code,
      })

      onComplete()
    } catch (error) {
      handleMutationError(actions, error)
    }
  }

  const handleMutationError = (
    actions: FormikActions<FormValues>,
    errors: ApiError[]
  ) => {
    if (!Array.isArray(errors)) {
      throw errors
    }

    let statusMessage = ""

    errors.forEach(error => {
      if (error.code === "invalid" && error.data.key === "phone_number") {
        actions.setFieldError("phoneNumber", error.message)
      } else if (error.code === "invalid_otp") {
        actions.setFieldError("code", error.message)
      } else {
        statusMessage += `${error.message}\n`
      }
    })

    if (statusMessage.length) {
      actions.setStatus({ message: statusMessage })
    }
  }

  const handleDeliverStepSubmit = async (
    values: FormValues,
    actions: FormikActions<FormValues>
  ) => {
    return new Promise<boolean>(async (resolve, _reject) => {
      try {
        await UpdateSmsSecondFactor(relayEnvironment, {
          secondFactorID: secondFactor.internalID,
          attributes: {
            phoneNumber: values.phoneNumber,
            countryCode: values.countryCode,
          },
        })
        const response = await DeliverSecondFactor(relayEnvironment, {
          secondFactorID: secondFactor.internalID,
        })

        const factor = response.deliverSecondFactor.secondFactorOrErrors

        if (factor.__typename === "SmsSecondFactor") {
          actions.setFieldValue(
            "formattedPhoneNumber",
            factor.formattedPhoneNumber
          )
        }

        resolve(true)
      } catch (error) {
        handleMutationError(actions, error)
      }
    })
  }

  const steps: StepElement[] = [
    <Step
      label="Phone Number"
      onSubmit={handleDeliverStepSubmit}
      validationSchema={Yup.object().shape({
        phoneNumber: Yup.string().required("Enter your phone number"),
      })}
    >
      {({ form, wizard }) => (
        <Box>
          <Sans mt={1} color="black60" size="3t">
            Enter your mobile phone number.
          </Sans>
          <Sans mt={1} color="black60" size="3t">
            We’ll send you a security code to this number whenever you log into
            Artsy.
          </Sans>
          <CountrySelect
            mt={3}
            mb={1}
            selected={form.values.countryCode}
            onSelect={value => form.setFieldValue("countryCode", value)}
          />
          <StyledInput
            autoComplete="off"
            name="phoneNumber"
            error={form.touched.phoneNumber && form.errors.phoneNumber}
            value={form.values.phoneNumber}
            onBlur={form.handleBlur}
            placeholder="Add phone"
            pattern="[^a-z]+"
            onChange={form.handleChange}
          />
          {form.status && (
            <Sans mt={1} color="red100" size="2">
              {form.status.message}
            </Sans>
          )}
          <Button display="block" width="100%" type="submit" mt={2}>
            Next
          </Button>
        </Box>
      )}
    </Step>,
    <Step
      label="Authentication Code"
      validationSchema={Yup.object().shape({
        code: Yup.string().required("Enter a code"),
      })}
    >
      {({ form, wizard }) => (
        <Box>
          <Sans mt={1} color="black60" size="3t">
            We’ve sent the authentication code to{" "}
            {form.values.formattedPhoneNumber}. Please enter the code to verify
            your phone number.
          </Sans>
          <Spacer mt={2} />
          <StyledInput
            error={form.touched.code && form.errors.code}
            onBlur={form.handleBlur}
            autoComplete="off"
            name="code"
            value={form.values.code}
            onChange={form.handleChange}
          />
          {form.status && (
            <Sans mt={1} color="red100" size="2">
              {form.status.message}
            </Sans>
          )}
          <Flex justifyContent="space-between" alignItems="center" mt={2}>
            <Button
              width="50%"
              variant="secondaryGray"
              type="button"
              onClick={e => {
                form.setStatus(null)
                wizard.previous(e)
              }}
            >
              Back
            </Button>
            <Spacer ml={1} />
            <Button width="50%" type="submit">
              Turn on
            </Button>
          </Flex>
        </Box>
      )}
    </Step>,
  ]

  return (
    <Modal
      forcedScroll={false}
      title="Set up with text message"
      show={props.show}
      onClose={props.onClose}
    >
      <Wizard
        onComplete={handleOnComplete}
        initialValues={{ countryCode: "US", phoneNumber: "", code: "" }}
        steps={steps}
      >
        {wizardProps => {
          const { wizard } = wizardProps
          const { currentStep } = wizard
          return <Box>{currentStep}</Box>
        }}
      </Wizard>
    </Modal>
  )
}