loadTextures({
    "base": "nin:soq_texture",
    "mixed": "nin:soq_texture_mixed"
});

var utils = implement("fisktag:external/utils");
var model;

function init(renderer, entity) {
    model = utils.createModel(renderer, "nin:soq_model_new", null, "base");
    
    model.bindAnimation("nin:earthspikesup").setData((entity, data) => {
        if (cancelAnimations) {
			data.load(0);
            return;
        }
		data.load(entity.getInterpolatedData("fiskheroes:beam_shooting_timer"));
    });
    renderer.setModel(model);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    cancelAnimations = false;

    /*if (entity.getData("fiskheroes:aiming_timer") == 1) {
        glProxy.translate(-0.15, -1.7, -0.30);
        glProxy.rotate(0, 90, 90, 0);
        glProxy.scale(0.75);
    }*/ 
    if (renderType === "INVENTORY") {
        model.texture.set("base", "base");
        glProxy.rotate(-90, 0.5, 1, 0);
        glProxy.translate(0, -0.75, 0)
        glProxy.scale(0.70);
    }
    else if (entity.getData("nin:dyn/hitting_ground")) {
        model.texture.set("mixed", "base");
    }
    else if (!entity.getData("nin:dyn/hitting_ground")) {
        model.texture.set("base", "base");
    }
    //spinjitzu case
    if (entity.getData("nin:dyn/spinning") && (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON")) {
        glProxy.scale(0.001);
    }
    if (renderType === "EQUIPPED_FIRST_PERSON" && entity.getData("nin:dyn/hitting_ground")) {
        model.texture.set("mixed", "base");
        glProxy.rotate(90, 90, -44, -5);
    }
    if (!entity.isOnGround() && entity.getData("fiskheroes:dyn/steel_timer") == 1 && renderType !== "INVENTORY") {
        glProxy.scale(0.001);
    }
    if (renderType === "EQUIPPED_FIRST_PERSON") {
        if (entity.getData("fiskheroes:beam_shooting")) {
            model.texture.set("mixed", "base");
            glProxy.translate(0.0, -1.25, 0);
            glProxy.rotate(90, 0, 0, 0);
            glProxy.scale(0.55);
        }
        else{
            model.texture.set("base", "base");
            glProxy.translate(0.0, -1.25, 0);
            glProxy.scale(0.55);
        }
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