let DEVELOPMENT_ENVIRONMENT = true;

export const DOMAIN = DEVELOPMENT_ENVIRONMENT ? 'http://127.0.0.1:3000' : 'https://candidatexyz.com';
export const WEBSITE_DOMAIN = DEVELOPMENT_ENVIRONMENT ? 'http://127.0.0.1:3001' : 'https://demo.candidatexyz.com';
export const VOLUNTEER_API_DOMAIN = DEVELOPMENT_ENVIRONMENT ? 'http://127.0.0.1:3002' : 'https://api.candidatexyz.com';
export const USER_API_DOMAIN = DEVELOPMENT_ENVIRONMENT ? 'http://127.0.0.1:3003' : 'https://auth.candidatexyz.com';
export const MAILER_API_DOMAIN = DEVELOPMENT_ENVIRONMENT ? 'http://127.0.0.1:3004' : 'https://mailer.candidatexyz.com';
