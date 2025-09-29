loadTextures({
    "base": "nin:blue",
});

var utils = implement("fisktag:external/utils");
var model;

function init(renderer) {
    var model = utils.createModel(renderer,"nin:change_trident", "base");
	model.bindAnimation("nin:tobow").setData((entity, data) => {
        if (cancelAnimations) {
			data.load(0);
            return;
        }
		data.load(entity.getData("fiskheroes:energy_charge"));
    });
    // model.bindAnimation("nin:nunchuck_beam_normal").setData((entity, data) => {
    //     if (cancelAnimations) {
	// 		data.load(0);
    //         return;
    //     }
	// 	data.load(entity.getData("fiskheroes:beam_charging"));
    // });
	renderer.setModel(model);
}


function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    cancelAnimations = false;
    renderer.opacity = 1;
    if (!entity.getData("fiskheroes:beam_charging")) {
    }
	if (entity.getData("fiskheroes:beam_charging")) {
    }

    if (entity.getData("fiskheroes:aiming_timer") == 1) {
        glProxy.translate(-0.15, -1.7, -0.30);
        glProxy.rotate(0, 90, 90, 0);
        glProxy.scale(0.75);
    }
    if (entity.getData("fiskheroes:energy_projection") && !renderType === "INVENTORY") {
        glProxy.scale(0.001);
    }
    if (renderType === "INVENTORY" && !entity.isOnGround() && entity.getData("fiskheroes:dyn/steel_timer") == 1) {
        glProxy.scale(0.001);
    }
    if (renderType === "EQUIPPED_FIRST_PERSON") {
        glProxy.translate(0.0, -1.25, 0);
        glProxy.rotate(45, 90, 45, 90);
        glProxy.scale(0.55);
    } else if (renderType === "ENTITY") {
        glProxy.rotate(90, 1, 0, 90);
        glProxy.translate(0, 0, 0.05)
        cancelAnimations = true;
    } else if (renderType === "INVENTORY") {
		glProxy.rotate(-180, 0.4, 1, 0);
        glProxy.translate(-2.5, -0.7, 0)
        glProxy.scale(0.70);
        cancelAnimations = true;
    } else if (renderType === "EQUIPPED") {
        glProxy.translate(-0.73, -1.25, 0.4);
        glProxy.rotate(0, 0, 0, 0);
        glProxy.scale(0.65);
    } else if (renderType === "EQUIPPED_IN_SUIT") {
        glProxy.translate(-0.73, -1.25, 0.4);
        glProxy.rotate(90, 90, 90, 0);
        glProxy.scale(0.65);
    }
    glProxy.scale(1.5);
}