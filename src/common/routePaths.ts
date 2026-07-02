import Login from "pages/Login";

import UsersComp from "pages/Users/Users";

import Profile from "pages/Profile/Profile";
import AccessDenied from "pages/AccessDenied";
import ViewUserDetailsComp from "pages/ViewUserDetails";
import ClientListComp from "pages/Clients/Clients";
import ViewClient from "pages/ViewClient";
import NotificationsSetting from "pages/Notifications/Settings";
import NotificationsList from "pages/Notifications/List";
import ServiceProvider from "pages/Notifications/ServiceProvider";
import Credentials from "pages/Credentials";
import CreateCredential from "pages/Credentials/CreateCredential";
import EditCredentials from "pages/Credentials/EditCredentials";
import Invite from "pages/Invite/Invite";
import EntitiesList from "pages/Configuration/Entities/List";
import AddEntity from "pages/Configuration/Entities/Add";
import NatsConsumersList from "pages/Configuration/Nats/Consumers/List";
import NatsStreamsAdd from "pages/Configuration/Nats/Streams/Add";
import StreamDetailsComp from "pages/Configuration/Nats/Streams/Details";
import NatsCredentialsList from "pages/Configuration/Nats/Credentials/List";
import NatsCredentialsAdd from "pages/Configuration/Nats/Credentials/AddCredential";
import CredentialsDetailsComp from "pages/Configuration/Nats/Credentials/Details";
import Dashboard from "../pages/Dashboard/Dashboard";
import Location from "../pages/Location/Location";
import NatsStreams from "../pages/Configuration/Nats/Streams/List";
import EntityDetailsComp from "../pages/Configuration/Entities/Details/index";

import UserRolesComp from "../pages/UserRoles/UserRoles";
import TransactionalComp from "../pages/TransactionalLogs/TransactionalLogs";
import TransactionalDetailsComp from "../pages/TransactionalLogDetail/TransactionalLogDetail";
import Menu from "../pages/Menu/Menu";
import JsonSchema from "../pages/ViewJsonSchema/ViewJsonSchema";
import PageNotFoundComp from "../pages/PageNotFound";
import LocalLogin from "../pages/LocalLogin";
import CONSTANTS from "./constants";

/* roles option if :
 not added - then route will be available for all roles .
 added - then that route will be available only for roles mentioned in the array 
*/

interface RoutePath {
  path?: string;
  pageTitle: string;
  component: any;
  adminRoute: boolean;
  hideHeaderAndFooter: boolean;
  roles?: string[];
  breadcrumbDisabled: boolean;
}

interface RouteLinksInterface {
  routePaths: RoutePath[];
}

