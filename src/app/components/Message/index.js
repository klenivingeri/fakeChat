import styled from "styled-components"
import Union1 from "../../../../public/Union1";
import Union2 from "../../../../public/Union2";
import Union3 from "../../../../public/Union3";
import { useEffect, useState } from "react";

const BallonContainer = styled.div`
  display: flex;
  justify-content: ${({ user }) => (user ? "flex-end" : "flex-start")};
  position: relative;
`;

const Ballon = styled.div`

  background-color: ${({ user }) => (user ? "#dcf8c6" : "#ffffff")};
  color: black;
  padding: 8px 12px;
  border-radius: 10px;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: end;
  &::after {
    content: "";
    background-color: ${({ user }) => (user ? "#dcf8c6" : "#ffffff")};
    width: 15px;
    height: 15px;
    position: absolute;
    ${({ user }) => (user ? "right: 1px;" : "left: 1px;")};
    border-radius: 5px;
    top: 9px;
    transform:  ${({ user }) => (user ? 'rotate(30deg)' : 'rotate(60deg)')}
  }
`;

const CheckIcon = styled.div`
  display: flex;
  margin-left: 5px;
  justify-content: center;
  width: 30px;
`

const checked = (status) => {
  if (status == 0) {
    return  <Union1/>
  }
  if (status == 1) {
    return  <Union2/>
  }
  if (status == 2) {
    return  <Union3/>
  }
}

const Message = ({ isUser, msg }) => {
const initiStatus = isUser ? 0 : 2
  const [ status, setStatus] = useState(initiStatus)

  useEffect(() => {
    const waitTime = 1000;
    const maxStatus = 2;

    const proximoStatus = () => {
      if(status < maxStatus && isUser) {
        setStatus(status + 1)
      }
    }

    const interval = setInterval(proximoStatus, waitTime)
    return () => clearInterval(interval)
  },[status])

  return (
    <BallonContainer user={isUser}>
      <Ballon user={isUser}>
        <p>{msg}</p>
        <CheckIcon>
          {checked(status)}
        </CheckIcon>
      </Ballon>
    </BallonContainer>
  );
};

export default Message;