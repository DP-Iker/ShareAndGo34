import type { HTMLAttributes, ReactNode } from "react";

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    initialStep?: number;
    onStepChange?: (step: number) => void;
    onFinalStepCompleted?: () => void;
    stepCircleContainerClassName?: string;
    stepContainerClassName?: string;
    contentClassName?: string;
    footerClassName?: string;
    backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    backButtonText?: string;
    nextButtonText?: string;
    disableStepIndicators?: boolean;
    renderStepIndicator?: (props: {
        step: number;
        currentStep: number;
        onStepClick: (clicked: number) => void;
    }) => ReactNode;
}

export interface StepContentWrapperProps {
    isCompleted: boolean;
    currentStep: number;
    direction: number;
    children: ReactNode;
    className?: string;
}

export interface SlideTransitionProps {
    children: ReactNode;
    direction: number;
    onHeightReady: (height: number) => void;
}

export interface StepProps {
    children: ReactNode;
}

export interface StepIndicatorProps {
    step: number;
    currentStep: number;
    onClickStep: (clicked: number) => void;
    disableStepIndicators?: boolean;
}

export interface StepConnectorProps {
    isComplete: boolean;
}

export type CheckIconProps = React.SVGProps<SVGSVGElement>
