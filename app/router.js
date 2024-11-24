/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.admin.login);
  router.post('/reg', controller.admin.registry);
  router.get('/me', controller.admin.me);

  router.post('/user/add', controller.user.addUser);
  router.post('/user/del', controller.user.delUser);
  router.post('/user/update', controller.user.updateUser);
  router.get('/user/get', controller.user.getUser);

  router.post('/bank/addTag', controller.bank.addTag);
  router.post('/bank/updateTag', controller.bank.updateTag);
  router.get('/bank/getTag', controller.bank.getTags);
};
