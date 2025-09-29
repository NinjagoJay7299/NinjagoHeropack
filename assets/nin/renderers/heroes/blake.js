extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "nin:custom/blake",
    "layer2": "nin:custom/blake",
    "mask": "nin:null",
    "scythe": "nin:cole/scythe",
    "null": "nin:null",
    "spinjitzu": "nin:cole/spinjitzu_cole",
    "airjitzu":"nin:cole/airjitzucole",
    "drill_back": "nin:custom/drill_texture",
    "shield": "nin:custom/blake_shield",
    "shield_lights": "nin:custom/blake_shield_lights",
    "blade": "nin:custom/blake_blade",
    "blade_lights": "nin:custom/blake_blade_lights",
});
var airjitzu;
var spinjitzu;
var scythe;
var overlay;
var punch;
var punch2;
var utils = implement("fiskheroes:external/utils");

function invis(entity) {
    return (entity.getData("fiskheroes:punchmode"));
}
function fly(entity) {
    return !entity.isOnGround() && (entity.getData("fiskheroes:dyn/steel_timer") == 1);
}
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("custom/blake_0", "custom/blake_1", "custom/blake_2", "custom/blake_3");
    renderer.setTexture((entity, renderLayer) => {
        if (invis(entity)) {
            return "null";
        }
        // if (fly(entity)) {
        //     return "null";
        // }
        if (renderLayer == "HELMET") {
            return entity.getWornChestplate().suitType() == $SUIT_NAME ? "layer1" : "layer2";
        }
        return "layer1";
    });
    //renderer.setLights((entity, renderLayer) => renderLayer == "CHESTPLATE" ? "lights" : null);

    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("HELMET", "CHESTPLATE");
}