const RouteLinks: RouteLinksInterface = {
  routePaths: [
    {
      path: "/",
      pageTitle: "Login",
      component: Login,
      adminRoute: false,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: true,
    },
    {
      /* Local dev only: bypasses AHA SSO, posts directly to the local
         auth-service via the local api-gateway. Does not replace "/". */
      path: "/local-login",
      pageTitle: "Local Login",
      component: LocalLogin,
      adminRoute: false,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: true,
    },
    {
      path: "/dashboard",
      pageTitle: "Dashboard",
      component: Dashboard,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: false,
    },
    {
      path: "/location",
      pageTitle: "Location",
      component: Location,
      adminRoute: true,
      hideHeaderAndFooter: true,
      breadcrumbDisabled: true,
    },

    {
      path: "/clients",
      pageTitle: "Clients",
      component: ClientListComp,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [
        CONSTANTS.USER_ROLES.SUPER_ADMIN,
        CONSTANTS.USER_ROLES.SUPER_USER,
      ],
      breadcrumbDisabled: false,
    },

    {
      path: "/users",
      pageTitle: "Users",
      component: UsersComp,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: false,
    },
    {
      path: "/profile",
      pageTitle: "My Profile",
      component: Profile,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: false,
    },
    {
      path: "/userRoles",
      pageTitle: "View User Roles",
      component: UserRolesComp,
      adminRoute: true,
      hideHeaderAndFooter: true,
      breadcrumbDisabled: false,
    },
    {
      path: "/accessdenied",
      pageTitle: "Access Denied",
      component: AccessDenied,
      adminRoute: true,
      hideHeaderAndFooter: true,
      breadcrumbDisabled: true,
    },
    {
      path: "/transactionLogs/:id/:type",
      pageTitle: "View Transactional Log",
      component: TransactionalDetailsComp,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: false,
    },
    {
      path: "/transactionLogs",
      pageTitle: "Transactional Logs",
      component: TransactionalComp,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: false,
    },
    {
      path: "/configuration/nats-credentials",
      pageTitle: "NATS Credentials",
      component: NatsCredentialsList,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [CONSTANTS.USER_ROLES.SUPER_ADMIN],
      breadcrumbDisabled: false,
    },
    {
      path: "/configuration/nats-credentials/add",
      pageTitle: "Add NATS Credentials",
      component: NatsCredentialsAdd,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [CONSTANTS.USER_ROLES.SUPER_ADMIN],
      breadcrumbDisabled: false,
    },
    {
      path: "/configuration/nats-credentials/:id",
      pageTitle: "View Credential",
      component: CredentialsDetailsComp,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: false,
      roles: [CONSTANTS.USER_ROLES.SUPER_ADMIN],
    },
    {
      path: "/configuration/nats-streams",
      pageTitle: "NATS Streams",
      component: NatsStreams,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [CONSTANTS.USER_ROLES.SUPER_ADMIN],
      breadcrumbDisabled: false,
    },
    {
      path: "/configuration/nats-streams/add",
      pageTitle: CONSTANTS.BREADCRUMB_HEADING.ADD_NATS_STREAM,
      component: NatsStreamsAdd,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [CONSTANTS.USER_ROLES.SUPER_ADMIN],
      breadcrumbDisabled: false,
    },
    {
      path: "/configuration/nats-streams/:id",
      pageTitle: "View Stream",
      component: StreamDetailsComp,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: false,
    },
    {
      path: "/credentials",
      pageTitle: "Credentials",
      component: Credentials,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [
        CONSTANTS.USER_ROLES.SUPER_ADMIN,
        CONSTANTS.USER_ROLES.CLIENT_ADMIN,
      ],
      breadcrumbDisabled: false,
    },
    {
      path: "/configuration/entities",
      pageTitle: "Entities",
      component: EntitiesList,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [CONSTANTS.USER_ROLES.SUPER_ADMIN],
      breadcrumbDisabled: false,
    },
    {
      path: "/configuration/entities/add",
      pageTitle: "Add Entity",
      component: AddEntity,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: false,
    },
    {
      path: "/configuration/entities/:id",
      pageTitle: "View Entity",
      component: EntityDetailsComp,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: false,
    },
    {
      path: "/configuration/nats-consumers",
      pageTitle: "NATS Consumers",
      component: NatsConsumersList,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [CONSTANTS.USER_ROLES.SUPER_ADMIN],
      breadcrumbDisabled: false,
    },
    {
      path: "/credentials/create",
      pageTitle: CONSTANTS.CREATE_CREDENTIALS_HEADING,
      component: CreateCredential,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [
        CONSTANTS.USER_ROLES.SUPER_ADMIN,
        CONSTANTS.USER_ROLES.CLIENT_ADMIN,
      ],
      breadcrumbDisabled: false,
    },
    {
      path: "/credentials/edit/:id",
      pageTitle: CONSTANTS.EDIT_CREDENTIAL_PERMISSION_HEADING,
      component: EditCredentials,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [
        CONSTANTS.USER_ROLES.SUPER_ADMIN,
        CONSTANTS.USER_ROLES.CLIENT_ADMIN,
      ],
      breadcrumbDisabled: false,
    },
    {
      path: "/users/:id",
      pageTitle: "View User",
      component: ViewUserDetailsComp,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: false,
    },
    {
      path: "/settings",
      pageTitle: "Menu",
      component: Menu,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [CONSTANTS.USER_ROLES.SUPER_ADMIN],
      breadcrumbDisabled: false,
    },
    {
      path: "/settings/:code",
      pageTitle: "Json Schema",
      component: JsonSchema,
      adminRoute: true,
      hideHeaderAndFooter: true,
      roles: [CONSTANTS.USER_ROLES.SUPER_ADMIN],
      breadcrumbDisabled: true,
    },
    {
      path: "/clients/:id",
      pageTitle: "View Client",
      component: ViewClient,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [
        CONSTANTS.USER_ROLES.SUPER_ADMIN,
        CONSTANTS.USER_ROLES.SUPER_USER,
      ],
      breadcrumbDisabled: false,
    },
    {
      path: "/notifications/settings",
      pageTitle: "Notification Setting",
      component: NotificationsSetting,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [CONSTANTS.USER_ROLES.CLIENT_ADMIN],
      breadcrumbDisabled: false,
    },
    {
      path: "/notifications",
      pageTitle: "Notifications",
      component: NotificationsList,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [CONSTANTS.USER_ROLES.SUPER_ADMIN],
      breadcrumbDisabled: false,
    },
    {
      path: "/serviceProviders",
      pageTitle: "Service Providers",
      component: ServiceProvider,
      adminRoute: true,
      hideHeaderAndFooter: false,
      roles: [CONSTANTS.USER_ROLES.SUPER_ADMIN],
      breadcrumbDisabled: false,
    },
    {
      path: "/invite",
      pageTitle: "Invite",
      component: Invite,
      adminRoute: false,
      hideHeaderAndFooter: true,
      breadcrumbDisabled: false,
    },
    /* {
      path: "/snapshotdemo",
      pageTitle: "Snapshot SDK",
      component: SnapshotPage,
      adminRoute: true,
      hideHeaderAndFooter: false,
    }, */

    /* Rollback to NotFound Page in case of any invalid url - post login */

    {
      path: "/NotFound",
      pageTitle: "Page Not Found",
      component: PageNotFoundComp,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: true,
    },
    {
      pageTitle: "Page Not Found",
      component: PageNotFoundComp,
      adminRoute: true,
      hideHeaderAndFooter: false,
      breadcrumbDisabled: true,
    },
  ],
};
export default RouteLinks;
