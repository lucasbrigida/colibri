function COLIBRI() {
  'use strict';

  var self = this, body;

  this.open = function (params, cb) {
    //create iframe and set style attributes
    body = document.createElement('iframe');
    body.src = '/scraper?url=' + params.url;
    body.className += ' colibri';
    self.hide();

    if (typeof (cb) === 'function') {
      body.onload = function () { return cb(body.contentDocument); };
    }

    //append iframe
    if (params.id) { document.getElementById(params.id).appendChild(body); }
    else { document.body.appendChild(body); }

    return self;
  };

  this.show = function () {
    body.style.display = '';
    return self;
  };

  this.hide = function () {
    body.style.display = 'none';
    return self;
  };

  this.toggle = function () {
    body.style.display = body.style.display === 'none' ? '' : 'none';
    return self;
  };

  this.document = function (cb) {
    cb(body.contentDocument);
    return self;
  };
}