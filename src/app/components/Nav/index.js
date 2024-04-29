const { default: styled } = require("styled-components")

const DivNav = styled.div`
    display: flex;
    flex: 1;
`

const Nav = ({children}) =>  <DivNav>{children} </DivNav>

export default Nav