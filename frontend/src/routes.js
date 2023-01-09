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
import SecretariaResponsavel from "layouts/secretaria/aluno/responsavel";
import SecretariaResponsavelNovo from "layouts/secretaria/aluno/responsavel/novo";
import SecretariaResponsavelModificar from "layouts/secretaria/aluno/responsavel/modificar";
import SecretariaAluno from "layouts/secretaria/aluno";
import SecretariaAlunoNovo from "layouts/secretaria/aluno/novo";
import SecretariaAlunoModificar from "layouts/secretaria/aluno/modificar";
import SecretariaProfessor from "layouts/secretaria/professor";
import SecretariaProfessorNovo from "layouts/secretaria/professor/novo";
import SecretariaProfessorModificar from "layouts/secretaria/professor/modificar";
import SecretariaDisciplina from "layouts/secretaria/disciplina";
import SecretariaDisciplinaNovo from "layouts/secretaria/disciplina/novo";
import SecretariaDisciplinaModificar from "layouts/secretaria/disciplina/modificar";
import SecretariaRequerimentoMatricula from "layouts/secretaria/aluno/requerimentoMatricula";
import SecretariaContrato from "layouts/secretaria/aluno/contrato";
// import SecretariaAtualizar from "layouts/secretaria/atualizar";

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
    key: "secretaria/responsavel",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/responsavel",
    component: <SecretariaResponsavel />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    key: "secretaria/responsavel/novo",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/responsavel/novo",
    component: <SecretariaResponsavelNovo />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    key: "secretaria/responsavel/modificar",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/responsavel/modificar/:id",
    component: <SecretariaResponsavelModificar />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    type: "collapseCadastroSecretaria",
    name: "Aluno(a)",
    key: "secretaria/aluno",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/aluno",
    component: <SecretariaAluno />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    key: "secretaria/aluno/novo",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/aluno/novo",
    component: <SecretariaAlunoNovo />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    key: "secretaria/aluno/modificar",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/aluno/modificar/:id",
    component: <SecretariaAlunoModificar />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    type: "collapseCadastroSecretaria",
    name: "Professor(a)",
    key: "secretarial/professor",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/professor",
    component: <SecretariaProfessor />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    key: "secretaria/professor/novo",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/professor/novo",
    component: <SecretariaProfessorNovo />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    key: "secretaria/professor/modificar",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/professor/modificar/:id",
    component: <SecretariaProfessorModificar />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    type: "collapseCadastroSecretaria",
    name: "Disciplina",
    key: "secretarial/disciplina",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/disciplina",
    component: <SecretariaDisciplina />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    key: "secretaria/disciplina/novo",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/disciplina/novo",
    component: <SecretariaDisciplinaNovo />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    key: "secretaria/disciplina/modificar",
    icon: <HowToRegIcon fontSize="small">howtoreg</HowToRegIcon>,
    route: "/secretaria/disciplina/modificar/:id",
    component: <SecretariaDisciplinaModificar />,
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
  // {
  //   key: "secretaria/atualizar",
  //   route: "/secretaria/atualizar/:id",
  //   component: <SecretariaAtualizar />,
  //   isPrivate: true,
  //   perfis: ["DIRECAO","SECRETARIA"],
  // },

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
