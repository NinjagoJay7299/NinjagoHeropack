extend("nin:kai_basic");
loadTextures({
    "layer1": "nin:kai/s4-battle-kai",
    "layer2": "nin:kai/s4-battle-kai",
    "mask": "nin:null",
    "sword": "nin:kai/sword",
    "null": "nin:null",
    "spinjitzu": "nin:kai/spinjitzu_kai",
    "airjitzu":"nin:kai/airjitzukai"
});
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("kai/kai_tournament_0", "kai/kai_tournament_1", "kai/kai_tournament_2", "kai/kai_tournament_3");
}
function isBasic(entity) {
    return true;
}