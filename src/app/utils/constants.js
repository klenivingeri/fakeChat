export const data = {
    Question: [
      {
        user: 0,
        msg: "Você tem um tempinho para responder algumas perguntas?",
        type: "option",
        resp: false,
        options: [
          {
            option: "Sim",
          },
          {
            option: "Não",
          },
        ],
      },
      {
        msg: "Você já teve alguma experiência anterior com atividades físicas?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Qual é o seu principal objetivo ao começar a praticar atividades físicas?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Você tem alguma preferência por um tipo específico de exercício ou atividade?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Quais são suas preocupações ou dúvidas sobre começar um programa de exercícios?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Qual é o seu peso atual?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Qual é a sua altura? (Para calcular o índice de massa corporal, se necessário)",
        type: "simple",
        resp: false,
      },
      {
        msg: "Qual é a sua idade atual?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Você tem alguma restrição de tempo ou disponibilidade que possa afetar sua capacidade de se exercitar regularmente?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Como você se sente sobre fazer ajustes na sua dieta e estilo de vida para alcançar um peso saudável?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Muito obrigado por responder o questionario, gostaria de finalizar essa conversa pelo whatsap?",
        type: "option",
        resp: false,
        send: true,
        options: [
          {
            option: "Sim",
            href: "https://api.whatsapp.com/send?phone=5516992227360&text=Ol%C3%A1,%20acabei%20de%20finalizar%20o%20question%C3%A1rio,%20e%20gostaria%20de%20continuar%20a%20conversa%20por%20aqui",
          },
          {
            option: "Não",
          },
        ],
      },
    ],
    Bye: [
      {
        msg: "Entendi, poderia deixar o numero para contato, assim posso retornar outra hora?",
        type: 'validation',
        resp: false,
        needValid: true,
      },
      {
        msg: "Qual seria o melhor horario para contato?",
        type: "simple",
        resp: false,
        send: true,
      },
      {
        msg: "Ok, combinado!",
        type: "simple",
        resp: false,
      }
    ],
  };
  
export const msgInitialSystem = [
    {
      user: 0,
      msg: "Olá, tudo bem?",
      type: "simple",
    },
    {
      user: 0,
      msg: "É muito bom saber que você está interessado em minha consultoria!",
      type: "simple",
    },
    {
      user: 0,
      msg: "Qual seu nome?",
      type: "simple",
    },
  ];