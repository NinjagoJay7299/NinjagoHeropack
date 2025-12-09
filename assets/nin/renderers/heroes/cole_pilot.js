extend("nin:cole_basic");
loadTextures({
    "layer1": "nin:cole/pilot",
    "layer2": "nin:cole/pilot",
    "mask": "nin:null",
    "scythe": "nin:cole/scythe",
    "null": "nin:null",
    "spinjitzu": "nin:cole/spinjitzu_cole",
    "airjitzu":"nin:cole/airjitzucole"
});
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("cole/cole_pilot_0", "cole/cole_pilot_1", "cole/cole_pilot_2", "cole/cole_pilot_3");
}