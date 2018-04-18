import React from "react"
import { FormikProps, Field } from "formik"
import styled from "styled-components"
import { default as Input, InputProps } from "../Input"

// export interface FormikInputProps<T> extends InputProps {}

/**
 * An input with the standard FormimkProps added for rendering niceness
 */
export const FormikInput: (props: any) => any = props => {
  const { name, type, placeholder, block } = props
  return (
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      // prettier-ignore
      // because restProps should not have a trailing comma (fixed in 1.9)
      render={({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        ...restProps,
      }) => (
        <div>
          <Input
          {...field}
            block={block}
            type={type}
            placeholder={placeholder}
            error={touched[name] && errors[name]}
            value={values[name]}
            {...restProps}
          />
          {touched[name] &&
            errors[name] && <InputError>{errors[name]}</InputError>}
        </div>
      )}
    />
  )
}
const InputError = styled.div`
  color: red;
`
