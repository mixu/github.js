var Github = require('../github.js');

/*
// Note that Github's v3 api does not use user IDs
Github.users({user: "mixu"}).each(function(user){
  console.log(user);
});


Github.users({ user: [ "mixu", "octocat"] }).each(function(user){
  console.log(user);
});

Github.users({user: "mixu"}).each(function(user){
  console.log(user.data);
  user.repos().each(function(repo){
    console.log(repo.data);
  });
});
*/

Github.users({user: "mixu"}).each(function(user){
  console.log(user.data);
  user.repos({id: "pixiedust"}).each(function(repo){
    console.log(repo.data);
  });
});
