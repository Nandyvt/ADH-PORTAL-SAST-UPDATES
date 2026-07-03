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
  // AWS demo/PoC environment - API calls route through CloudFront (/account/*,
  // /hub/*) which proxies to the ALB Ingress fronting api-gateway in EKS.
  // Using the CloudFront domain avoids mixed-content and CORS issues.
  aws: {
    gatewayURL: "https://d9cdknxkhhfuj.cloudfront.net",
  },
};

export default config;
