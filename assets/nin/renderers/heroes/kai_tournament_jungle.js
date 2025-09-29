extend("nin:kai_basic");
loadTextures({
    "layer1": "nin:kai/s4-jungle-kai",
    "layer2": "nin:kai/s4-jungle-kai",
    "mask": "nin:null",
    "sword": "nin:kai/sword",
    "null": "nin:null",
    "spinjitzu": "nin:kai/spinjitzu_kai",
    "airjitzu":"nin:kai/airjitzukai"
});
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("kai/kai_jungle_0", "kai/kai_jungle_1", "kai/kai_jungle_2", "kai/kai_jungle_3");
}
function isBasic(entity) {
    return true;
}