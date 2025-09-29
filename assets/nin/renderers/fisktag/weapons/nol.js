loadTextures({
    "base": "nin:nol_texture",
});

var utils = implement("fisktag:external/utils");
var model;

function init(renderer) {
    var model = utils.createModel(renderer,"nin:nunchucks_final" /*"nin:nunchuck_rotated"*/, null, "base");
	model.bindAnimation("nin:nol_hit_backwards").setData((entity, data) => {
        if (cancelAnimations) {
			data.load(0);
            return;
        }
		data.load(entity.getPunchTimerInterpolated());
    });
    model.bindAnimation("nin:nun_beam").setData((entity, data) => {
        if (cancelAnimations) {
			data.load(0);
            return;
        }
		data.load(entity.getData("fiskheroes:beam_charging") && !entity.getData("nin:dyn/spinning"));
    });
	renderer.setModel(model);
//in hand
	chain = utils.createLines(renderer, "nin:jay", 0x0A92D8, [
        {"start": [0.0, 0.0, -5], "end": [0.0, 0.0, -0.5], "size": [.75, .75]},
    ]);
	chain.setOffset(0, 0.0, 0.0).setScale(1.2, 1.2, 1.2).setRotation(90, 35, 0);
	chain.setAnchorCube(model.getCubeOffset("nunchuck1"));
//hanging
	chain1 = utils.createLines(renderer, "nin:jay", 0x0A92D8, [
        {"start": [0.0, 0.0, 10.0], "end": [0.0, 0.0, 2.25], "size": [.75, .75]},
    ]);
	chain1.setOffset(2, -3.0, 0.0).setScale(1.2, 1.2, 1.2).setRotation(90, 160, 0);
	chain1.setAnchorCube(model.getCubeOffset("nunchuck2"));
}


function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    cancelAnimations = false;
    renderer.opacity = 1;
    if (!entity.getData("fiskheroes:beam_charging")) {
        chain.setRotation(90, 35, 0)
        chain.setOffset(0, 0.0, 0.0)
        chain.progress = 1;
        chain.render();
        chain1.setOffset(2, -3.0, 0.0)
        chain1.setRotation(90, 160, 0)
        chain1.progress = 1;
        chain1.render(); 
    }
	if (entity.getData("fiskheroes:beam_charging")) {
        chain.setRotation(90, 10, 0)
        chain.setOffset(2, 0.0, 0.0)
        chain.progress = 1;
        chain.render();
        chain1.setRotation(90, 180, 0)
        chain1.setOffset(-2, -4.0, 0.0)
        chain1.progress = 1;
        chain1.render(); 
    }
    //spinjitzu case
    if (entity.getData("nin:dyn/spinning") && (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON")) {
        glProxy.scale(0.001);
    }
    if (entity.getData("fiskheroes:aiming_timer") == 1) {
        glProxy.translate(-0.15, -1.7, -0.30);
        glProxy.rotate(0, 90, 90, 0);
        glProxy.scale(0.75);
    }
    // if (entity.getPunchTimerInterpolated()) {
    //     glProxy.translate(-5, 2, -14.5);
    //     glProxy.rotate(0, 0, 90.0, 90.0);
    //     glProxy.scale(0.0001);
    // }
    // nunchuckhitting.setOffset(-5, 2, -14.5);
    // nunchuckhitting.setRotation(0, 90.0, 90.0)
    // nunchuckhitting.setScale(0.75)
    if (!entity.isOnGround() && entity.getData("fiskheroes:dyn/steel_timer") == 1 && (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON")) {
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
        // glProxy.translate(-5, 2, 2);
        // glProxy.rotate(0, 0, 90.0, 90.0);
        glProxy.scale(0.65);
        // if (entity.getPunchTimerInterpolated()) {
        //     glProxy.scale(0.0001);
        // }
    } else if (renderType === "EQUIPPED_IN_SUIT") {
        glProxy.translate(-0.73, -1.25, 0.4);
        glProxy.rotate(90, 90, 90, 0);
        // glProxy.translate(-5, 2, 2);
        // glProxy.rotate(0, 0, 90.0, 90.0);
        glProxy.scale(0.65);
        // if (entity.getPunchTimerInterpolated()) {
        //     glProxy.scale(0.0001);
        // }
    }
    glProxy.scale(1.5);
}