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
import Tratamento from "layouts/tratamento";
import TratamentoNovo from "layouts/tratamento/novo";
import TratamentoAtualizar from "layouts/tratamento/atualizar";
import TratamentoComparador from "layouts/tratamento/comparador";
import Paciente from "layouts/paciente";
import PacienteNovo from "layouts/paciente/novo";
import PacienteEditar from "layouts/paciente/editar";

import Usuario from "layouts/usuario";
import UsuarioNovo from "layouts/usuario/novo";
import UsuarioAtualizar from "layouts/usuario/atualizar";
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
    key: "tratamentos",
  }, 
  {
    type: "collapse",
    name: "Todos",
    key: "tratamento/todos",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tratamento/todos",
    component: <Tratamento />,
    isPrivate: true,
    perfis: ["DIRECAO"],
  },
  {
    type: "collapse",
    name: "Novo",
    key: "tratamento/novo",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tratamento/novo",
    component: <TratamentoNovo/>,
    isPrivate: true,
    perfis: ["DIRECAO"],
  },
  {
    key: "tratamento/atualizar",
    route: "/tratamento/atualizar/:id",
    component: <TratamentoAtualizar />,
    isPrivate: true,
    perfis: ["DIRECAO"],
  },
  {
    key: "tratamento/comparador",
    route: "/tratamento/comparador/:id",
    component: <TratamentoComparador />,
    isPrivate: true,
    perfis: ["DIRECAO"],
  },
  {
    type: "title",
    title: "Secretaria",
    key: "pacientes",
    perfis: ["DIRECAO", "SECRETARIA"],
  }, 
  {
    type: "collapse",
    name: "Todos",
    key: "paciente/todos",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/paciente/todos",
    component: <Paciente />,
    isPrivate: true,
    perfis: ["DIRECAO", "SECRETARIA"],
  },
  {
    type: "collapse",
    name: "Novo",
    key: "paciente/novo",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/paciente/novo",
    component: <PacienteNovo />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    key: "paciente/editar",
    route: "/paciente/editar/:id",
    component: <PacienteEditar />,
    isPrivate: true,
    perfis: ["DIRECAO","SECRETARIA"],
  },
  {
    type: "title",
    title: "Coordenação",
    key: "usuarios",
    perfis: ["DIRECAO","COORDENACAO"],
  },
  {
    type: "collapse",
    name: "Todos",
    key: "usuario/todos",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/usuario/todos",
    component: <Usuario />,
    isPrivate: true,
    perfis: ["DIRECAO","COORDENACAO"],
  },
  {
    type: "collapse",
    name: "Novo",
    key: "usuario/novo",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/usuario/novo",
    component: <UsuarioNovo />,
    isPrivate: true,
    perfis: ["DIRECAO","COORDENACAO"],
  },
  {
    name: "Atualizar",
    key: "usuario/atualizar",
    route: "/usuario/atualizar/:id",
    component: <UsuarioAtualizar />,
    isPrivate: true,
    perfis: ["DIRECAO","COORDENACAO"],
  },
  {
    type: "title",
    title: "Professor",
    key: "usuarios",
    perfis: ["DIRECAO","PROFESSOR"],
  },
  {
    type: "collapse",
    name: "Todos",
    key: "usuario/todos",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/usuario/todos",
    component: <Usuario />,
    isPrivate: true,
    perfis: ["DIRECAO","PROFESSOR"],
  },
  {
    type: "collapse",
    name: "Novo",
    key: "usuario/novo",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/usuario/novo",
    component: <UsuarioNovo />,
    isPrivate: true,
    perfis: ["DIRECAO","PROFESSOR"],
  },
  {
    name: "Atualizar",
    key: "usuario/atualizar",
    route: "/usuario/atualizar/:id",
    component: <UsuarioAtualizar />,
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
