import * as React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { TextField } from "@material-ui/core";
import { detailColor } from "../colors";
import TextInput from "../../../components/TextInput";

interface SwitchableLabelInputProps {
  inputAdornment?: {
    startAdornment?: JSX.Element;
    endAdornment?: JSX.Element;
  };
  inputLabel: string;
  label: JSX.Element;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchMode?: (state: ComponentStates) => void;
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
    index: -1,
  },
  show: {
    opacity: 1,
    scaleX: 1,
    index: 1,
  },
};
const SwitchableLabelInput: React.FunctionComponent<SwitchableLabelInputProps> = ({
  inputAdornment = {},
  inputLabel,
  label,
  onChangeValue,
  onSwitchMode = () => {},
  value,
}) => {
  const [componentState, setComponentState] = useState<ComponentStates>(
    ComponentStates.LABEL
  );
  const inputRef = useRef(null);

  React.useEffect(() => {
    onSwitchMode(componentState);
  }, [componentState, onSwitchMode]);

  React.useEffect(() => {
    if (componentState === ComponentStates.INPUT) {
      inputRef.current.focus();
    }
  }, [componentState]);

  const toggleComponentState = () => {
    componentState === ComponentStates.LABEL
      ? setComponentState(ComponentStates.INPUT)
      : setComponentState(ComponentStates.LABEL);
  };

  return (
    <SwitchableLabelInputRoot onClick={toggleComponentState}>
      <AnimatePresence>
        {componentState === ComponentStates.LABEL && (
          <SwitchableLabel
            variants={variants}
            initial="show"
            exit="hide"
            animate={componentState === ComponentStates.LABEL ? "show" : "hide"}
          >
            {label}
          </SwitchableLabel>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {componentState === ComponentStates.INPUT && (
          <SwitchableInput
            variants={variants}
            initial="show"
            exit="hide"
            animate={componentState === ComponentStates.INPUT ? "show" : "hide"}
          >
            {/* <TextField
              ref={inputRef}
              id="outlined-basic"
              label={inputLabel}
              onChange={onChangeValue}
              value={value}
              InputProps={inputAdornment}
              onBlur={() => setComponentState(ComponentStates.LABEL)}
              color={detailColor}
            /> */}
            <TextInput
              label={inputLabel}
              onChange={onChangeValue}
              ref={inputRef}
              value={value}
            />
          </SwitchableInput>
        )}
      </AnimatePresence>
    </SwitchableLabelInputRoot>
  );
};

export default SwitchableLabelInput;

const SwitchableLabelInputRoot = styled(motion.div)`
  position: relative;
  width: 7rem;
  height: 4rem;
`;

const SwitchableLabel = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transform-origin: left;
`;

const SwitchableInput = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transform-origin: left;
`;
