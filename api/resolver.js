var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var user = req.query.text.trim();
  handleUser(user, req, res);
};


function handleUser(user, req, res) {
  var response;
  try {
    response = sync.await(request({
      url: 'https://api.github.com/users/kevintaehyungkim',
      headers: {
        'user-agent': 'kevintaehyungkim'
      },
      gzip: true,
      json: true,
      timeout: 10 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Req Error');
    return;
  }

  var user = response.body;

  var html =
  `<a style="text-decoration:none; color:inherit; display:block" href="${user.login}">
    <div style=
    "width:550px; 
    height: 100px;
    margin:5px; 
    padding:10px; 
    border: 1px solid #99b0e1; 
    border-radius:2px;
    font-family:proxima-nova, Avenir Next, Segoe UI, Calibri";
    >
      <div style="display:inline-block; float:left; margin-right:10px">
        <img style="max-height:100px" src="${user.avatar_url}">
      </div>

      <div style=
      "float:left; 
      width:80%; 
      overflow: hidden;
      text-overflow: clip;
      white-space: nowrap">

        <div style="width:100%; font-weight: 600; font-size: 1.6em;">
          ${user.login}
        </div>

        <div style="width:100%; font-size: 1.2em;">
          ${user.name}
        </div>
        
        <div style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
          <font style="font-size: 0.9em; font-weight:normal">
            ${user.bio}
          </font>
        </div>
        <div style="font-family:proxima-nova, Avenir Next, Segoe UI, Calibri, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 0.9em; font-weight:normal; color:#aab; margin-top:5px">
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