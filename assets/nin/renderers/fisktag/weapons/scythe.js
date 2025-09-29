loadTextures({
    "base": "nin:scythe_normal"
});

var utils = implement("fisktag:external/utils");
var model;

function init(renderer, entity) {
    model = utils.createModel(renderer, "nin:scythe_normal", "base");
    renderer.setModel(model);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    cancelAnimations = false;

    if (renderType === "INVENTORY") {
        glProxy.rotate(-90, 0.5, 1, 0);
        glProxy.translate(0, -0.75, 0)
        glProxy.scale(0.70);
    }
    if (!entity.isOnGround() && entity.getData("fiskheroes:dyn/steel_timer") == 1 && renderType !== "INVENTORY") {
        glProxy.scale(0.001);
    }
    //spinjitzu case
    if (entity.getData("nin:dyn/spinning") && (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON")) {
        glProxy.scale(0.001);
    }
    if (renderType === "EQUIPPED_FIRST_PERSON") {
        glProxy.translate(0.0, -1.25, 0);
        glProxy.scale(0.55);
    } else if (renderType === "ENTITY") {
        glProxy.rotate(0, 1, 0, 90);
        glProxy.translate(0, 0, 0.05)
    } else if (renderType === "EQUIPPED") {
        glProxy.translate(0.25, -1.7, -0.30);
        glProxy.rotate(0, 0, 0, 0);
        glProxy.scale(0.75);
    }
    
    glProxy.scale(1.5);
}