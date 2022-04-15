'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/v1/admin/login', controller.admin.main.login);
  router.post('/api/v1/admin/register', controller.admin.main.register);
  router.get('/api/v1/admin/login/products', controller.admin.main.products);
  router.get('/api/v1/admin/login/getProduct/:id', controller.admin.main.getProduct);
  router.post('/api/v1/admin/login/addProducts', controller.admin.main.addProducts);
  router.put('/api/v1/admin/login/editProduct/:id', controller.admin.main.editProduct);
  router.post('/api/v1/admin/login/uploadFile', controller.admin.main.uploadFile);
  router.get('/api/v1/admin/login/delProduct/:id', controller.admin.main.delProduct);
};
