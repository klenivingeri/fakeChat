import styled from "styled-components";
import Union1 from "../../../../public/Union1";
import Union2 from "../../../../public/Union2";
import Union3 from "../../../../public/Union3";
import { useEffect, useState } from "react";

const BallonContainer = styled.div`
  display: flex;
  justify-content: ${({ user }) => (user ? "flex-end" : "flex-start")};
  position: relative;
  flex-direction: ${({ option }) => (option ? "column" : "row")};
`;

const Ballon = styled.div`
  background-color: ${({ user }) => (user ? "#dcf8c6" : "#ffffff")};
  color: black;
  padding: 7px 8px 4px 8px;
  border-radius: 10px;
  margin: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
 
  &::after {
    content: "";
    background-color: ${({ user }) => (user ? "#dcf8c6" : "#ffffff")};
    width: 13px;
    height: 13px;
    position: absolute;
    ${({ user }) => (user ? "right: 1px;" : "left: 1px;")};
    border-radius: 5px;
    top: 7px;
    transform: ${({ user }) => (user ? "rotate(30deg)" : "rotate(60deg)")};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const CheckIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 45px;
  float: right;  
  margin-top: 11px;
  margin-left: 5px;
`;

const Hours = styled.span`
  font-size: 0.7rem;
  color: #a9a6a7;
`;

const Options = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  color: black;
  padding: 8px 12px;
  border-radius: 10px;
  margin: 5px;
  background-color: #ffffff;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const Paragraph = styled.div`

` 

const checked = (status) => {
  if (status == 0) {
    return <Union1 />;
  }
  if (status == 1) {
    return <Union2 />;
  }
  if (status == 2) {
    return <Union3 />;
  }
};

function getHoraAtual() {
  const dataAtual = new Date();
  const hora = dataAtual.getHours();
  const minuto = dataAtual.getMinutes();

  const horaFormatada = hora < 10 ? `0${hora}` : hora;
  const minutoFormatado = minuto < 10 ? `0${minuto}` : minuto;

  return `${horaFormatada}:${minutoFormatado}`;
}

const Message = ({
  message,
  updateLastMessage,
  addMessageToConversation,
}) => {
  const {options,msg,  user } = message
  const initiStatus = user ? 0 : 2;
  const [status, setStatus] = useState(initiStatus);

  useEffect(() => {
    const waitTime = 500;
    const maxStatus = 2;

    const proximoStatus = () => {
      if (status < maxStatus && user) {
        setStatus(status + 1);
      }
    };

    const interval = setInterval(proximoStatus, waitTime);
    return () => clearInterval(interval);
  }, [status]);
  const answer = (option) => {
    updateLastMessage(message)
    message.resp = option
    addMessageToConversation({userResp: message})
  };

  return (
    msg && (
      <BallonContainer user={user} option={options?.length}>
        <Ballon user={user}>
          <Paragraph>{msg}
          <CheckIcon>
            <Hours>{getHoraAtual()}</Hours>
            {checked(status)}
          </CheckIcon>
          </Paragraph>
          
        </Ballon>
        <Row>
          {options && options.map((op, index) => (
            <Options
              key={index}
              onClick={() => answer(op)}
            >
              {op.option}
            </Options>
          ))}
        </Row>
      </BallonContainer>
    )
  );
};

export default Message;
