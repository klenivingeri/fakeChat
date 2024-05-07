import styled from "styled-components"

const Imagem = styled.img`
    border-radius: 999px;
`

const Avatar = ({ img = '../user.png' }) => {
    return (<Imagem width="40" height="40" src={img} />)

}

export default Avatar