const { default: styled } = require("styled-components")

const DivNav = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
`

const Name = styled.div`
    font-weight: normal;
    margin-bottom: 4px;
`

const Status = styled.div`
    font-size: 1rem;
`

const BoxName = ({isWrite}) => {
return (
    <DivNav>
        <Name>Erick Kleniving</Name>
        <Status>{isWrite ? 'Digitando...' : 'Online' }</Status>
    </DivNav>
)
}

export default BoxName