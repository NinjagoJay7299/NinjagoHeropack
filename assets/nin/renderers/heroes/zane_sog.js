extend("nin:zane_basic");
loadTextures({
    "layer1": "nin:zane/s8-sog-zane",
    "layer2": "nin:zane/s8-sog-zane",
    "mask": "nin:zane/ninjagozane_mask",
    "shuriken": "nin:zane/shuriken_normal",
    "null": "nin:null",
    "shuriken_normal": "nin:zane/shuriken_normal",
    "spinjitzu": "nin:zane/spinjitzu_zane",
    "st": "nin:zane/shuriken_normal"
});
var spinjitzu;
var shuriken;
var overlay;
var st;
var utils = implement("fiskheroes:external/utils");

function invis(entity) {
    return entity.getData("nin:dyn/powerset") == 2 && entity.getData("nin:dyn/spin_start_timer") >= 1.0;
}
function fly(entity) {
    return !entity.isOnGround() && (entity.getData("fiskheroes:dyn/steel_timer") == 1);
}
function shurikens(entity) {
    entity.getHeldItem().nbt().getString("WeaponType") == "nin:soi";
}
function disguised(entity) {
    return entity.getData("nin:dyn/isnt_default");
}
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("zane/zane_0", "zane/zane_1", "zane/zane_2", "zane/zane_3");renderer.setTexture((entity, renderLayer) => {
        if (invis(entity)) {
            return "null";
        }
        if (disguised(entity)) {
            return "null";
        }
        if (fly(entity)) {
            return "null";
        }
        if (renderLayer == "HELMET") {
            return entity.getWornChestplate().suitType() == $SUIT_NAME ? "layer1" : "layer2";
        }
        return "layer1";
    });
    //renderer.setLights((entity, renderLayer) => renderLayer == "CHESTPLATE" ? "lights" : null);

    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("HELMET", "CHESTPLATE");
}

