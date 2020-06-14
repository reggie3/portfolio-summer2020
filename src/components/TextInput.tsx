import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { detailColor } from "../pages/global-speed-analysis-tool/colors";

interface TextInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: any;
  value: string;
  label: string;
  size?: number;
  suffix?: string;
  prefix?: string;
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

const placeHolderTextVariants = {};

const TextInput: React.FunctionComponent<TextInputProps> = ({
  label,
  onChange,
  prefix,
  size,
  ref,
  suffix,
  value,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClick = () => {
    setIsActive(true);
    inputRef.current.focus();
  };

  return (
    <TextInputRootContainer
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <TextContainer>
        {prefix && <PrefixSuffixText>{prefix}</PrefixSuffixText>}
        <InputContainer>
          <Input
            onChange={onChange}
            type="text"
            value={value}
            ref={inputRef}
            size={size}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
          />
          {label && (
            <PlaceHolderText
              variants={placeHolderTextVariants}
              animate={isHovered ? "show" : "hide"}
            >
              {label}
            </PlaceHolderText>
          )}
        </InputContainer>
        {suffix && <PrefixSuffixText>{suffix}</PrefixSuffixText>}
      </TextContainer>
      <BottomBorderContainer>
        <BottomBorder style={{ background: "gray" }} />
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
  );
};

export default TextInput;

const fontSize = `font-size: 1.25em;`;

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
  ${fontSize}
`;
const Input = styled(motion.input)`
  border: 0px;
  border: none;
  line-height: 2.5rem;
  padding: 0 1rem;
  flex: 1;
  font-size: 1rem;
`;
const BottomBorderContainer = styled.div`
  width: 100%;
  position: relative;
`;
const BottomBorder = styled(motion.div)`
  ${borderPositioning}
  z-index: 100;
`;
const BottomBorderHover = styled(motion.div)`
  ${borderPositioning}
  height: 2px;
  z-index: 101;
  background: #353535;
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

const PrefixSuffixText = styled.p`
  font-weight: lighter;
  color: gray;
`;

const InputContainer = styled.div`
  position: relative;
`;

const PlaceHolderText = styled(motion.div)`
  color: gray;
  position: absolute;
  font-size: 1em;
`;
