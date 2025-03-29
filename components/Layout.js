import styled from 'styled-components'
import ReactDOM from 'react-dom';



export default function Layout({ children }) {
    return (
        <Main >
            {children}
        </Main>
    )
}

const Main = styled.main`
  min-height: 100vh;
  background: url('/bg.png') no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.laptop}) {
    background-size: 150%;
    background-position: -20vh 10%;
  }
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    background-size: 250%;
    background-position: -50vh 30vh;
   }
`;
