import { ReactNode } from "react"

export interface MetaStep {
  label: string
  component: React.ComponentType
  stepName: string
}

export interface RenderProps {
  nextStep: () => void
  previousStep: () => void
  gotoStep: (index: number) => void
  stepState: State
  isComplete: () => boolean
}

export interface Props {
  children?: (renderProps: RenderProps) => ReactNode | void
  steps: MetaStep[]
  style?: any
  onChange?: any
  currentStepIndex: number
}

export interface State {
  currentStepIndex: number
  steps: StepState[]
}

export type StepState = MetaStep & { isActive: boolean; isComplete: boolean }
