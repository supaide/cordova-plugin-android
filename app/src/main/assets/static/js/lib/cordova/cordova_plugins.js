cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "cordova-plugin-webresource.webresource",
        "file": "plugins/cordova-plugin-webresource/www/webresource.js",
        "pluginId": "cordova-plugin-webresource",
        "clobbers": [
            "window.WebResource"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0"
};
// BOTTOM OF METADATA
});
