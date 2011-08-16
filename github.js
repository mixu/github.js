
var Collection = require('./pixiedust').Collection;
var Client = require('./pixiedust').Client;
var Oauth = require('./pixiedust').Oauth2;

Collection.client = Client({ 
  host: 'api.github.com',
  port: 443,
  secure: true,
  auth: new Oauth(require('./config.js'))
});

var Github = {};

Github.users = Collection.initialize('user', {
  default_string: 'user',
  read: {
    url: '/users/{user}'
  },
  current: {
    read: {
      url: '/user'
    },
    update: {
      url: '/user',
      method: 'PATCH'
    }
  },
  has_many: {
    repos: Collection.initialize('repo', {
        create: {   
          url: '/user/repos'
        },
        read: {   
          url: '/repos/{user}/{id}'
        },
        update: {
          url: '/repos/{user}/{id}',
          method: 'PATCH'
        },
        del: {
          url: '/repos/{user}/{id}'      
        },
        list: {
          url: '/users/{user}/repos',
          filter: { 
            by_type: {
              param: 'type',
            }
          },
        },
        find: {
          by_user: {
            url: '/users/{user}/repos'
          },
          by_organization: {
            url: '/orgs/{organization}/repos'
          },
        },
        has_many: {
          commits: Collection.initialize('commit', {
            read: {
              url: '/repos/{user}/{repo}/commits/{id}'
            },
            list: {
              url: '/repos/{user}/{repo}/commits'
            }
          })
        }
      })
  }
});






module.exports = Github;