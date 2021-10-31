const scene = {
    ...require('./files/global.scene.js'),
    ...require('./files/cutscene.scene.js'),
}

const addLayout = () => {
    _.forEach(scene, (data, name) => {
        if (typeof(data.layout) === 'string') {
            const layout = _.get(scene, data.layout, null)
            if (layout) {
                delete scene[name].layout

                scene[name] = {
                    ...layout,
                    ...scene[name],
                }
            }
        }
    })
}

addLayout()
addLayout()

module.exports = scene