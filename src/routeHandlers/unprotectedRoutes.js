import auth from '../modules/auth/index';

const initUnprotectedRoutes = router => {
  router.use(auth);
};

export {
  initUnprotectedRoutes,
};