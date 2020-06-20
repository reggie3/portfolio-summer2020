import * as React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { detailColor } from "../colors";
import TextInput from "../../../components/TextInput";
import { useSize } from "react-hook-size";

interface SwitchableLabelInputProps {
  componentKey: string;
  inputAdornment?: {
    startAdornment?: JSX.Element;
    endAdornment?: JSX.Element;
  };
  label: string;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchMode?: (state: ComponentStates) => void;
  prefix?: string;
  suffix?: string;
  value: string | number;
}

enum ComponentStates {
  LABEL = "LABEL",
  INPUT = "INPUT",
}

const variants = {
  hide: {
    opacity: 0,
    scaleX: 0,
  },
  show: {
    opacity: 1,
    scaleX: 1,
  },
};
const SwitchableLabelInput: React.FunctionComponent<SwitchableLabelInputProps> = ({
  componentKey,
  label,
  onChangeValue,
  onSwitchMode = () => {},
  prefix,
  suffix,
  value,
}) => {
  const [componentState, setComponentState] = useState<ComponentStates>(
    ComponentStates.LABEL
  );
  let ref = useRef();
  let { width } = useSize(ref);

  /* React.useEffect(() => {
    onSwitchMode(componentState);
  }, [componentState, onSwitchMode]); */

  const toggleComponentState = () => {
    componentState === ComponentStates.LABEL
      ? setComponentState(ComponentStates.INPUT)
      : setComponentState(ComponentStates.LABEL);
  };

  return (
    <SwitchableLabelInputRoot
      ref={ref}
      onClick={toggleComponentState}
      key={`${componentKey}-switchableLabelInputRoot`}
    >
      <AnimatePresence key={`${componentKey}-switchableLabelAnimatePresence`}>
        {componentState === ComponentStates.LABEL && (
          <SwitchableLabel
            key={`${componentKey}-switchableLabel`}
            style={{
              transformOrigin:
                componentState === ComponentStates.LABEL ? "left" : "right",
            }}
            variants={variants}
            initial="show"
            exit="hide"
            animate={componentState === ComponentStates.LABEL ? "show" : "hide"}
          >
            <DetailText>{label}</DetailText>
            <ValueRow>
              <ValueText>{value}</ValueText>
              <ValueText>{suffix}</ValueText>
            </ValueRow>
          </SwitchableLabel>
        )}
      </AnimatePresence>
      <AnimatePresence key={`${componentKey}-switchableInputAnimatePresence`}>
        {componentState === ComponentStates.INPUT && (
          <SwitchableInput
            key={`${componentKey}-switchableInput`}
            style={{
              transformOrigin:
                componentState === ComponentStates.INPUT ? "left" : "right",
            }}
            variants={variants}
            initial="show"
            exit="hide"
            animate={componentState === ComponentStates.INPUT ? "show" : "hide"}
            /*  onBlur={() => setComponentState(ComponentStates.LABEL)} */
          >
            <TextInput
              key={`${componentKey}-textInput`}
              label={label}
              onChange={onChangeValue}
              prefix={prefix}
              suffix={suffix}
              value={value}
              width={width}
              shouldFocus={componentState === ComponentStates.INPUT}
            />
          </SwitchableInput>
        )}
      </AnimatePresence>
    </SwitchableLabelInputRoot>
  );
};

export default SwitchableLabelInput;

const switchablePostioning = `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
`;

const SwitchableLabelInputRoot = styled(motion.div)`
  position: relative;
  width: 7rem;
  height: 4rem;
`;

const SwitchableLabel = styled(motion.div)`
  ${switchablePostioning}
`;

const SwitchableInput = styled(motion.div)`
  ${switchablePostioning}
`;

const DetailText = styled.div`
  color: ${detailColor};
  font-size: 0.75rem;
`;

const ValueRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ValueText = styled.div`
  color: darkslategrey;
`;
