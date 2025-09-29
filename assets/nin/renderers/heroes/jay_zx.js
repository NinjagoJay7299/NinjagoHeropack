extend("nin:jay_basic");
loadTextures({
    "layer1": "nin:jay/jay_zx",
    "layer2": "nin:jay/jay_zx",
    "mask": "nin:jay/ninjagojay_mask",
    "nunchuck": "nin:jay/nol1",
    "null": "nin:null",
    "spinjitzu": "nin:jay/spinjitzu_jay_zx",
    "nunhand": "nin:jay/nunhand",
    "airjitzu":"nin:jay/airjitzujay",
});
function isGolden(entity) {
    return true;
}
var color = 0x00EAFF;
function pull(property) {
    var properties = {
        "spinjitzu": "nin:light_blue_lightning",
    }
    return properties[property];
}
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("jay/jay_zx_0", "jay/jay_zx_1", "jay/jay_zx_2", "jay/jay_zx_3");
}