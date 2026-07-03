const config: any = {
  env: process.env.REACT_APP_MY_ENV || "dev",

  dev: {
    gatewayURL: "https://adh-api-dev.heartblr.org",
  },
  qa: {
    gatewayURL: "https://adh-api-qa.heartblr.org",
  },
  stg: {
    gatewayURL: "https://adh-api-stg.heartblr.org",
  },
  nfr: {
    gatewayURL: "https://adh-api-nfr.heartblr.org",
  },
  preprod: {
    gatewayURL: "https://adh-api-preprod.heartblr.org",
  },
  prod: {
    gatewayURL: "https://adh-api.heart.org",
  },
  dr: {
    gatewayURL: "https://adh-api.heartblr.org",
  },
  local: {
    gatewayURL: "http://localhost:8080/",
    // gatewayURL: "https://adh-api-dev.heartblr.org",
  },
  // AWS demo/PoC environment - points at the ALB Ingress fronting api-gateway
  // in EKS. Replace with the real ALB DNS name from:
  //   kubectl -n adh-portal get ingress adh-portal-ingress
  // See /DEPLOYMENT.md for the full setup.
  aws: {
    gatewayURL: "http://k8s-adhporta-adhporta-3c9dc52433-1009661923.ap-south-2.elb.amazonaws.com",
  },
};

export default config;
