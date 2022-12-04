import styled from "styled-components";
import Flex from "components/Flex";

export default function Header() {
  return (
    <StyledHeader>
      blaaa
      <MenuButton>Login</MenuButton>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  background: blue;
  box-sizing: border-box;
`;

const MenuButton = styled(Flex)`
  display: flex;
  background: whitesmoke;
  width: 200px;
  box-sizing: border-box;
`;