function initEffects(renderer) {

    // scythe = renderer.createEffect("fiskheroes:model");
    // scythe.setModel(utils.createModel(renderer, "nin:scythe", null, "scythe"));
    // scythe.setOffset(12/*side to side*/, 7/*closeness to hands*/, -2/* Height */);
    // scythe.setRotation(180.0, 15.0, -90.0)
    // scythe.anchor.set("rightArm");
    // scythe.mirror = false;
    // scythe.opacity = 0.9;
    // scythe.setScale(1.25)
    
    spinjitzu = renderer.createEffect("fiskheroes:model");
    spinjitzu.setModel(utils.createModel(renderer, "nin:spinjitzu_zane", null, "spinjitzu"));
    spinjitzu.setOffset(1, 0, 1);
    spinjitzu.anchor.set("body");
    spinjitzu.mirror = false;
    spinjitzu.setScale(1.0)
    spinjitzu.opacity = 0.9;

    overlay = renderer.createEffect("fiskheroes:overlay");

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "nin:invisible", "body", 0xFFA500, [{
        "firstPerson":  [-4.5, 3.75, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [1.0, 1.0]  }
        ]);

        utils.bindBeam(renderer, "fiskheroes:energy_manipulation", "nin:empty", "rightArm", 0xFFA500, [
            { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [1.5, 1.5] }
        ]);

        renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return invis(entity) ? 0.9 : 1
    });
    var lightningsurge_color = 0xFFA500;
    var lightningsurge_beam = renderer.createResource("BEAM_RENDERER", "nin:punch");

    lightningsurgearms = utils.createLines(renderer, lightningsurge_beam, lightningsurge_color, [
        {"start": [1.3, -1.0, -1.1], "end": [-1.7, 6.5, -1.1], "size": [10.0, 10.0]},
        {"start": [-1.7, -1.0, -1.1], "end": [-0.3, 6.5, -1.1], "size": [10.0, 10.0]},
            
        {"start": [1.3, -1.0, 1.1], "end": [-1.7, 6.5, 1.1], "size": [10.0, 10.0]},
        {"start": [-1.7, -1.0, 1.1], "end": [-0.3, 6.5, 1.1], "size": [10.0, 10.0]},
            
        {"start": [-1.8, -1.0, 1.0], "end": [-1.8, 6.5, -1.0], "size": [10.0, 10.0]},
        {"start": [-1.8, -1.0, -1.0], "end": [-1.8, 6.5, 1.0], "size": [10.0, 10.0]},
            
        {"start": [0.4, -1.0, 1.0], "end": [0.4, 6.5, -1.0], "size": [10.0, 10.0]},
        {"start": [0.4, -1.0, -1.0], "end": [0.4, 6.5, 1.0], "size": [10.0, 10.0]}
    ]);
    lightningsurgearms.anchor.set("rightArm");
    lightningsurgearms.setScale(1.5);
    lightningsurgearms.mirror = false;
    utils.bindParticles(renderer, "nin:earthclone").setCondition(entity => invis(entity));
    utils.bindParticles(renderer, "nin:stone_hands").setCondition(entity => (entity.getInterpolatedData("fiskheroes:blade_timer") > 0 && entity.getInterpolatedData("fiskheroes:blade_timer") < 1));
    
    var lightningsurge_color = 0xFFA500;
    var lightningsurge_beam = renderer.createResource("BEAM_RENDERER", "nin:punch");
    lightningsurgearms = utils.createLines(renderer, lightningsurge_beam, lightningsurge_color, [
        {"start": [-1.3, -1.0, -1.1], "end": [1.7, 6.5, -1.1], "size": [10.0, 10.0]},
        {"start": [1.7, -1.0, -1.1], "end": [0.3, 6.5, -1.1], "size": [10.0, 10.0]},

        {"start": [-1.3, -1.0, 1.1], "end": [1.7, 6.5, 1.1], "size": [10.0, 10.0]},
        {"start": [1.7, -1.0, 1.1], "end": [0.3, 6.5, 1.1], "size": [10.0, 10.0]},

        {"start": [1.8, -1.0, 1.0], "end": [1.8, 6.5, -1.0], "size": [10.0, 10.0]},
        {"start": [1.8, -1.0, -1.0], "end": [1.8, 6.5, 1.0], "size": [10.0, 10.0]},

        {"start": [-0.4, -1.0, 1.0], "end": [-0.4, 6.5, -1.0], "size": [10.0, 10.0]},
        {"start": [-0.4, -1.0, -1.0], "end": [-0.4, 6.5, 1.0], "size": [10.0, 10.0]},
    ]);
    lightningsurgearms.anchor.set("leftArm");
    lightningsurgearms.setScale(1.25);
    lightningsurgearms.mirror = true;

    lightningsurgelegs = utils.createLines(renderer, lightningsurge_beam, lightningsurge_color, [
        {"start": [-1.0, 0.0, -1.1], "end": [1.2, 7.5, -1.1], "size": [10.0, 10.0]},
        {"start": [1.2, 0.0, -1.1], "end": [-1.0, 7.5, -1.1], "size": [10.0, 10.0]},

        {"start": [-1.0, 0.0, 1.1], "end": [1.2, 7.5, 1.1], "size": [10.0, 10.0]},
        {"start": [1.2, 0.0, 1.1], "end": [-1.0, 7.5, 1.1], "size": [10.0, 10.0]},

        {"start": [-1.2, 0.0, 1.0], "end": [-1.2, 7.5, -1.0], "size": [10.0, 10.0]},
        {"start": [-1.2, 0.0, -1.0], "end": [-1.2, 7.5, 1.0], "size": [10.0, 10.0]},

        {"start": [1.2, 0.0, 1.0], "end": [1.2, 7.5, -1.0], "size": [10.0, 10.0]},
        {"start": [1.2, 0.0, -1.0], "end": [1.2, 7.5, 1.0], "size": [10.0, 10.0]},
    ]);
    lightningsurgelegs.anchor.set("rightLeg");
    lightningsurgelegs.setScale(1.25);
    lightningsurgelegs.mirror = true;

    lightningsurgebody = utils.createLines(renderer, lightningsurge_beam, lightningsurge_color, [
        {"start": [3.5, 0.0, -1.4], "end": [-3.5, 7.5, -1.4], "size": [10.0, 10.0]},
        {"start": [-3.5, 0.0, -1.4], "end": [3.5, 7.5, -1.4], "size": [10.0, 10.0]},

        {"start": [3.5, 0.0, 1.4], "end": [-3.5, 7.5, 1.4], "size": [10.0, 10.0]},
        {"start": [-3.5, 0.0, 1.4], "end": [3.5, 7.5, 1.4], "size": [10.0, 10.0]},
    ]);
    lightningsurgebody.anchor.set("body");
    lightningsurgebody.setScale(1.25);
    lightningsurgebody.mirror = false;

    lightningsurgehead = utils.createLines(renderer, lightningsurge_beam, lightningsurge_color, [
        {"start": [2.5, -0.5, -2.5], "end": [-2.5, -4.5, -2.5], "size": [10.0, 10.0]},
        {"start": [-2.5, -0.5, -2.5], "end": [2.5, -4.5, -2.5], "size": [10.0, 10.0]},

        {"start": [2.5, -0.5, 2.5], "end": [-2.5, -4.5, 2.5], "size": [10.0, 10.0]},
        {"start": [-2.5, -0.5, 2.5], "end": [2.5, -4.5, 2.5], "size": [10.0, 10.0]},

        {"start": [-2.5, -0.5, 2.5], "end": [-2.5, -4.5, -2.5], "size": [10.0, 10.0]},
        {"start": [-2.5, -0.5, -2.5], "end": [-2.5, -4.5, 2.5], "size": [10.0, 10.0]},

        {"start": [2.5, -0.5, 2.5], "end": [2.5, -4.5, -2.5], "size": [10.0, 10.0]},
        {"start": [2.5, -0.5, -2.5], "end": [2.5, -4.5, 2.5], "size": [10.0, 10.0]},

        {"start": [2.5, -5.2, 3.0], "end": [-2.5, -5.2, -3.0], "size": [10.0, 10.0]},
        {"start": [-2.5, -5.2, 3.0], "end": [2.5, -5.2, -3.0], "size": [10.0, 10.0]},
    ]);
    lightningsurgehead.anchor.set("head");
    lightningsurgehead.setScale(1.25);
    lightningsurgehead.mirror = false;

    lightningsurgearmsoriginal = utils.createLines(renderer, lightningsurge_beam, lightningsurge_color, [
        {"start": [1.3, -1.0, -1.1], "end": [-1.7, 6.5, -1.1], "size": [10.0, 10.0]},
        {"start": [-1.7, -1.0, -1.1], "end": [-0.3, 6.5, -1.1], "size": [10.0, 10.0]},
        
        {"start": [1.3, -1.0, 1.1], "end": [-1.7, 6.5, 1.1], "size": [10.0, 10.0]},
        {"start": [-1.7, -1.0, 1.1], "end": [-0.3, 6.5, 1.1], "size": [10.0, 10.0]},
        
        {"start": [-1.8, -1.0, 1.0], "end": [-1.8, 6.5, -1.0], "size": [10.0, 10.0]},
        {"start": [-1.8, -1.0, -1.0], "end": [-1.8, 6.5, 1.0], "size": [10.0, 10.0]},
        
        {"start": [0.4, -1.0, 1.0], "end": [0.4, 6.5, -1.0], "size": [10.0, 10.0]},
        {"start": [0.4, -1.0, -1.0], "end": [0.4, 6.5, 1.0], "size": [10.0, 10.0]}
    ]);
    lightningsurgearmsoriginal.anchor.set("rightArm");
    lightningsurgearmsoriginal.setScale(1.25);
    lightningsurgearmsoriginal.mirror = false;

    drill_back = renderer.createEffect("fiskheroes:model");
    drill_back.setModel(utils.createModel(renderer, "nin:drill_back", null, "drill_back"));
    drill_back.setOffset(0.0, 0.0, 0.0);
    drill_back.setRotation(0.0, 0.0, 0.0)
    drill_back.anchor.set("body");
    drill_back.mirror = false
    drill_back.opacity = 0.9;
    drill_back.setScale(0.75)

    blade = renderer.createEffect("fiskheroes:shield");
    blade.texture.set("blade", "blade_lights");
    blade.anchor.set("rightArm");
    blade.setOffset(1.5, 8.0, 0.0);
    blade.large = true;

    shield = renderer.createEffect("fiskheroes:shield");
    shield.texture.set("shield", "shield_lights");
    shield.anchor.set("rightArm");
    shield.setRotation(0.0, 0.0, -10.0).setCurve(15.0, 50.0);
    shield.large = true;

}
function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.FLIGHT");
    renderer.removeCustomAnimation("basic.HOVER");
    renderer.removeCustomAnimation("basic.AIMING");
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    addAnimationWithData(renderer, "basic.AIMING", "fiskheroes:aiming_fpcorr", "fiskheroes:energy_projection").setCondition(entity => (entity.isSprinting() && entity.getData("fiskheroes:dyn/steel_timer") > 0.1));
    //addAnimationWithData(renderer, "basic.AIMING", "nin:nothing", "fiskheroes:aiming_timer");
    utils.addFlightAnimation(renderer, "blake.FLIGHT", "fiskheroes:flight/default.anim.json");
    utils.addHoverAnimation(renderer, "blake.HOVER", "fiskheroes:flight/idle/neutral");    addAnimationWithData(renderer, "ninja.SPRINT",  "fiskheroes:speedster_sprint", "fiskheroes:moving").setCondition(entity => (entity.isSprinting() && !invis(entity)));
    addAnimation(renderer, "antimonitor.ANTIBLAST", "nin:nothing").setData((entity, data) =>
        data.load(Math.min(Math.max(entity.getInterpolatedData("fiskheroes:beam_charge") / 1, 0), 1)));
    // addAnimation(renderer, "cole.SCYTHE", "nin:scythe").setData((entity, data, isFirstPersonArm) => 
    //     data.load(Math.max(entity.getData("fiskheroes:blade") && !entity.getPunchTimerInterpolated() && !entity.getData("fiskheroes:moving"))));
    // addAnimationWithData(renderer, "cole.SCYTHEMOVING", "nin:stick", "nin:dyn/blade").setData((entity, data) => (entity.getData("fiskheroes:moving") && !entity.getPunchTimerInterpolated()));
    /*addAnimationWithData(renderer, "cole.SPIN", "nin:spin").setData((entity, data) => {
        data.load(entity.getData('fiskheroes:energy_projection_timer'));
    });
    addAnimationWithData(renderer, "cole.SPINFULL", "nin:spinjitzu").setData((entity, data) => {
        data.load(entity.getData('fiskheroes:energy_projection_timer') && entity.loop(5) * 10);
    });*/
    // entity.getData("fiskheroes:blade") && !entity.getData("fiskheroes:moving")
    };



