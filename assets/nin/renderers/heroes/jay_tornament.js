extend("nin:jay_basic");
loadTextures({
    "layer1": "nin:jay/s4-battle-jay",
    "layer2": "nin:jay/s4-battle-jay",
    "mask": "nin:jay/ninjagojay_mask",
    "nunchuck": "nin:jay/nunchuck",
    "null": "nin:null",
    "spinjitzu": "nin:jay/spinjitzu_jay",
    "nunhand": "nin:jay/nunhand",
    "airjitzu":"nin:jay/airjitzujay",
});
function isGolden(entity) {
    return false;
}
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("jay/jay_tornament_0", "jay/jay_tornament_1", "jay/jay_tornament_2", "jay/jay_tornament_3");
}