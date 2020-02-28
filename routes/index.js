const routes = (app, controllers) => {
    app.use('/api', require('./api/index')(controllers))
}

module.exports = routes