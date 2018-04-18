import Icon from "../Icon"
import React, { Component } from "react"
import Text from "../Text"
import colors from "../../Assets/Colors"
import styled from "styled-components"
import { Fonts } from "../Publishing/Fonts"
import { Props, State, MetaStep, StepState } from "./types"
import { isUndefined } from "lodash"

export * from "./types"

export class StepMarker extends Component<Props, State> {
  static defaultProps = {
    disableInternalState: false,
  }

  constructor(props) {
    super(props)
    this.validate(props)
    this.state = this.computeStepState(props)
  }

  validate(props: Props) {
    // const isInvalid = props.steps.filter(step => step.isActive).length > 1

    // if (isInvalid) {
    //   console.error(
    //     "(Components/StepMarker) Error: Step configuration has more than",
    //     "one active item."
    //   )
    // }
  }

  computeStepState(propsOrState: State) {
    let { currentStepIndex, steps } = propsOrState
    const stepState = steps.map((step, i) => {
      const isActive = i === this.props.currentStepIndex
      const isComplete = i < this.props.currentStepIndex
      return { ...step, isActive, isComplete }
    })
    return {
      steps: stepState,
      currentStepIndex,
    }
  }

  updateStep(currentStepIndex) {
    this.setState(
      this.computeStepState({
        ...this.state,
        currentStepIndex,
      })
    )
  }

  nextStep = () => {
    if (this.state.currentStepIndex < this.props.steps.length) {
      this.updateStep(this.state.currentStepIndex + 1)
    }
  }

  previousStep = () => {
    if (this.state.currentStepIndex > 0) {
      this.updateStep(this.state.currentStepIndex - 1)
    }
  }

  gotoStep = index => {
    this.updateStep(index)
  }

  isComplete = () => {
    return this.state.currentStepIndex === this.props.steps.length
  }

  render() {
    const { children, style } = this.props
    const { steps } = this.state

    return (
      <Container style={style}>
        <Steps>
          {steps.map((step, key) => {
            return (
              <Step {...step} key={key}>
                {step.isComplete && <StyledIcon name="check" color="white" />}
                <StyledText align="center">{step.label}</StyledText>
              </Step>
            )
          })}
        </Steps>

        {children &&
          children({
            nextStep: this.nextStep,
            previousStep: this.previousStep,
            gotoStep: this.gotoStep,
            stepState: this.state,
            isComplete: this.isComplete,
          })}
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 20px;
`

const Steps = styled.div`
  display: flex;
`

const Step = styled.div`
  ${(props: StepState ) => {
    const { isActive, isComplete } = props
    const circleSize = "10px" // + 2px border
    let bgColor = colors.white
    let circleBorderColor = colors.grayRegular
    let connectingBorderColor = colors.grayRegular

    if (isActive) {
      bgColor = colors.white
      circleBorderColor = colors.black
    }
    if (isComplete) {
      bgColor = colors.black
      circleBorderColor = colors.black
      connectingBorderColor = colors.black
    }

    return `
      position: relative;
      padding: 12px;
      text-align: center;
      width: 100%;

      &:before {
        background: ${bgColor};
        border-radius: 50%;
        border: 2px solid ${circleBorderColor};
        top: calc(-${circleSize} / 2);
        left: calc(50% - calc(${circleSize} / 2));
        width: ${circleSize};
        height: ${circleSize};
        position: absolute;
        content: " ";
        z-index: 2;
      }

      &:after {
        border-top: 2px solid ${connectingBorderColor};
        width: 100%;
        left: 50%;
        top: 1px;
        position: absolute;
        content: " ";
      }

      &:last-child:after {
        border-top: none;
      }
    `
  }};
`

const StyledText = Text.extend`
  ${Fonts.unica("s12", "regular")};
  margin-top: 0;
  margin-bottom: 0;
`

const StyledIcon = Icon.extend`
  width: 100%;
  text-align: center;
  font-size: 6px;
  color: white;
  position: absolute;
  top: -1px;
  left: -3px;
  z-index: 3;
`

Step.displayName = "Step"