function initEffects(renderer, entity) {
    var shurikenthrow = utils.createModel(renderer,"nin:shuriken_single", "st");
    shurikenthrow.bindAnimation("nin:shurikenthrowanim").setData((entity, data) => data.load(entity.getData("fiskheroes:beam_shooting") * 2));

    throwableshuriken = renderer.createEffect("fiskheroes:model").setModel(shurikenthrow);
    // throwableshuriken.setModel(utils.createModel(renderer, "nin:st", null, "st"));
    throwableshuriken.setOffset(1, 0, 2);
    throwableshuriken.setRotation(0.0, 0.0, 180.0)
    throwableshuriken.anchor.set("rightArm");
    throwableshuriken.mirror = false;
    throwableshuriken.setScale(0.5)
    throwableshuriken.opacity = 0.9;

    //samxmechmodel.bindAnimation("nin:samxhit1").setData((entity, data) => data.load(entity.getPunchTimerInterpolated()));

    // samxmech = renderer.createEffect("fiskheroes:model").setModel(samxmechmodel);
    // // samxmech.setModel(utils.createModel(renderer, "nin:samx", "mech"));
    // samxmech.setOffset(0.0, 0.0, 0.0);
    // samxmech.setRotation(0.0, 0.0, 0.0)
    // samxmech.anchor.set("body");
    // samxmech.mirror = false

    shurikenback = renderer.createEffect("fiskheroes:model");
    shurikenback.setModel(utils.createModel(renderer, "nin:shuriken_normal_back", "shuriken_normal"));
    shurikenback.setOffset(-2.1, 1, 3);
    shurikenback.setRotation(0.0, 0.0, 0.0)
    shurikenback.anchor.set("body");
    shurikenback.mirror = false;
    shurikenback.setScale(0.2)

    shuriken = renderer.createEffect("fiskheroes:model");
    shuriken.setModel(utils.createModel(renderer, "nin:shuriken_left", null, "shuriken_normal"));
    shuriken.setOffset(0.0, 12, -15);
    shuriken.setRotation(90, 90, 0);
    shuriken.setScale(0.5);
    shuriken.anchor.set("leftArm");
    shuriken.mirror = false;
    shuriken.opacity = 0.9;

    st = renderer.createEffect("fiskheroes:model");
    st.setModel(utils.createModel(renderer, "nin:st", null, "st"));
    st.setOffset(0, 0, 0);
    st.anchor.set("rightArm");
    st.mirror = false;
    st.opacity = 0.9;


    var spinjitzu_model = utils.createModel(renderer, "nin:spinjitzu_zane", null, "spinjitzu");
    spinjitzu_model.bindAnimation("nin:spinjitzu_up")
        .setData((entity, data) => data.load(entity.getInterpolatedData("nin:dyn/spin_timer") / 2))
    spinjitzu_model.bindAnimation("nin:spinjitzu_spin")
        .setData((entity, data) => data.load(entity.getData("nin:dyn/spin_timer") * entity.loop(2) * 10))
    spinjitzu = renderer.createEffect("fiskheroes:model").setModel(spinjitzu_model);
    spinjitzu.setOffset(1, 0, 1);
    spinjitzu.anchor.ignoreAnchor(true)
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

    overlay = renderer.createEffect("fiskheroes:overlay");

    

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "nin:empty", "body", 0x000000, [{
                "firstPerson": [0.0, 0.0, 0.0],
                "offset": [0.0, 0.0, 0.0],
                "size": [1.0, 1.0]
            }
        ])
        .setCondition(entity => (!invis(entity)));
    utils.bindBeam(renderer, "fiskheroes:energy_projection", "nin:zane", "rightArm", 0x4CB5FF, [{
            "firstPerson": [-4.5, 3.75, -8.0],
            "offset": [-0.5, 9.0, 0.0],
            "size": [2.0, 2.0]
            }
        ]).setCondition(entity => (!invis(entity)));

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "nin:invisible", "rightArm", 0x4CB5FF, [{
        "firstPerson": [-4.5, 3.75, -8.0],
        "offset": [-0.5, 9.0, 0.0],
        "size": [2.0, 2.0]
        }
        ]).setCondition(entity => (invis(entity)));
    utils.bindBeam(renderer, "fiskheroes:lightning_cast", "fiskheroes:lightning_cast", "rightArm", 0x4CB5FF, [{
                "firstPerson": [-8.0, 4.5, -10.0],
                "offset": [-0.5, 9.0, 0.0],
                "size": [0.75, 0.75]
            }
        ]);

    utils.bindBeam(renderer, "fiskheroes:energy_manipulation", "fiskheroes:energy_discharge", "rightArm", 0x4CB5FF, [{
                "firstPerson": [-2.5, 0.0, -7.0],
                "offset": [-0.5, 19.0, -12.0],
                "size": [1.5, 1.5]
            }

        ]);
        utils.bindParticles(renderer, "nin:ice_hands").setCondition(entity => (entity.getData("fiskheroes:aiming")));
        utils.bindParticles(renderer, "nin:ice_hands").setCondition(entity => (entity.getData("fiskheroes:cryo_charge") == 1));
        utils.bindParticles(renderer, "nin:ice_hands").setCondition(entity => (entity.getInterpolatedData("fiskheroes:blade_timer") > 0 && entity.getInterpolatedData("fiskheroes:blade_timer") < 1));
        utils.bindParticles(renderer, "nin:ice_hands").setCondition(entity => (entity.getData("fiskheroes:cryo_charging")));
        utils.bindParticles(renderer, "nin:iceclone").setCondition(entity => invis(entity));
        renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return fly(entity) || invis(entity) ? 0.9 : 1
    });
    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "fiskheroes:repulsor_blast", "rightArm", 0x4CB5FF, [
        { "firstPerson": [-4.5, 3.75, -7.0], "offset": [-0.5, 9.0, 0.0], "size": [1.5, 1.5] }
    ]).setCondition(entity => entity.ticksExisted() % 10 <= 5 * Math.random());
    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "fiskheroes:repulsor_blast", "leftArm", 0x4CB5FF, [
        {       "firstPerson": [4.5, 3.75, -7.0],
                "offset": [0.5, 8.0, 0.0],
                "size": [1.5, 1.5] 
        }
    ]).setCondition(entity => entity.ticksExisted() % 10 >= 5 * Math.random());

        renderer.bindProperty("fiskheroes:equipped_item").setItems([
            { "anchor": "body", "scale": 0.5, "offset": [2.75, 7.5, 3.0], "rotation": [35.0, 90.0, 0.0] },
            { "anchor": "body", "scale": 0.5, "offset": [0.0, 6.5, 3.0], "rotation": [-10.0, 90.0, 0.0] }
        ]).slotIndex = 0;
    renderer.bindProperty("fiskheroes:energy_bolt").color.set(0x00ACFF);

        // .setCondition(entity => entity.getData("fiskheroes:beam_charging"));
    
    // else {
    //     renderer.bindProperty("fiskheroes:equipped_item").setItems([
    //         { "anchor": "body", "scale": 0.5, "offset": [2.75, 7.5, 3.0], "rotation": [35.0, 90.0, 0.0] },
    //         { "anchor": "body", "scale": 0.5, "offset": [0.0, 6.5, 3.0], "rotation": [-10.0, 90.0, 0.0] }
    //     ]).slotIndex = 0;
    // }
    /*
"firstPerson": [4.5, 3.75, -7.0],
                "offset": [0.5, 8.0, 0.0],
                "size": [1.5, 1.5]
    */
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.AIMING");
    addAnimation(renderer, "antimonitor.ANTIBLAST", "fiskheroes:aiming").setData((entity, data) =>
        data.load(Math.min(Math.max(entity.getInterpolatedData("fiskheroes:energy_projection") / 1, 0), 1)));
    renderer.removeCustomAnimation("basic.BLOCKING");
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");

    addAnimation(renderer, "zane.SPINJITZU", "nin:spinjitzu_stance")
    .setData((entity, data) => {data.load(entity.getData("nin:dyn/spin_start_timer") * 1)})
    .setCondition(entity => (entity.getData("nin:dyn/powerset") == 2));
    
    addAnimation(renderer, "zane.SPINJITZU_SPIN", "nin:spinjitzu_spinning")
    .setData((entity, data) => {data.load(entity.loop(12))})
    .setCondition(entity => (entity.getData("nin:dyn/powerset") == 2) && entity.getData("nin:dyn/spin_start_timer") >= 0.75);

    addAnimationWithData(renderer, "random_repulsor.DUAL_AIMING", "fiskheroes:dual_aiming", "fiskheroes:aiming_timer")
    .setCondition(entity => (entity.getData("fiskheroes:aimed_timer") > 0));
	// addAnimation(renderer, "zane.DUAL_HIT", "nin:double_hit")
    // .setData((entity, data) => data.load(entity.getPunchTimerInterpolated()*entity.getInterpolatedData('fiskheroes:blade_timer')));

    

    utils.addHoverAnimation(renderer, "zane.HOVER", "nin:swim").setCondition(entity => (entity.isInWater()))
    addAnimationWithData(renderer, "ninja.SPRINT",  "fiskheroes:speedster_sprint", "fiskheroes:moving").setCondition(entity => (entity.isSprinting() && !invis(entity)));
    addAnimationWithData(renderer, "zane.SHURIKENTHROW", "nin:throw_aiming", "fiskheroes:beam_charging").setCondition(entity => (entity.getData("nin:dyn/powerset") == 1 && entity.getData("fiskheroes:beam_charging")));
    /*addAnimationWithData(renderer, "zane.SPIN", "nin:spin", "fiskheroes:beam_charging").setData((entity, data) => {
        data.load(entity.getData('fiskheroes:beam_shooting') && !entity.getData('fiskheroes:blade'));
    });
    addAnimationWithData(renderer, "zane.SPINFULL", "nin:spinjitzu").setData((entity, data) => {
        data.load(entity.getData('fiskheroes:beam_shooting') && entity.loop(5) * 10 && !entity.getData('fiskheroes:blade'));
    });*/
}

