const { viewsRouter, privateViewsRouter } = require('./viewsRouters');
const authRouter = require('./authRouter');
const usersRouter = require('./usersRouter');
const educationsRouter = require('./educationsRouter');
const awardsRouter = require('./awardsRouter');
const certificatesRouter = require('./certificatesRouter');
const projectsRouter = require('./projectsRouter');

module.exports = {
    viewsRouter,
    privateViewsRouter,
    authRouter,
    usersRouter,
    educationsRouter,
    awardsRouter,
    certificatesRouter,
    projectsRouter,
};