const path = require('path');
const fse = require('fs-extra');

const root = path.join(__dirname, '../', '');

const indexDirPathSrc = path.join(root, ".", "/templates/login/login.ftl");
const indexDirPathBuild = path.join(root, ".", "/build/templates/login");
const indexPathBuild = path.join(indexDirPathBuild, ".", "login.ftl");

module.exports = function replaceAppPath() {
    this.plugin("done", function (stats) {
        fse.copy(path.join(root, ".", "/templates/"), path.join(root, ".", "/build/templates/"), function (err) {
            fse.readFile(indexDirPathSrc, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                fse.ensureDir(indexDirPathBuild, function () {
                    fse.writeFile(indexPathBuild, data.replace('[hash]', stats.toJson().hash), 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                })
            });
        });
    });
};