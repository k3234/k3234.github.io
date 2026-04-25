// Cloudflare配置
const cloudflareConfig = {
  accountId: import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID || 'd035b02e596cd0040690f689d4c640b8',
  zoneId: import.meta.env.VITE_CLOUDFLARE_ZONE_ID || '9e74b73ee649f98e0b72907a6e364890',
};

export default cloudflareConfig;
