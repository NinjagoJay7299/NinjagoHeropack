extend("nin:kai_basic");
loadTextures({
    "layer1": "nin:kai/ninjagokai_layer1",
    "layer2": "nin:kai/ninjagokai_layer2",
    "mask": "nin:null",
    "sword": "nin:kai/sword",
    "null": "nin:null",
    "spinjitzu": "nin:kai/spinjitzu_kai",
    "airjitzu":"nin:kai/airjitzukai",
    "sof": "nin:katana",
});
var utils = implement("fiskheroes:external/utils");
function invis(entity) {
    return (entity.getData("fiskheroes:energy_projection"));
}
function fly(entity) {
    return !entity.isOnGround() && (entity.getData("fiskheroes:dyn/steel_timer") == 1);
}
function isBasic(entity) {
    return true;
}
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("kai/kai_0", "kai/kai_1", "kai/kai_2", "kai/kai_3");
    renderer.setTexture((entity, renderLayer) => {
        if (invis(entity)) {
            return "null";
        }
        if (fly(entity)) {
            return "null";
        }
        return "layer1";
    });
    //renderer.setLights((entity, renderLayer) => renderLayer == "CHESTPLATE" ? "lights" : null);

    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("HELMET", "CHESTPLATE");
}

function initEffects(renderer) {
    sword = renderer.createEffect("fiskheroes:model");
    sword.setModel(utils.createModel(renderer, "nin:sof", null, "sword"));
    sword.setOffset(1.0, 8.0, -11.0);
    sword.setRotation(90.0, 90.0, 0.0)
    sword.anchor.set("rightArm");
    sword.mirror = false
    sword.opacity = 0.9;
    sword.setScale(0.75)

    overlay = renderer.createEffect("fiskheroes:overlay");

    spinjitzu = renderer.createEffect("fiskheroes:model");
    spinjitzu.setModel(utils.createModel(renderer, "nin:spinjitzu_zane", null, "spinjitzu"));
    spinjitzu.setOffset(1, 0, 1);
    spinjitzu.anchor.set("body");
    spinjitzu.mirror = false;
    spinjitzu.setScale(1.0)
    spinjitzu.opacity = 0.9;

    airjitzu = renderer.createEffect("fiskheroes:model");
    airjitzu.setModel(utils.createModel(renderer, "nin:airjitzu-old", null, "airjitzu"));
    airjitzu.setOffset(0, 2, 0);
    airjitzu.anchor.set("body");
    airjitzu.mirror = false;
    airjitzu.setScale(0.0)
    airjitzu.opacity = 0.1;

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "nin:invisible", "rightArm", 0xdb472b, [{
                "firstPerson": [-4.5, 3.75, -8.0],
                "offset": [-0.5, 9.0, 0.0],
                "size": [2.0, 2.0]
            }
        ]);

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "nin:white_beam", "rightArm", 0xF9F2DB, [{
        "firstPerson": [-4.5, 3.75, -8.0],
        "offset": [-0.5, 9.0, 0.0],
        "size": [2.0, 2.0]
        }
    ]);

    utils.bindBeam(renderer, "fiskheroes:energy_manipulation", "fiskheroes:energy_discharge", "rightArm", 0x0000FF, [{
            "firstPerson": [-2.5, 0.0, -7.0],
            "offset": [-0.5, 19.0, -12.0],
            "size": [1.5, 1.5]
        }

    ]);
        utils.bindParticles(renderer, "nin:fire_hands").setCondition(entity => (entity.getInterpolatedData("fiskheroes:blade_timer") > 0 && entity.getInterpolatedData("fiskheroes:blade_timer") < 1));
        utils.bindParticles(renderer, "nin:fire_hands").setCondition(entity => entity.getData("fiskheroes:blade") && (entity.getInterpolatedData("fiskheroes:blade_timer") > 0.5 && entity.getInterpolatedData("fiskheroes:blade_timer") < 1));
        utils.bindParticles(renderer, "nin:fireclone").setCondition(entity => invis(entity));
        renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
            return fly(entity) || invis(entity) ? 0.9 : 1;
    });
    sof = renderer.createEffect("fiskheroes:model");
    sof.setModel(utils.createModel(renderer, "nin:katana_back", "sof"));
    sof.setOffset(0.0, 0.0, 0.0);
    sof.setRotation(0.0, 0.0, 0.0)
    sof.anchor.set("body");
    sof.mirror = false
    sof.opacity = 0.9;
    sof.setScale(0.75)

    utils.bindParticles(renderer, "nin:cloud_beam").setCondition(entity => entity.getData("fiskheroes:aiming_timer") > 0);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    addAnimation(renderer, "WALL_RUN", "nin:wall_run").setData((entity, data) => {
        var input_rotate = entity.getInterpolatedData("nin:dyn/climb") > 0 ? 1 : 0;
        data.load(0, entity.getInterpolatedData("nin:dyn/climb") * 2);
        data.load(1, entity.getInterpolatedData("nin:dyn/climb") * 2);
        data.load(2, input_rotate); // rotation data var doesnt work for this
        data.load(4, -(input_rotate / 3.5));
    })
    utils.addHoverAnimation(renderer, "jay.HOVER", "nin:swim").setCondition(entity => (entity.isInWater()))
    addAnimationWithData(renderer, "ninja.SPRINT",  "fiskheroes:speedster_sprint", "fiskheroes:moving").setCondition(entity => (entity.isSprinting() && !invis(entity)));
    /*addAnimationWithData(renderer, "kai.SPIN", "nin:spin").setData((entity, data) => {
        data.load(entity.getData('fiskheroes:energy_projection_timer'));
    });
    addAnimationWithData(renderer, "kai.SPINFULL", "nin:spinjitzu").setData((entity, data) => {
        data.load(entity.getData('fiskheroes:energy_projection_timer') && entity.loop(5) * 10);
    });*/
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (entity.isWearingFullSuit()) {
        overlay.render();
    }
        if (invis(entity)) {
            spinjitzu.setRotation(0, entity.loop(2) * 360, 0)
            spinjitzu.render();
        }

        if (fly(entity)) {
            airjitzu.setRotation(0, entity.loop(2) * 1000, 0)
            airjitzu.render();
        }

        if (entity.getData("fiskheroes:aiming_timer") == 1) {
            sword.setRotation(180.0, 90.0, 0.0)
            sword.setOffset(1.0, 20.0, 0.0);
        }

        if (!entity.getData("fiskheroes:aiming_timer") == 1) {
            sword.setOffset(1.0, 8.0, -11.0);
            sword.setRotation(90.0, 90.0, 0.0)
        }
        if (/*!entity.getData("fiskheroes:blade")*/entity.getHeldItem().isEmpty() && (!invis(entity) && !fly(entity))) {
            sof.setOffset(2.0, 9.0, -2.0);
            sof.setRotation(0.0, 90.0, 145.0);
            sof.render();
            sof.setScale(0.5)
        }
        if (entity.getData("fiskheroes:blade")) {
            sword.render();
        }
}
