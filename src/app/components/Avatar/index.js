import styled from "styled-components"

const Imagem = styled.img`
    border-radius: 999px;
`

const Avatar = () => {
    return (<Imagem width="40" height="40" src="https://th.bing.com/th/id/OIP.PqBYGErQeWQWhbA_VeUBDQHaHa?rs=1&pid=ImgDetMain"/>)
}

export default Avatar