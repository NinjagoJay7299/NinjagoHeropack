loadTextures({
    "base": "nin:nunchucks_normal",
});

var utils = implement("fisktag:external/utils");
var model;

function init(renderer) {
    var model = utils.createModel(renderer,"nin:nunchucks_normal", "base");
	model.bindAnimation("nin:nunchuck_normal_hit").setData((entity, data) => {
        if (cancelAnimations) {
			data.load(0);
            return;
        }
		data.load(entity.getPunchTimerInterpolated());
    });
    model.bindAnimation("nin:nunchuck_beam_normal").setData((entity, data) => {
        if (cancelAnimations) {
			data.load(0);
            return;
        }
		data.load(entity.getData("fiskheroes:beam_charging") && !entity.getData("nin:dyn/spinning"));
    });
	renderer.setModel(model);
}


function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    cancelAnimations = false;
    renderer.opacity = 1;
	//spinjitzu case
    if (entity.getData("nin:dyn/spinning") && (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON")) {
        glProxy.scale(0.001);
    }
    if (entity.getData("fiskheroes:aiming_timer") == 1) {
        glProxy.translate(-0.15, -1.7, -0.30);
        glProxy.rotate(0, 90, 90, 0);
        glProxy.scale(0.55);
    }
    //airjitzu case
    if (entity.getData("fiskheroes:dyn/steel_timer") == 1 && (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON") && !entity.isOnGround()) {
        glProxy.scale(0.001);
    }
    if (renderType === "EQUIPPED_FIRST_PERSON") {
        glProxy.translate(0.0, -1.25, 0);
        glProxy.rotate(45, 90, 45, 90);
        glProxy.scale(0.5);
    } else if (renderType === "ENTITY") {
        glProxy.rotate(90, 1, 0, 90);
        glProxy.translate(0, -6, 0.05)
        cancelAnimations = true;
    } else if (renderType === "INVENTORY") {
		glProxy.rotate(-180, 0.4, 1, 0);
        glProxy.translate(-2.5, -0.7, 0)
        glProxy.scale(0.70);
        cancelAnimations = true;
    } else if (renderType === "EQUIPPED") {
        glProxy.translate(-0.58, -1.25, 0.4);
        glProxy.rotate(0, 0, 0, 0);
        glProxy.scale(0.5);
    } else if (renderType === "EQUIPPED_IN_SUIT") {
        glProxy.translate(-0.58, -1.25, 0.4);
        glProxy.rotate(90, 90, 90, 0);
        glProxy.scale(0.5);
    }
    glProxy.scale(1.5);
}