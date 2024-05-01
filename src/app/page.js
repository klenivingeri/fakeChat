"use client";

import React, { useState, useEffect, useRef } from "react";
import { sendEmail, testEnd } from "./server";
import styled from "styled-components";
import Avatar from "./components/Avatar";
import BoxName from "./components/BoxName";
import Smiley from "../../public/Smiley";
import Message from "./components/Message";
import Send from "../../public/Send";
import { data } from "./utils/constants";
import numberIsValid from "./utils/isNumero";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding-top: 60px;
  background-image: url("./wallpapers.jpg");
`;

const Topo = styled.div`
  background-color: #075e54;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  padding: 10px 10px 5px 10px;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Mensagens = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const Rodape = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  padding: 10px;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const InputMensagem = styled.input`
  height: 45px;
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  outline: none;
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
`;
const InputFake = styled.div`
  background-color: white;
  border-radius: 999px;
  padding: 1px 0 1px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const BoxSend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #075e54;
  border-radius: 999px;
  width: 54px;
  height: 48px;
  padding-left: 3.5px;
  margin-left: 10px;
`;

const queryURL = (name) => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  return params.get(name);
}

export default function Chat() {
  const inputRef = useRef(null);
  const lastBallonRef = useRef(null);
  const [count, setCount] = useState(0);
  const [isWrite, serIsWrite] = useState(true);
  const [mensagens, setMensagens] = useState([]);
  const [nameList, setNameList] = useState("question");
  const [mensagemAtual, setMensagemAtual] = useState("");
  const [countQuestion, setCountQuestion] = useState(0);
  const [chatName, setChatName] = useState('');

  const  addedNewQuestion = async (
    _newMensagens,
    updatedNameList,
    mensagemAtual,
    value
  ) => {
    const warning = {};
    let needToValidate = false;
    const newNameList = !!updatedNameList ? updatedNameList : nameList;
    const previousQuestion = _newMensagens[_newMensagens.length - 2];
    const newMsg = data[chatName][newNameList][!!updatedNameList ? 0 : countQuestion];

    if(data[chatName][newNameList].length !== countQuestion) {
      if (previousQuestion.needValid && !numberIsValid(mensagemAtual.trim())) {
        warning.msg = "Ops, acho que faltou algum numero ^^";
        warning.needValid = true;
        needToValidate = true;
      }
  
      const post = needToValidate ? warning : newMsg;
      const newMensagens = [
        ..._newMensagens,
        {
          user: 0,
          ...post,
        },
      ];
  
      setMensagens(newMensagens);
    } 
    
    if (
      !!previousQuestion.send &&
      value == "Sim"
    ) {
      console.log ('Entrei no redirect')
        await sendEmail(_newMensagens, chatName);
        window.location.href = data[chatName].whatsapp;
        return
    } else if (previousQuestion.send && !previousQuestion.options && previousQuestion.type === 'email') {
      sendEmail(_newMensagens, chatName);
    }
    
    if(data[chatName][newNameList].length === countQuestion){
      setMensagens([..._newMensagens,{
        user: 0,
        msg: "O chat já foi encerrado, gostaria de continuar a conversa pelo whatsapp?",
        type: "option",
        send: true,
        options: [
          {
            option: "Sim",
            href: data[chatName].whatsapp,
          },
        ]
      }]);
    }
 


    if (updatedNameList) {
      setNameList(updatedNameList);
      if (needToValidate) {
        setCountQuestion(0);
      } else {
        setCountQuestion(1);
      }
    } else {
      if (!needToValidate) {
        setCountQuestion((prevCount) => prevCount + 1);
      }
    }
  };

  const deleteOptions = (msg, send) => {
    if (msg)
      mensagens[mensagens.length - 1] = {
        user: 0,
        msg,
        send,
      };
  };

  const enviarMensagem = (value, updatedNameList) => {
    inputRef.current.focus();
    const lastMenssageHasOptions = !!mensagens[mensagens.length - 1]?.options;
    if (lastMenssageHasOptions || isWrite) {
      return;
    }

    if (!!updatedNameList) {
      setCountQuestion(0);
    }

    if (mensagemAtual.trim() || value) {
      const newMensagens = [
        ...mensagens,
        {
          user: 1,
          msg: !!value ? value : mensagemAtual,

        },
      ];

      serIsWrite(true);
      setMensagens(newMensagens);

      if (!value) {
        setMensagemAtual("");
      }

      setTimeout(() => {
        serIsWrite(false);
        addedNewQuestion(newMensagens, updatedNameList, mensagemAtual, value);
      }, 500);
    }
  };
  
  useEffect(() => {
    const name = queryURL('chat')
    setChatName(name)
    const waitTime = 1500;
    const maxCount = 2;
    if(!!name){
    const proxMessage = () => {
      if (count <= maxCount) {
        serIsWrite(true);
        setMensagens([...mensagens, data[name]?.msgInitialSystem[count]]);
        setCount(count + 1);
      }
      if (count == maxCount) {
        serIsWrite(false);
      }
    };

    const interval = setTimeout(proxMessage, waitTime);

    return () => clearTimeout(interval);
    }

  }, [count]);

  useEffect(() => {
    if (lastBallonRef.current) {
      lastBallonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensagens]);

  useEffect(() => {

  },[])

  return (
    <Container>
      <Topo>
        <Description>
          <Avatar img={data[chatName]?.image }/>
          <BoxName name={data[chatName]?.name} isWrite={isWrite} />
        </Description>
        <div>||</div>
      </Topo>
      <Mensagens>
        {mensagens.map(({ user, msg, options, type, send }, index) => (
          <Message
            key={index}
            isUser={user}
            msg={msg}
            options={options}
            send={send}
            enviarMensagem={enviarMensagem}
            deleteOptions={deleteOptions}
          />
        ))}
        <div ref={lastBallonRef} />
      </Mensagens>
      <Rodape>
        <InputFake>
          <Smiley />
          <InputMensagem
            ref={inputRef}
            type="text"
            placeholder="Digite sua mensagem..."
            value={mensagemAtual}
            onChange={(e) => setMensagemAtual(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enviarMensagem();
              }
            }}
          />
        </InputFake>
        <BoxSend
          onClick={() => {
            enviarMensagem();
          }}
        >
          <Send />
        </BoxSend>
      </Rodape>
    </Container>
  );
}
