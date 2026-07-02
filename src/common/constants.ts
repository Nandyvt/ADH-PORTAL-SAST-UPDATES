const WINDOW = window as any;
const CONSTANTS = {
  PENDING: "PENDING",
  REGISTRED: "APPROVED",
  INTERNATIONAL: "INTERNATIONAL",
  DOMESTIC: "DOMESTIC",
  LOCAL_STORE_KEY: "#%$##%$#",
  WEB_STORE_KEY: `oidc.user:${process.env.REACT_APP_SSO_authority}:${process.env.REACT_APP_SSO_client_id}`,
  WINDOW,
  PAGE_ROUTES: {
    DASHBOARD: "/dashboard",
    LOCATION: "/location",
    VIEWTENANT: "/tenants",
    LOGIN: "/",
    EDIT_TENANT: "/tenants/update",
    TENANTS: "/tenants",
    CLIENTS: "/clients",
    USERS: "/users",
    INVITE_USER: "/users/invite",
    CREDENTIALS: "/credentials",
    PROFILE: "/profile",
    ACCESSDENIED: "/accessdenied",
    TRANSACTIONLOGS: "/transactionLogs",
    NATS_STREAM_LISTING: "/configuration/nats-streams",
    NATS_STREAM_CREATE: "/configuration/nats-streams/add",
    NATS_CREDENTIALS_CREATE: "/configuration/nats-credentials/add",
    NATS_CREDENTIALS_LISTING: "/configuration/nats-credentials",
    NATS_ENTITIES_LISTING: "/configuration/entities",
    VIEW_ENTITY: "/configuration/entities",
    ADD_ENTITY: "/configuration/entities/add",
  },
  REGEX: {
    ALPHANUMERIC_SPECIALCHAR: "^[a-zA-Z0-9!@#$&()-.,]*$",
    NAME_ONLYCHAR: /^[a-zA-Z\\ ]+$/,
    ATLEAST_TWO_ALPHANUMERIC: /^[a-zA-Z0-9@#$&()., -]{2,}$/,
    ATLEAST_ONE_ALPHANUMERIC:
      /^[a-zA-Z0-9].*[a-zA-Z0-9]$/ /* sonarqube catastrophic backtracking security fix */,
    EMAIL:
      /^\w+(?:\.\w+){0,2}@\w+(?:\.\w+){0,2}(\.\w{2,3})$/ /* sonarqube catastrophic backtracking security fix */,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    ONLY_APHACHAR: /[^a-zA-Z_\s]/,
    USERNAME: /^(?=.*[A-Za-z])[A-Za-z]+(_[A-Za-z]+)*$/,
  },
  KEY_ENTER: 13,
  KEY_SPACEBAR: 32,
  KEY_ESCAPE: 27,
  KEY_DOWN: 40,
  KEY_UP: 38,
  ROLE_STATUS: {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    PENDING: "PENDING",
    SLICE_COUNT: 4,
  },
  TENANT_STATUS: {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
  },
  CLIENT_STATUS: {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
  },
  USER_STATUS: {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
  },
  CREDENTIAL_STATUS: {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
  },
  API_SERVICE_ENDPOINT: {
    ACCOUNT_V1: "/account/v1",
    HUB_V1: "/hub/v1",
    NOTIFICATION_V1: "/notification/v1",
  },
  PAGINATION_LIMIT: 5,
  MAX_RECORDS: 500,
  SIDE_MENU_ICONS: {
    DASHBOARD: "dashboard",
    TENANTS: "tenants",
    CLIENTS: "clients",
    USERS: "users",
    CREDENTIALS: "padlock-thick",
    DATAHUB: "data",
    SETTINGS: "settings-thick",
    DOCUMENTATION: "documentation",
    NOTIFICATION: "bell",
  },
  USER_ROLES: {
    SUPER_ADMIN: "SUPER_ADMIN",
    SUPER_USER: "SUPER_USER",
    CLIENT_ADMIN: "CLIENT_ADMIN",
    CLIENT_USER: "CLIENT_USER",
  },
  DASHBOARD_TRANSLOG_RECORDS: 4,
  MODAL_INSTRUCTION_TEXT: "Field marked with an asterisk (*) are mandatory",
  NOTIFICATION_TYPE_ID: {
    EMAIL: 1,
    SMS: 2,
    HTTP: 3,
  },
  ROLE_SWITCH_SEL_VALUE: "adhSelectedUserRole",
  AUI_CUSTOM_EVENTS: {
    PAGINATION_CHANGE: "auiPageChange",
  },
  HEADER_LOGO: {
    LOGO_WITHOUT_ADH:
      "https://adh-api-doc.heart.org/email-template/aha-logo-header.svg",
    LOGO_WITH_ADH:
      "https://adh-api-doc.heart.org/email-template/aha-logo-header-adh-service.svg",
  },
  CHARACTERS_COUNT_DESCRIPTION: 255,
  NUMBER_OF_RECORDS: {
    TRANSLOG_PAGE: [20, 50],
  },
  ERROR_MESSAGE: {
    STREAMS: {
      LIST_SEARCH: "Stream / Client Not Found",
    },
    CREDENTIALS: {
      LIST_SEARCH: "Username Not Found",
    },
    ENTITIES: {
      LIST_SEARCH: "Entity Not Found",
    },
  },

  PLACEHOLDER_TEXT: {
    STREAMS: {
      LIST_SEARCH: "Search Stream Name / Client Name / Client Code",
      USERNAME_LIST_SEARCH: "Search Username",
    },
    ENTITIES: {
      LIST_SEARCH: "Search Name / Code",
    },
  },
  BREADCRUMB_HEADING: {
    ADD_NATS_STREAM: "Add NATS Stream",
    ADD_NATS_CREDENTIAL: "Add NATS Credential",
    ADD_NATS_CONSUMER: "Add NATS Consumer",
    ADD_ENTITY: "Add Entity",
  },

  CONSUMER_LIST_NO_DATA_HEADING: "No Consumer under this stream",
  CREATE_CREDENTIALS_HEADING: "Create API Credentials",
  EDIT_CREDENTIAL_PERMISSION_HEADING: "Edit API Permissions",
  FORM_PAYLOAD_API_CHANNEL: "API",
};

export default CONSTANTS;
