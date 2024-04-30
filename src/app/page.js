"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Avatar from "./components/Avatar";
import BoxName from "./components/BoxName";
import Smiley from "../../public/Smiley";
import Message from "./components/Message";
import Send from "../../public/Send";

const Question = [
  {
    msg: 'Você já teve alguma experiência anterior com atividades físicas?',
    answer:'',
  },
  {
    msg: 'Qual é o seu principal objetivo ao começar a praticar atividades físicas?',
    answer:''
  },
  {
    msg: 'Você tem alguma preferência por um tipo específico de exercício ou atividade?',
    answer:''
  },
  {
    msg: 'Quais são suas preocupações ou dúvidas sobre começar um programa de exercícios?',
    answer:''
  },
  {
    msg: 'Qual é o seu peso atual?',
    answer:''
  },
  {
    msg: 'Qual é a sua altura? (Para calcular o índice de massa corporal, se necessário)',
    answer:''
  },
  {
    msg: 'Qual é a sua idade atual?',
    answer:''
  },
  {
    msg: 'Você tem alguma restrição de tempo ou disponibilidade que possa afetar sua capacidade de se exercitar regularmente?',
    answer:''
  },
  {
    msg: 'Como você se sente sobre fazer ajustes na sua dieta e estilo de vida para alcançar um peso saudável?',
    answer:''
  },
  {
    msg: 'Muito obrigado por responder o questionario, gostaria de finalizar essa conversa pelo whatsap?',
    type: "simple",
    options: ["Sim", "Não"],
    href:'https://api.whatsapp.com/send?phone=5516992227360&text=Ol%C3%A1,%20acabei%20de%20finalizar%20o%20question%C3%A1rio,%20e%20gostaria%20de%20continuar%20a%20conversa%20por%20aqui',
    answer:''
  },
]

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
  padding: 10px;
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
  height: 50px;
  padding-left: 4px;
  margin-left: 10px;
`;

export default function Chat() {
  const [count, setCount] = useState(0);
  const [countQuestion, setCountQuestion] = useState(0);
  const [isWrite, serIsWrite] = useState(false);
  const [mensagens, setMensagens] = useState([]);
  const [mensagemAtual, setMensagemAtual] = useState("");
  const lastBallonRef = useRef(null);

  const newQuestion = (newMensagens) =>{
    setMensagens([
      ...newMensagens,
      {
        user: 0,
        ...Question[countQuestion],
      },
    ])
    setCountQuestion(countQuestion+1)
  }

  const UpdateOptions = (msg) => {
    if(msg)
    mensagens[mensagens.length -1] = {
      user: 0,
      msg 
    }
  }

  const enviarMensagem = (value) => {
    if (mensagemAtual.trim() || value) {
      const newMensagens = [
        ...mensagens,
        {
          user: 1,
          msg: value? value : mensagemAtual,
        },
      ]
      serIsWrite(false);
      setMensagens(newMensagens);
      setMensagemAtual("");

      setTimeout(() => {
        serIsWrite(true)
        newQuestion(newMensagens)
      }, 2500)
    }
  };

  useEffect(() => {
    const waitTime = 1500;
    const maxCount = 2;
    let msg;
    const proxMessage = () => {
      serIsWrite(true);
      if (count <= maxCount) {
        if (count == 0) {
          msg = {
            user: 0,
            msg: "Olá, tudo bem?",
          };
        } else if (count == 1) {
          msg = {
            user: 0,
            msg: "É muito bom saber que você está interessado em minha consultoria!",
          };
        } else if (count == 2) {
          msg = {
            user: 0,
            msg: "Você tem um tempinho para responder algumas perguntas?",
            type: "simple",
            options: ["Sim", "Não"],
          };
        }
        serIsWrite(false);
        setCount(count + 1);
        setMensagens([...mensagens, msg]);
      }
    };

    const interval = setTimeout(proxMessage, waitTime);

    return () => clearTimeout(interval);
  }, [count]);

  useEffect(() => {
    if (lastBallonRef.current) {
      lastBallonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensagens]);
  return (
    <Container>
      <Topo>
        <Description>
          <Avatar />
          <BoxName isWrite={isWrite} />
        </Description>
        <div>||</div>
      </Topo>
      <Mensagens>
        {mensagens.map(({ user, msg, options, type, href }, index) => (
          <Message
            key={index}
            isUser={user}
            msg={msg}
            options={options}
            type={type}
            href={href}
            enviarMensagem={enviarMensagem}
            UpdateOptions={UpdateOptions}
          />
        ))}
        <div ref={lastBallonRef} />
      </Mensagens>
      <Rodape>
        <InputFake>
          <Smiley />
          <InputMensagem
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
          onClick={(e) => {
            enviarMensagem();
          }}
        >
          <Send />
        </BoxSend>
      </Rodape>
    </Container>
  );
}
