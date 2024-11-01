/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.admin.login);
  router.post('/reg', controller.admin.registry);

};
