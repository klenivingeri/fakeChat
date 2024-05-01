import styled from "styled-components"

const Imagem = styled.img`
    border-radius: 999px;
`

const Avatar = ({img}) => {
    return !!img 
    ?(<Imagem width="40" height="40" src={img} />)
    :(<Imagem width="40" height="40" src='./user.png' />)
}

export default Avatar