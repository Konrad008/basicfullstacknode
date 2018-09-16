class routeHandler {
  constructor(manager) {
    this.manager = manager;
    Object.keys(manager).forEach(method => {
      this[method] = this.handle.bind(this, method);
    }, this);
  }

  handle(action) {
    const _this = this;
    return (req, res, next) => {
      _this.manager[action](req)
        .then(data => {
          res.json(data ? data : {});
        })
        .catch(err => {
          next(err);
        });
    };
  }
}

module.exports = routeHandler;
