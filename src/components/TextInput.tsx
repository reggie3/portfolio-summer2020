import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { detailColor } from "../pages/global-speed-analysis-tool/colors";

interface TextInputProps {
  key: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: any;
  value: string | number;
  label: string;
  size?: number;
  style?: object;
  shouldFocus?: boolean;
  suffix?: string;
  prefix?: string;
  width?: number;
}

const bottomBorderHoverVariants = {
  show: {
    opacity: 1,
    scaleY: 1,
  },
  hide: {
    opacity: 0,
    scaleY: 0,
  },
};
const bottomBorderActiveVariants = {
  show: {
    opacity: 1,
    scale: 1,
  },
  hide: {
    opacity: 0,
    scale: 0,
  },
};

const DetailLabelVariants = {
  show: { scaleX: 1, opacity: 1 },
  hide: { scaleX: 0, opacity: 0 },
};

const TextInput: React.FunctionComponent<TextInputProps> = ({
  key,
  label,
  onChange,
  prefix,
  size,
  ref,
  shouldFocus,
  style,
  suffix,
  value = "",
  width,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClick = () => {
    setIsActive(true);
    inputRef.current.focus();
  };

  React.useEffect(() => {
    if (shouldFocus && inputRef) {
      inputRef.current.focus();
      setIsActive(true);
    }
  }, [shouldFocus, inputRef]);

  return (
    <RootContainer key={`${key}-rootContainer`} style={style}>
      <TextInputRootContainer
        key={`${key}-textInputRootContainer`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
      >
        <TextContainer>
          {prefix && <PrefixText>{prefix}</PrefixText>}
          <InputContainer key={`${key}-inputContainer`}>
            <Input
              key={`${key}-textInput`}
              onChange={onChange}
              type="text"
              value={value}
              ref={inputRef}
              size={size}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              placeholder={!isActive ? label : ""}
            />

            {suffix && <SuffixText>{suffix}</SuffixText>}
          </InputContainer>
        </TextContainer>
        <BottomBorderContainer>
          <BottomBorder />
          <BottomBorderHover
            variants={bottomBorderHoverVariants}
            initial="hide"
            animate={isHovered ? "show" : "hide"}
            onClick={onClick}
          />
          <BottomBorderActive
            variants={bottomBorderActiveVariants}
            initial="hide"
            animate={isActive ? "show" : "hide"}
            onClick={onClick}
          />
        </BottomBorderContainer>
      </TextInputRootContainer>
      {label && (
        <DetailLabel
          variants={DetailLabelVariants}
          initial={value || value == 0 || isActive ? "show" : "hide"}
          animate={value || value == 0 || isActive ? "show" : "hide"}
        >
          {label}
        </DetailLabel>
      )}
    </RootContainer>
  );
};

export default TextInput;

// const fontSize = `font-size: 1.25em;`;
const PrefixSuffixText = `  font-weight: lighter;
color: gray;`;

const RootContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const borderPositioning = `
position:absolute;
bottom: 10px;
left: 0;
right: 0;
height: 1px;`;

const TextInputRootContainer = styled(motion.div)`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Input = styled(motion.input)`
  border: 0px;
  border: none;
  line-height: 2.5rem;
  flex: 1;
  min-width: 0px;
  width: 100%;
  outline: none;
`;
const BottomBorderContainer = styled.div`
  width: 100%;
  position: relative;
`;
const BottomBorder = styled(motion.div)`
  ${borderPositioning}
  z-index: 100;
  background: silver;
`;
const BottomBorderHover = styled(motion.div)`
  ${borderPositioning}
  height: 2px;
  z-index: 101;
  background: gray;
  transform-origin: bottom;
`;
const BottomBorderActive = styled(motion.div)`
  ${borderPositioning}
  height: 2px;
  z-index: 102;
  background: ${detailColor};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PrefixText = styled.p`
  ${PrefixSuffixText}
  padding-right: 5px;
`;
const SuffixText = styled.p`
  ${PrefixSuffixText}
  padding-left: 5px;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
`;

const DetailLabel = styled(motion.div)`
  position: absolute;
  top: 0;
  font-size: 12px;
  color: ${detailColor};
  transform-origin: left;
  z-index: 101;
`;
