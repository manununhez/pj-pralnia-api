module.exports = {
  apps: [{
    name: 'pj-pralnia',
    script: 'server-pj-pralnia.js',
    watch: true,
    env_production: {
      "NODE_ENV": "production",
    }
  }],
};
