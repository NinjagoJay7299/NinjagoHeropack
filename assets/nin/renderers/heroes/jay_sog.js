extend("nin:jay_basic");
loadTextures({
    "layer1": "nin:jay/s8-sog-jay",
    "layer2": "nin:jay/s8-sog-jay",
    "mask": "nin:jay/ninjagojay_mask",
    "nunchuck": "nin:jay/nol1",
    "nolback": "nin:jay/nolback",
    "null": "nin:null",
    "spinjitzu": "nin:jay/spinjitzu_jay",
    "nunhand": "nin:jay/nunhand",
    // "airjitzu":"nin:jay/airjitzujay",
    "nunchuck_pose": "nin:jay/nunchuck_pose",
});
function isGolden(entity) {
    return false;
}
var color = 0x0000FF
function pull(property) {
    var properties = {
        "spinjitzu": "nin:blue_lightning",
    }
    return properties[property];
}
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("jay/jay_0", "jay/jay_1", "jay/jay_2", "jay/jay_3");
}
