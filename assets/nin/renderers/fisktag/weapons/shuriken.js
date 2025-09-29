function isGod(entity) {
    return entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd";
}
loadTextures({
    "base": "nin:shuriken_normal",
});

var utils = implement("fisktag:external/utils");
var model;

function init(renderer) {
    model = utils.createModel(renderer,"nin:shuriken_normal", "base");
    model.bindAnimation("nin:shuriken_throw_normal").setData((entity, data) => {
        if (cancelAnimations) {
			data.load(0);
            return;
        }
		data.load(entity.getInterpolatedData("fiskheroes:beam_shooting") * 2 * entity.getData("fiskheroes:beam_charging"));
    });
	renderer.setModel(model);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {

    cancelAnimations = false;

    // if (entity.getData("fiskheroes:aiming_timer") == 1) {
    //     glProxy.translate(-0.15, -1.7, -0.30);
    //     glProxy.rotate(0, 90, 90, 0);
    //     glProxy.scale(0.75);
    // }
    //spinjitzu case
    if (entity.getData("nin:dyn/spinning") && (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON")) {
        glProxy.scale(0.001);
    }
    if (!entity.isOnGround() && entity.getData("fiskheroes:dyn/steel_timer") == 1 && (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON")) {
        glProxy.scale(0.001);
    }
    if (renderType === "EQUIPPED_FIRST_PERSON") {
        if (entity.getData("fiskheroes:beam_charging") && !isLeftSide) {
            glProxy.translate(0.0, -2.0, 0);
        } else {
            glProxy.translate(0.0, -.5, 0.0);
        }
        glProxy.rotate(70, 0, 90, 0);
        glProxy.scale(0.55);
    } else if (renderType === "ENTITY") {
        glProxy.rotate(90, 1, 0, 90);
        glProxy.translate(0, 0, 0.05);
        cancelAnimations = true;
    } else if (renderType === "INVENTORY") {
		glProxy.rotate(-180, 0.5, 1, 0);
        glProxy.translate(0, -0.5, 0)
        glProxy.scale(0.70);
        cancelAnimations = true;
    } else if (renderType === "EQUIPPED") {
        glProxy.translate(0, 0, -.2);
        glProxy.rotate(90, 0, 90, 0);
        glProxy.scale(0.35);
    }
    if (isLeftSide) {
        cancelAnimations = true;
    }
    if (renderType === "EQUIPPED_IN_SUIT") {
        glProxy.scale(0.001);
    }

    glProxy.scale(1.5);
}