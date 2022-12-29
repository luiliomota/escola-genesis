/**
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
 */

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Direcao from "layouts/direcao";
import DirecaoNovo from "layouts/direcao/novo";
import DirecaoAtualizar from "layouts/direcao/atualizar";
import DirecaoComparador from "layouts/direcao/comparador";

import Secretaria from "layouts/secretaria";
import SecretariaCadastroResponsavel from "layouts/secretaria/responsavel";
import SecretariaCadastroResponsavelNovo from "layouts/secretaria/responsavel/novo";
import SecretariaCadastroResponsavelModificar from "layouts/secretaria/responsavel/modificar";
import SecretariaCadastroAluno from "layouts/secretaria/cadastroAluno";
import SecretariaCadastroAlunoNovo from "layouts/secretaria/cadastroAluno/novo";
import SecretariaCadastroAlunoModificar from "layouts/secretaria/cadastroAluno/modificar";
import SecretariaRequerimentoMatricula from "layouts/secretaria/requerimentoMatricula";
import SecretariaContrato from "layouts/secretaria/contrato";
import SecretariaAtualizar from "layouts/secretaria/atualizar";

import Coordenacao from "layouts/coordenacao";
import CoordenacaoNovo from "layouts/coordenacao/novo";
import CoordenacaoAtualizar from "layouts/coordenacao/atualizar";

import Disciplinas from "layouts/professor";
import LancarNotas from "layouts/professor/lancarnotas";
import Frequencia from "layouts/professor/frequencia";

import SignIn from "layouts/authentication/sign-in";
import Logout from "layouts/authentication/logout";

// @mui icons
import Icon from "@mui/material/Icon";
import HowToRegIcon from '@mui/icons-material/HowToReg';

const routes = [
  {
    // type: "collapse",
    // name: "Resumos",
    key: "dashboard",
    // icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    isPrivate: true,
  },
  {
    type: "titleDirecao",
    title: "Direção",
    key: "direcao",
  }, 
  {
    type: "collapseDirecao",
    name: "Relatórios",
    key: "direcao/todos",
    icon: <Icon fontSize="small">summarize</Icon>,
    route: "/direcao/todos",
    component: <Direcao />,
    isPrivate: true,
    perfis: ["DIRECAO"],
  },
  {
    type: "collapseDirecao",
    name: "Declaração",
    key: "direcao/novo",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/direcao/novo",
    component: <DirecaoNovo/>,
    isPrivate: true,
    perfis: ["DIRECAO"],
  },
  {
    key: "direcao/atualizar",
    route: "/direcao/atualizar/:id",
    component: <DirecaoAtualizar />,
    isPrivate: true,
    perfis: ["DIRECAO"],
  },
  {
    key: "direcao/comparador",
    route: "/direcao/comparador/:id",
    component: <DirecaoComparador />,
    isPrivate: true,
    perfis: ["DIRECAO"],
  },

  {
    type: "titleSecretaria",
    title: "Secretaria",
    key: "secretaria",
  },
  {
    type: "TitleCadastroSecretaria",
    title: "Cadastros",
    key: "cadastros",
  },
  {
    type: "collapseCadastroSecretaria",
    name: "Pai/Mãe/Responsável",
    key: "secretaria/cadastroresponsavel",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/cadastroresponsavel",
    component: <SecretariaCadastroResponsavel />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    // type: "collapseCadastroSecretaria",
    // name: "Aluno(a)",
    key: "secretaria/cadastroresponsavel/novo",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/cadastroresponsavel/novo",
    component: <SecretariaCadastroResponsavelNovo />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    // type: "collapseCadastroSecretaria",
    // name: "Aluno(a)",
    key: "secretaria/cadastroresponsavel/modificar",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/cadastroresponsavel/modificar/:id",
    component: <SecretariaCadastroResponsavelModificar />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    type: "collapseCadastroSecretaria",
    name: "Aluno(a)",
    key: "secretaria/cadastroaluno",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/cadastroaluno",
    component: <SecretariaCadastroAluno />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    // type: "collapseCadastroSecretaria",
    // name: "Aluno(a)",
    key: "secretaria/cadastroaluno/novo",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/cadastroaluno/novo",
    component: <SecretariaCadastroAlunoNovo />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    // type: "collapseCadastroSecretaria",
    // name: "Aluno(a)",
    key: "secretaria/cadastroaluno/modificar",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/cadastroaluno/modificar/:id",
    component: <SecretariaCadastroAlunoModificar />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    type: "TitleRelatorioSecretaria",
    title: "Relatórios",
    key: "Relatorios",
  },
  {
    type: "collapseRelatorioSecretaria",
    name: "Requerimento matrícula",
    key: "secretaria/requerimentomatricula",
    icon: <Icon fontSize="small">summarize</Icon>,
    route: "/secretaria/requerimentomatricula",
    component: <SecretariaRequerimentoMatricula />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    type: "collapseRelatorioSecretaria",
    name: "Contrato",
    key: "secretaria/contrato",
    icon: <Icon fontSize="small">summarize</Icon>,
    route: "/secretaria/contrato",
    component: <SecretariaContrato />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    key: "secretaria/atualizar",
    route: "/secretaria/atualizar/:id",
    component: <SecretariaAtualizar />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },

  {
    type: "titleCoordenacao",
    title: "Coordenação",
    key: "coordenacao",
  },
  {
    type: "collapseCoordenacao",
    name: "Exemplo1",
    key: "coordenacao/todos",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/coordenacao/todos",
    component: <Coordenacao />,
    isPrivate: true,
    perfis: ["DIRECAO","COORDENACAO"],
  },
  {
    type: "collapseCoordenacao",
    name: "Exemplo2",
    key: "coordenacao/novo",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/coordenacao/novo",
    component: <CoordenacaoNovo />,
    isPrivate: true,
    perfis: ["DIRECAO","COORDENACAO"],
  },
  {
    name: "Atualizar",
    key: "coordenacao/atualizar",
    route: "/coordenacao/atualizar/:id",
    component: <CoordenacaoAtualizar />,
    isPrivate: true,
    perfis: ["DIRECAO","COORDENACAO"],
  },

  {
    type: "titleProfessor",
    title: "Professor",
    key: "professor",
  },
  {
    type: "collapseProfessor",
    name: "Disciplinas",
    key: "professor/todos",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/professor/todos",
    component: <Disciplinas />,
    isPrivate: true,
    perfis: ["DIRECAO","PROFESSOR"],
  },
  {
    name: "Lançar Notas",
    key: "disciplina/lancarnotas",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/disciplina/lancarnotas/:idDisciplina",
    component: <LancarNotas />,
    isPrivate: true,
    perfis: ["DIRECAO","PROFESSOR"],
  },
  {
    name: "Frequência",
    key: "disciplina/frequencia",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/disciplina/frequencia/:idDisciplina",
    component: <Frequencia />,
    isPrivate: true,
    perfis: ["DIRECAO","PROFESSOR"],
  },

  {
    type: "titleAutenticacao",
    title: "Autenticação",
    key: "autenticacao",
    perfis: ["DIRECAO","SECRETARIA","COORDENACAO","PROFESSOR"],
  },
  // {
  //   type: "collapse",
  //   name: "Notificações",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  //   isPrivate: true,
  // },
  {
    // type: "collapseAutenticacao",
    // name: "Autenticar",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapseAutenticacao",
    name: "Sair",
    key: "sign-up",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/logout",
    component: <Logout />,
  },
];

export default routes;
