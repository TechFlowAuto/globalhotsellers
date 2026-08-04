import config from './site.config.json'

export const siteConfig = {
  ...config,
  // 商品页品牌字段
  productLabel: 'View Deal',
}

export type SiteConfig = typeof siteConfig
