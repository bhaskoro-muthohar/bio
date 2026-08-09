import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.laptopL}) {
    max-width: 1000px;
  }
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.laptop}) {
    max-width: 800px;
  }
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    width: 100%;
    max-width: 650px;
  }
`;
