// var sync = require('synchronize');
// var request = require('request');
// var _ = require('underscore');


// module.exports = function(req, res) {
//   var term = req.query.text.trim();

//   handleSearchString(term, req, res);
// };

// function handleSearchString(term, req, res) {
//   var html = '<a href="' + term + '">' + term + '</a>';
//   res.json({
//     body: html,
//     raw: true
//   });
// }


// var sync = require('synchronize');
// var request = require('request');


// // The API that returns the in-email representation.
// function resolver(req, res) {

//   try {
//     // if valid JSON, try to generate HTML of selection
//     var listing = JSON.parse(req.query.text.trim());
//     var result = formatUser(listing);

//     if (result) {
//       return res.json({body: result});
//     }
//     return res.sendStatus(400);

//   } catch (e) { //If Non-JSON or invalid JSON
//     return res.sendStatus(400);
//   }
// };

// // generates HTML of selected listing
// function formatUser(user) {

//   // check if listing provided is valid
//    if(!user.login || !user.html_url) {
//        return null;
//      }

//   var html =
//   `<a style="text-decoration:none; color:inherit; display:block" href="${user.login}">
//     <div style="width:550px; height: 100px;margin:5px; padding:10px; border: 1px solid #99b0e1; border-radius:2px">
//       <div style="display:inline-block; float:left; margin-right:10px">
//         <img style="max-width:90px; max-height:90px" src="${user.avatar_url}">
//       </div>
//       <div style="float:left; width:80%">
//         <div style="width:100%">
//           ${user.login}
//         </div>
        
//         </br>
        
//         <div style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
//           <font style="font-size:14px;font-weight:normal">
//             ${user.html_url}
//           </font>
//         </div>
//         <div style="font-family:proxima-nova, Avenir Next, Segoe UI, Calibri, Helvetica Neue, Helvetica, Arial, sans-serif; font-size:14px; font-weight:normal; color:#aab; margin-top:5px">
//           GITHUB.COM
//         </div>
//       </div>
//     </div>
//   </a>
//   `
//   return html;
// }

// module.exports = { resolver: resolver, formatUser: formatUser };



var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
    handleSearchString(term, req, res);
};


function handleSearchString(term, req, res) {
  var response;
  try {
    response = sync.await(request({
      url: 'https://api.github.com/search/users',
      headers: {
        'user-agent': 'kevintaehyungkim'
      },
      qs: {
        q: term,
      },
      gzip: true,
      json: true,
      timeout: 10 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Request Error');
    return;
  }

  var data = response.body.items;

  // Cap at 600px wide
  var html = '<img style="max-width:100%;" src="' + data.avatar_url + '"/>';
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
}