/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { webpack, isServer }) => {
    if (isServer) {
      config.plugins.push(
        // mute errors for unused typeorm deps
        new webpack.IgnorePlugin({
          resourceRegExp:
            /(^@google-cloud\/spanner|^@mongodb-js\/zstd|^aws-crt|^aws4$|^pg-native$|^mongodb-client-encryption$|^@sap\/hana-client$|^snappy$|^react-native-sqlite-storage$|^bson-ext$|^cardinal$|^kerberos$|^hdb-pool$|^sql.js$|^sqlite3$|^better-sqlite3$|^ioredis$|^typeorm-aurora-data-api-driver$|^pg-query-stream$|^oracledb$|^mysql$|^snappy\/package\.json$|^cloudflare:sockets$)/,
        }),
      );
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
  async rewrites(){
    return [
      {
        source: `/${encodeURIComponent('акции')}`,
        destination: `/promo`,
      },
      {
        source: `/${encodeURIComponent('условия-доставки')}`,
        destination: `/delivery`,
      },
      {
        source: `/${encodeURIComponent('о-компании')}`,
        destination: `/about`,
      },
      {
        source: `/${encodeURIComponent('корзина')}`,
        destination: `/cart`,
      },
      {
        source: `/${encodeURIComponent('оформление-заказа')}`,
        destination: `/checkout`,
      },
      {
        source: `/${encodeURIComponent('профиль')}`,
        destination: `/profile`,
      },
    ]
  }
}

