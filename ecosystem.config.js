module.exports = {
  apps: [
    {
      name: 'front-caritas',
      script: 'npm',
      args: 'run deploy',
      ignore_watch: ['node_modules']
    }
  ]
};
