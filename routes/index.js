const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out');
});

router.get('/login', passport.authenticate('github', (req, res) => {
    //#swagger.tags = ['Authentication']
}));

router.get('/logout', function (req, res, next) {
    //#swagger.tags = ['Authentication']
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
        session: true
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

router.use('/users', require('./users'));
router.use('/tasks', require('./tasks'));

module.exports = router;