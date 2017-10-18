const controller = {}

controller.getAll = function (req, res) {
    res.json({
        name: 'Pilip',
        abilities: ['Kotlin', 'Kormilarenje', 'Node'],
        weight: '60',
        height: '175'
    })
}

module.exports = controller