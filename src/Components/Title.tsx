import React from "react"
import styled from "styled-components"
import * as fonts from "../Assets/Fonts"
import { media } from "./Helpers"

type TitleSize =
  | "xxsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge"

type FontWeight = "inherit" | "bold"

interface TitleProps extends React.HTMLProps<HTMLDivElement> {
  titleSize?: TitleSize
  fontWeight?: FontWeight
  color?: string
}

const titleSizes = {
  xxsmall: "13px",
  xsmall: "20px",
  small: "25px",
  medium: "30px",
  large: "37px",
  xlarge: "50px",
  xxlarge: "72px",
}

const Title: React.SFC<TitleProps> = props => {
  const newProps: TitleProps = { ...props }
  delete newProps.titleSize

  return <div {...newProps}>{props.children}</div>
}

const StyledTitle = styled(Title)`
  font-size: ${props => titleSizes[props.titleSize]};
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
  margin: 20px 0;
  ${fonts.secondary.style};
  ${media.sm`
    font-size: ${titleSizes.small};
  `};
`

StyledTitle.defaultProps = {
  titleSize: "medium",
  fontWeight: "inherit",
  color: "inherit",
}

export default StyledTitle
