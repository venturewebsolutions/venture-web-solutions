export type StepperStepChangeEvent = {
  currentStep: number
}

declare global {
  interface ElementEventMap {
    'stepper:step-change': CustomEvent<StepperStepChangeEvent>
  }
}

export {}
