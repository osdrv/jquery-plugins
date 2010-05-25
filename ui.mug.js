;(function() { $.widget('ui.mug', {
    _owner: null, _is_filled: 0, _is_hot = false,
    _contents: null;
    _init: function() {
      var e = this.element, o = this.options, self = this;
      self._owner = o.owner;
      e.bind('fill', function(ev) {
        if (typeof(o.onFill) == 'function')
          o.onFill.call(self, ev);
      }).bind('touch', function(ev) {
        if (typeof(o.onTouch) == 'function')
          o.onTouch.call(self, ev);
      })
    } })
})(jQuery);

//=====================================


$('#the_mug').mug({
  owner: '4pcbr',
  onFill: function(ev) {
    this._is_hot = true; this._is_filled = 100;
    this._contents = "coffee";
  },
  onTouch: function(ev) {
    if (ev.initializer !== this.owner)
      throw "Hey, don't touch "
        + this._owner + "'s mug!";
    if (this._is_hot) {
      ev.preventDefault();
      alert("dude, it's hot!");
    }
}});