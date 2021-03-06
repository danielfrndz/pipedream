var _ = require('lodash');
var cheerio = require("cheerio");

var ServerView = Backbone.View.extend({  

  rendered: false,

  constructor: function(options){    
    this.$ = options.$;
    this.options = options;
    var self = this;
    this.on('render', function(html){
      self.rendered = true;
    }, this);
    Backbone.View.prototype.constructor.call(this, options);
  },
  
  remove: function(){},
  delegateEvents: function(){},
  undelegateEvents: function(){},

  getLayout: function(){
    var layout = this.layout || this.options.layout
    if(layout)
      return this.compileTemplate(layout, {}); 
    return "";
  },

  isInitialLoad: function(){
    return false;
  },

  _ensureElement: function(){
    if(!this.$){
      var html = this.getLayout();    
      this.$ = cheerio.load(html);
    }
    if (!this.el) {
      var attrs = _.extend({}, _.result(this, 'attributes'));
      if (this.id) attrs.id = _.result(this, 'id');
      if (this.className) attrs['class'] = _.result(this, 'className');
      var $el = this.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
      this.setElement($el, false);
    } else {
      this.setElement(_.result(this, 'el'), false);
    }
  },

  setElement: function(element, delegate){
    if (this.$el) this.undelegateEvents();
    this.$el = this.$(element);
    this.el = this.$el;
    if (delegate !== false) this.delegateEvents();
    return this;
  },

  getHTML: function(){
    return this.$.html();
  }
});

ServerView.extend = Backbone.View.extend;

module.exports = ServerView;