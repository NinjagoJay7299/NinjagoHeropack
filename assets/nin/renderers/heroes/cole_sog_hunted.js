extend("nin:cole_sog");
loadTextures({
    "layer1": "nin:cole/s9-hunted-cole",
    "layer2": "nin:cole/s9-hunted-cole",
    "mask": "nin:null",
    "scythe": "nin:cole/scythe",
    "null": "nin:null",
    "spinjitzu": "nin:cole/spinjitzu_cole",
    "soq_back": "nin:cole/soq_texture"
});
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("cole/cole_0", "cole/cole_1", "cole/cole_2", "cole/cole_3");
}