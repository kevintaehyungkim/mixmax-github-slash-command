var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var listing = JSON.parse(req.query.text.trim());
  handleUser(listing, req, res);
};

function handleUser(term, req, res) {
  var response;

  try {
    response = sync.await(request({
      url: 'https://api.github.com/users/' + term.login,
      headers: {
        'user-agent': 'kevintaehyungkim'
      },
      gzip: true,
      json: true,
      timeout: 10 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Request Error');
    return;
  }

  var user = response.body;

  //If user has no bio, replace it with his/her company info to display
  if(!user.bio) {
    user.bio = user.company;
  }

  var html =
  `<a style="text-decoration:none; color:inherit; display:block" >
    <div style=
    "height: 100px;
    width:550px; 
    padding:10px; 
    margin:5px; 
    border: 1px solid #99b0e1; 
    border-radius:2px;
    font-family:Avenir Next, Segoe UI, Calibri, Arial, sans-serif";
    >
      <div style="float:left; margin-right:10px; display:inline-block">
        <img style="max-height:100px" src="${user.avatar_url}">
      </div>

      <div style=
      "float:left; 
      width:80%; 
      overflow: hidden;
      text-overflow: clip;
      white-space: nowrap">

        <div style="width:100%; font-weight: 600; font-size: 1.6em;">
          ${user.login} (${user.name})
        </div>

        <div style="width:100%; font-size: 1.1em;">
          ${user.bio}
        </div>
        
        <div style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
          <font style="font-size: 0.9em; font-weight:normal">
            ${user.name} has ${user.public_repos} repositories available.
          </font>
        </div>
        <div style="font-family:/gitAvenir Next, Segoe UI, Calibri, Arial, sans-serif; font-size: 0.8em; font-weight:normal; color:#aab; margin-top:3px">
          ${user.html_url}
        </div>
      </div>
    </div>
  </a>
  `
  res.json({
    body: html
  });
}