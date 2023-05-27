module.exports = {
  apps: [
    {
      name: 'front-caritas',
      script: 'npm',
      args: 'run deploy',
      ignore_watch: ['node_modules']
    }
  ],

  deploy: {
    production: {
      "user": "debian",
      "key": "~/.ssh/caritas.pem",
      "host": ["141.94.105.207"],
      "ref": "origin/develop",
      "repo": "git@github.com:balbastrex/front-caritas.git",
      "path": "/home/debian/front-caritas"
    }
  }
};