//getPunchTimer()
function render(entity, renderLayer, isFirstPersonArm) {
    overlay.render();
    if (entity.isWearingFullSuit()) {
        overlay.render();
    }
        if (/*(entity.getData("nin:dyn/spin_start_timer") > 1.0) && */entity.getData("nin:dyn/powerset") == 2) {
            spinjitzu.setRotation(0, entity.loop(2) * 360, 0)
            // spinjitzu.opacity = entity.getInterpolatedData("nin:dyn/spin_timer");
            spinjitzu.render();
            if (entity.getData("nin:dyn/spin_timer") < .25) {
                s = /*entity.getData("nin:dyn/spin_timer") * */ 0;
                spinjitzu.opacity = s;
            }
            else if (!isFirstPersonArm && entity.getData("nin:dyn/spin_timer") > .25 && entity.getData("nin:dyn/spin_timer") < 0.5) {
                s = entity.getData("nin:dyn/spin_timer");
                spinjitzu.opacity = s;
            }
            else if (isFirstPersonArm) {
                spinjitzu.opacity = 0.05;
            }
            else {
                spinjitzu.opacity = 0.9;
            }
        }

        if (fly(entity)) {
            airjitzu.setRotation(0, entity.loop(2) * 1000, 0)
            airjitzu.render();
        }

        if (entity.getHeldItem().nbt().getString("WeaponType") == "nin:soi" && !invis(entity)) {
            // shuriken.render();
        }
        if (entity.getHeldItem().isEmpty() && (!invis(entity) && !fly(entity))) {
            shurikenback.render();
        }
        if (entity.getData("fiskheroes:beam_charging")) {
            // throwableshuriken.render();
            // throwableshuriken.setOffset(1, Math.max(-1* (1 - (entity.getInterpolatedData('heat_vision_length') * 16))), 4);
            // throwableshuriken.setRotation(entity.loop(2) * 180, 0, 0)
        }
    
}
