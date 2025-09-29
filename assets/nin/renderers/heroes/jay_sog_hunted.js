extend("nin:jay_sog");
loadTextures({
    "layer1": "nin:jay/s9-hunted-jay",
    "layer2": "nin:jay/s9-hunted-jay",
    "mask": "nin:jay/ninjagojay_mask",
    "nunchuck": "nin:jay/nol1",
    "nolback": "nin:jay/nolback",
    "null": "nin:null",
    "spinjitzu": "nin:jay/spinjitzu_jay",
    "nunhand": "nin:jay/nunhand",
    "nunchuck_pose": "nin:jay/nunchuck_pose",
});
function isGolden(entity) {
    return false;
}
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("jay/jay_0", "jay/jay_1", "jay/jay_2", "jay/jay_3");
}
