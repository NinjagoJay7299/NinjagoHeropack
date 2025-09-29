loadTextures({
    "base": "nin:sof_texture",
});

var utils = implement("fisktag:external/utils");
var model;

function init(renderer) {
    model = utils.createModel(renderer, "nin:sof", null, "base");
    renderer.setModel(model);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    cancelAnimations = false;
    //aiming case
    if (entity.getData("fiskheroes:aiming_timer") == 1) {
        glProxy.translate(0.05, 0, -0.4);
        glProxy.rotate(90, 90, 0, 0);
        glProxy.scale(0.8);
    }
    // beam case does the same as aiming case
    if (entity.getData("fiskheroes:beam_charging") && !entity.getData("nin:dyn/spinning")) {
        glProxy.translate(0.05, 0, -0.4);
        glProxy.rotate(90, 90, 0, 0);
        glProxy.scale(0.8);
    }
    //spinjitzu case
    if (entity.getData("nin:dyn/spinning") && (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON")) {
        glProxy.scale(0.001);
    }
    //airjitzu case
    if (!entity.isOnGround() && entity.getData("fiskheroes:dyn/steel_timer") == 1 && (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON")) {
        glProxy.scale(0.001);
    }
    if (renderType === "EQUIPPED_FIRST_PERSON") {
        glProxy.translate(0.0, -1.25, 0);
        glProxy.scale(0.55);
    } else if (renderType === "ENTITY") {
        glProxy.rotate(90, 1, 0, 90);
        glProxy.translate(0, 0, 0.05)
    } else if (renderType === "INVENTORY") {
		glProxy.rotate(-180, 0.5, 1, 0);
        glProxy.translate(0, -0.75, 0)
        glProxy.scale(0.70);
    } else if (renderType === "EQUIPPED") {
        glProxy.translate(-0.158, -1.7, -0.30);
        glProxy.rotate(0, 90, 90, 90);
        glProxy.scale(0.75);
    }
    // else if (renderType === "EQUIPPED_IN_SUIT") {
    //     glProxy.translate(0.05, 0, -0.4);
    //     glProxy.rotate(90, 90, 0, 0);
    //     glProxy.scale(0.8);
    // }
    glProxy.scale(1.5);
}