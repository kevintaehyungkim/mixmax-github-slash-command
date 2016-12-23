var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


module.exports = function(req, res) {
  var term = req.query.text.trim();

  handleSearchString(term, req, res);
};

function handleSearchString(term, req, res) {
  var html = '<a href="' + term + '">' + term + '</a>';
  res.json({
    body: html,
    raw: true
  });
}