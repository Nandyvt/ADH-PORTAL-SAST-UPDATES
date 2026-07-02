import { WebStorageStateStore } from "oidc-client";

export default {
  authority: process.env.REACT_APP_SSO_authority,
  client_id: process.env.REACT_APP_SSO_client_id,
  redirect_uri: process.env.REACT_APP_SSO_redirect_uri,
  response_type: process.env.REACT_APP_SSO_response_type,
  scope: process.env.REACT_APP_SSO_scope,
  post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  revokeAccessTokenOnSignout: true,
};