function render(entity, renderLayer, isFirstPersonArm) {
    blade.unfold = entity.getInterpolatedData("fiskheroes:blade_timer");
    blade.render();

    shield.unfold = entity.getInterpolatedData("fiskheroes:shield_timer");
    shield.setOffset(2.9 + 1.8 * Math.min(shield.unfold * 5, 1), 6.0, 0.0);
    shield.render();
    if (entity.isWearingFullSuit()) {
        overlay.render();
    }
        if (invis(entity)) {
            spinjitzu.setRotation(0, entity.loop(2) * 360, 0)
            spinjitzu.render();
        }
        // if (fly(entity)) {
        //     airjitzu.setRotation(0, entity.loop(2) * 1000, 0)
        //     airjitzu.render();
        // }
        if (renderLayer == "CHESTPLATE" && entity.isSprinting() && entity.getData("fiskheroes:dyn/steel_timer") > 0.1 ||entity.getData("fiskheroes:speeding")) {
            var punch_timer = entity.getInterpolatedData('fiskheroes:dyn/steel_timer');
        
            lightningsurgearms.setScale(1.5);
            lightningsurgearms.progress = punch_timer * 1.2;
            lightningsurgearms.render();
        }
        if (entity.getData("fiskheroes:speeding")) {
            lightningsurgearmsoriginal.render();
            lightningsurgearms.progress = 1;
            lightningsurgearms.render();
            lightningsurgehead.render();
            lightningsurgebody.render();
            lightningsurgelegs.render();
        }
        if (!isFirstPersonArm){
        }
        if (entity.getHeldItem().isEmpty() && !invis(entity) /*&& !fly(entity)*/) {
            drill_back.setOffset(2.0, -9.0, 2.5);
            drill_back.setRotation(0.0, 0.0, 0.0);
            drill_back.setScale(0.75);
            drill_back.render();
        }
}