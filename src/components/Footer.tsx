import * as React from "react";
import SocialIcons from "./SocialIcons";
import styled from "styled-components";

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = props => {
  return (
    <FooterRoot>
      <SocialIcons />
    </FooterRoot>
  );
};

export default Footer;

const FooterRoot = styled.div`
position: fixed;
bottom: 0;
width: 100%;
padding: 0.5rem 0.5rem;
background-color: var(--clr-bg-dark);
color: var(--clr-text);
line-height: 3rem;
z-index: 75;
}
`;
