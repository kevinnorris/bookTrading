// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import authWatcher from 'containers/App/sagas';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas, redirectToDashboard, redirectToHome } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  // Inject global saga, not tied to any routes
  injectSagas(authWatcher);

  return [
    {
      onEnter: redirectToDashboard,
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'loginPage',
      getComponent(location, cb) {
        import('containers/LoginPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/signup',
      name: 'signupPage',
      getComponent(location, cb) {
        import('containers/SignupPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToHome,
      path: '/dashboard',
      name: 'dashboardPage',
      getComponent(location, cb) {
        import('containers/DashboardPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToHome,
      path: '/mybooks',
      name: 'myBooksPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MyBooksPage/reducer'),
          import('containers/MyBooksPage/sagas'),
          import('containers/MyBooksPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('myBooksPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToHome,
      path: '/addbook',
      name: 'addBookPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/AddBookPage/reducer'),
          import('containers/AddBookPage/sagas'),
          import('containers/AddBookPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('addBookPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
