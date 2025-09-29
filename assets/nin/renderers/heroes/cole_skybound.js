extend("nin:cole_basic");
loadTextures({
    "layer1": "nin:cole/ninjagocole_layer1",
    "layer2": "nin:cole/ninjagocole_layer2",
    "mask": "nin:null",
    "scythe": "nin:cole/scythe",
    "null": "nin:null",
    "spinjitzu": "nin:cole/spinjitzu_cole",
    "airjitzu":"nin:cole/airjitzucole",
    "soq_back": "nin:cole/soq_texture"
});
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("cole/cole_0", "cole/cole_1", "cole/cole_2", "cole/cole_3");
}