import React, {
    useState,
    useRef,
    useLayoutEffect,
    Children,
} from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    type StepperProps,
    type StepContentWrapperProps,
    type SlideTransitionProps,
} from "../../interfaces/StepperProps";
import { StepIndicator, StepConnector } from "./StepperSubComponents";

const stepVariants: Variants = {
    enter: (dir) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (dir) => ({ x: dir >= 0 ? "50%" : "-50%", opacity: 0 }),
};

export default function Stepper({
    children,
    initialStep = 1,
    onStepChange = () => { },
    onFinalStepCompleted = () => { },
    stepCircleContainerClassName = "",
    stepContainerClassName = "",
    contentClassName = "",
    footerClassName = "",
    backButtonProps = {},
    nextButtonProps = {},
    backButtonText = "Atrás",
    nextButtonText = "Continuar",
    disableStepIndicators = false,
    renderStepIndicator,
    ...rest
}: StepperProps) {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [direction, setDirection] = useState(0);
    const stepsArray = Children.toArray(children);
    const totalSteps = stepsArray.length;
    const isCompleted = currentStep > totalSteps;
    const isLastStep = currentStep === totalSteps;

    const updateStep = (newStep: number) => {
        setCurrentStep(newStep);
        if (newStep > totalSteps) {
            onFinalStepCompleted();
        } else {
            onStepChange(newStep);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            updateStep(currentStep - 1);
        }
    };

    const handleNext = () => {
        if (!isLastStep) {
            setDirection(1);
            updateStep(currentStep + 1);
        }
    };

    const handleComplete = () => {
        setDirection(1);
        updateStep(totalSteps + 1);
    };

    return (
        <div
            className="flex min-h-full flex-1 flex-col items-center justify-center p-4 sm:aspect-[4/3] md:aspect-[2/1]"
            {...rest}
        >
            <div
                className={`mx-auto w-full max-w-md rounded-4xl shadow-xl ${stepCircleContainerClassName}`}
                style={{ border: "1px solid #222" }}
            >
                <div className={`${stepContainerClassName} flex w-full items-center p-8`}>
                    {stepsArray.map((_, index) => {
                        const stepNumber = index + 1;
                        const isNotLastStep = index < totalSteps - 1;
                        return (
                            <React.Fragment key={stepNumber}>
                                {renderStepIndicator ? (
                                    renderStepIndicator({
                                        step: stepNumber,
                                        currentStep,
                                        onStepClick: (clicked) => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        },
                                    })
                                ) : (
                                    <StepIndicator
                                        step={stepNumber}
                                        disableStepIndicators={disableStepIndicators}
                                        currentStep={currentStep}
                                        onClickStep={(clicked) => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        }}
                                    />
                                )}
                                {isNotLastStep && (
                                    <StepConnector isComplete={currentStep > stepNumber} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                <StepContentWrapper
                    isCompleted={isCompleted}
                    currentStep={currentStep}
                    direction={direction}
                    className={`space-y-2 px-8 ${contentClassName}`}
                >
                    {stepsArray[currentStep - 1]}
                </StepContentWrapper>

                {!isCompleted && (
                    <div className={`px-8 pb-8 ${footerClassName}`}>
                        <div className={`mt-10 flex ${currentStep !== 1 ? "justify-between" : "justify-end"}`}>
                            {currentStep !== 1 && (
                                <button {...backButtonProps} onClick={handleBack}>
                                    {backButtonText}
                                </button>
                            )}
                            <button {...nextButtonProps} onClick={isLastStep ? handleComplete : handleNext}>
                                {isLastStep ? "Finalizar" : nextButtonText}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StepContentWrapper({
    isCompleted,
    currentStep,
    direction,
    children,
    className = "",
}: StepContentWrapperProps) {
    const [parentHeight, setParentHeight] = useState(0);
    return (
        <motion.div
            style={{ position: "relative", overflow: "hidden" }}
            animate={{ height: isCompleted ? 0 : parentHeight }}
            transition={{ type: "spring", duration: 0.4 }}
            className={className}
        >
            <AnimatePresence initial={false} mode="sync" custom={direction}>
                {!isCompleted && (
                    <SlideTransition
                        key={currentStep}
                        direction={direction}
                        onHeightReady={(h) => setParentHeight(h)}
                    >
                        {children}
                    </SlideTransition>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function SlideTransition({
    children,
    direction,
    onHeightReady,
}: SlideTransitionProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        if (containerRef.current) {
            onHeightReady(containerRef.current.offsetHeight);
        }
    }, [children, onHeightReady]);

    return (
        <motion.div
            ref={containerRef}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", left: 0, right: 0, top: 0 }}
        >
            {children}
        </motion.div>
    );
}
