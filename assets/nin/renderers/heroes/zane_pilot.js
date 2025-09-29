extend("nin:zane_basic");
loadTextures({
    "layer1": "nin:zane/pilot",
    "layer2": "nin:zane/pilot",
    "mask": "nin:zane/ninjagozane_mask",
    "shuriken": "nin:zane/shuriken",
    "null": "nin:null",
    "spinjitzu": "nin:zane/spinjitzu_zane",
    "st": "nin:zane/st",
    "airjitzu":"nin:zane/airjitzuzane"
});
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("zane/zane_jungle_0", "zane/zane_jungle_1", "zane/zane_jungle_2", "zane/zane_jungle_3");
}