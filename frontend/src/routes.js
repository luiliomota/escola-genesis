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
import SecretariaNovo from "layouts/secretaria/novo";
import SecretariaAtualizar from "layouts/secretaria/atualizar";

import Coordenacao from "layouts/coordenacao";
import CoordenacaoNovo from "layouts/coordenacao/novo";
import CoordenacaoAtualizar from "layouts/coordenacao/atualizar";

import Professor from "layouts/professor";
import ProfessorNovo from "layouts/professor/novo";
import ProfessorAtualizar from "layouts/professor/atualizar";

import SignIn from "layouts/authentication/sign-in";
import Logout from "layouts/authentication/logout";

// @mui icons
import Icon from "@mui/material/Icon";

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
    type: "title",
    title: "Direção",
    key: "direcao",
  }, 
  {
    type: "collapse",
    name: "Todos",
    key: "direcao/todos",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/direcao/todos",
    component: <Direcao />,
    isPrivate: true,
    perfis: ["DIRECAO"],
  },
  {
    type: "collapse",
    name: "Novo",
    key: "direcao/novo",
    icon: <Icon fontSize="small">table_view</Icon>,
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
    type: "title",
    title: "Secretaria",
    key: "secretaria",
    perfis: ["DIRECAO", "SECRETARIA"],
  }, 
  {
    type: "collapse",
    name: "Todos",
    key: "secretaria/todos",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/secretaria/todos",
    component: <Secretaria />,
    isPrivate: true,
    perfis: ["DIRECAO", "SECRETARIA"],
  },
  {
    type: "collapse",
    name: "Novo",
    key: "secretaria/novo",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/secretaria/novo",
    component: <SecretariaNovo />,
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
    type: "title",
    title: "Coordenação",
    key: "coordenacao",
    perfis: ["DIRECAO","COORDENACAO"],
  },
  {
    type: "collapse",
    name: "Todos",
    key: "coordenacao/todos",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/coordenacao/todos",
    component: <Coordenacao />,
    isPrivate: true,
    perfis: ["DIRECAO","COORDENACAO"],
  },
  {
    type: "collapse",
    name: "Novo",
    key: "coordenacao/novo",
    icon: <Icon fontSize="small">person</Icon>,
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
    type: "title",
    title: "Professor",
    key: "professor",
    perfis: ["DIRECAO","PROFESSOR"],
  },
  {
    type: "collapse",
    name: "Todos",
    key: "professor/todos",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/professor/todos",
    component: <Professor />,
    isPrivate: true,
    perfis: ["DIRECAO","PROFESSOR"],
  },
  {
    type: "collapse",
    name: "Novo",
    key: "professor/novo",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/professor/novo",
    component: <ProfessorNovo />,
    isPrivate: true,
    perfis: ["DIRECAO","PROFESSOR"],
  },
  {
    name: "Atualizar",
    key: "professor/atualizar",
    route: "/professor/atualizar/:id",
    component: <ProfessorAtualizar />,
    isPrivate: true,
    perfis: ["DIRECAO","PROFESSOR"],
  },
  {
    type: "title",
    title: "Autenticação",
    key: "autenticacao",
    perfis: ["DIRECAO"],
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
    type: "collapse",
    name: "Autenticar",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sair",
    key: "sign-up",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/logout",
    component: <Logout />,
  },
];

export default routes;
