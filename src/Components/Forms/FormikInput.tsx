import React from "react"
import { FormikProps } from "formik"
import styled from "styled-components"
import { default as Input, InputProps } from "../Input"

export interface FormikInputProps<T> extends InputProps {
  formik: FormikProps<T>
  name: string
}

/**
 * An input with the standard FormimkProps added for rendering niceness
 */
export const FormikInput: <T>(props: FormikInputProps<T>) => any = props => {
  const {
    formik: {
      touched,
      values,
      errors,
      handleChange,
      handleBlur
      // handleSubmit,
      // isSubmitting,
    },
    ...inputProps
  } = props

  const { name } = inputProps
  return (
    <div>
      <Input
        {...inputProps as any /* why any? */}
        error={touched[name] && errors[name]}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched[name] && errors[name] && <InputError>{errors[name]}</InputError>}
    </div>
  )
}
const InputError = styled.div`
  color: red;
`
