extend("nin:cole_basic");
loadTextures({
    "layer1": "nin:cole/s4-battle-cole",
    "layer2": "nin:cole/s4-battle-cole",
    "mask": "nin:null",
    "scythe": "nin:cole/scythe",
    "null": "nin:null",
    "spinjitzu": "nin:cole/spinjitzu_cole",
    "airjitzu":"nin:cole/airjitzucole"
});
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("cole/cole_tournament_0", "cole/cole_tournament_1", "cole/cole_tournament_2", "cole/cole_tournament_3");
}