extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "nin:zane/ninjagozane_layer1",
    "layer2": "nin:zane/ninjagozane_layer2",
    "mask": "nin:zane/ninjagozane_mask",
    "shuriken": "nin:zane/soi_texture",
    "null": "nin:null",
    "soi_texture": "nin:zane/soi_texture",
    "spinjitzu": "nin:zane/spinjitzu_zane",
    "st": "nin:zane/soi_texture",
    "airjitzu":"nin:zane/airjitzuzane"
});
var spinjitzu;
var shuriken;
var overlay;
var st;
var utils = implement("fiskheroes:external/utils");

function invis(entity) {
    return entity.getData("nin:dyn/powerset") == 2 && /*entity.getData("nin:dyn/spinning")*/ entity.getData("nin:dyn/spin_timer") > .36;
}
function fly(entity) {
    return !entity.isOnGround() && (entity.getData("fiskheroes:dyn/steel_timer") == 1);
}
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("zane/zane_0", "zane/zane_1", "zane/zane_2", "zane/zane_3");
    renderer.setTexture((entity, renderLayer) => {
        if (invis(entity)) {
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

function initEffects(renderer) {
    var shurikenthrow = renderer.createResource("MODEL", "nin:st");
    shurikenthrow.texture.set("st");
    shurikenthrow.bindAnimation("nin:shurikenthrow").setData((entity, data) => {
		data.load(entity.getData("fiskheroes:blade") && entity.getData("fiskheroes:beam_charge"));
	});
    throwableshuriken = renderer.createEffect("fiskheroes:model");
    throwableshuriken.setModel(utils.createModel(renderer, "nin:st", null, "st"));
    throwableshuriken.setOffset(1, 0, 2);
    throwableshuriken.setRotation(0.0, 0.0, 180.0)
    throwableshuriken.anchor.set("rightArm");
    throwableshuriken.mirror = false;
    throwableshuriken.setScale(0.5)
    throwableshuriken.opacity = 0.9;

    shurikenback = renderer.createEffect("fiskheroes:model");
    shurikenback.setModel(utils.createModel(renderer, "nin:shurikenback", null, "soi_texture"));
    shurikenback.setOffset(-1.2, 0, 3);
    shurikenback.setRotation(0.0, 90.0, 0.0)
    shurikenback.anchor.set("body");
    shurikenback.mirror = false;
    shurikenback.setScale(0.25)

    shuriken = renderer.createEffect("fiskheroes:model");
    shuriken.setModel(utils.createModel(renderer, "nin:shuriken_left", null, "soi_texture"));
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
        .setData((entity, data) => data.load(entity.getInterpolatedData("nin:dyn/spin_timer")))
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

    renderer.bindProperty("fiskheroes:energy_bolt").color.set(0x00ACFF);
    overlay = renderer.createEffect("fiskheroes:overlay");


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "nin:empty", "body", 0x000000, [{
                "firstPerson": [0.0, 0.0, 0.0],
                "offset": [0.0, 0.0, 0.0],
                "size": [1.0, 1.0]
            }
        ]);
    utils.bindBeam(renderer, "fiskheroes:energy_projection", "nin:zane", "rightArm", 0x4CB5FF, [{
            "firstPerson": [-4.5, 3.75, -8.0],
            "offset": [-0.5, 9.0, 0.0],
            "size": [2.0, 2.0]
            }
        ]).setCondition(entity => (entity.getData("nin:dyn/powerset") == 1));
    utils.bindBeam(renderer, "fiskheroes:energy_projection", "nin:invisible", "rightArm", 0x4CB5FF, [{
        "firstPerson": [-4.5, 3.75, -8.0],
        "offset": [-0.5, 9.0, 0.0],
        "size": [2.0, 2.0]
        }
    ]).setCondition(entity => (entity.getData("nin:dyn/powerset") == 2));
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
        utils.bindParticles(renderer, "nin:ice_hands").setCondition(entity => (entity.getInterpolatedData("fiskheroes:blade_timer") > 0 && entity.getInterpolatedData("fiskheroes:blade_timer") < 1));
        utils.bindParticles(renderer, "nin:ice_hands").setCondition(entity => (entity.getData("fiskheroes:cryo_charging")));
        // utils.bindParticles(renderer, "nin:iceclone").setCondition(entity => invis(entity));
        renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return fly(entity) || invis(entity) ? 0.9 : 1
    });

    utils.bindParticles(renderer, "nin:zane_spin").setCondition(entity => (invis(entity)));

    renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "body", "scale": 0.5, "offset": [2.75, 7.5, 3.0], "rotation": [35.0, 90.0, 0.0] },
        { "anchor": "body", "scale": 0.5, "offset": [0.0, 6.5, 3.0], "rotation": [-10.0, 90.0, 0.0] }
    ]).slotIndex = 0;
}
function getBlockInFront(entity) {
    var pos = entity.pos();
    var yaw = entity.rotBodyYaw() * Math.PI / 180;
    var x = Math.round(Math.sin(yaw));
    var z = Math.round(Math.cos(yaw));
    return entity.world().getBlock(pos.x() + x, pos.y(), pos.z() + z);
}
function getBlockOnLeft(entity) {
    var pos = entity.pos();
    var yaw = (entity.rotBodyYaw() - 90) * Math.PI / 180;
    var x = Math.round(Math.sin(yaw));
    var z = Math.round(Math.cos(yaw));
    return entity.world().getBlock(pos.x() + x, pos.y(), pos.z() + z);
}
function getBlockOnRight(entity) {
    var pos = entity.pos();
    var yaw = (entity.rotBodyYaw() + 90) * Math.PI / 180;
    var x = Math.round(Math.sin(yaw));
    var z = Math.round(Math.cos(yaw));
    return entity.world().getBlock(pos.x() + x, pos.y(), pos.z() + z);
}
function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.AIMING");
    renderer.removeCustomAnimation("basic.SPRINT");
    addAnimation(renderer, "antimonitor.ANTIBLAST", "fiskheroes:aiming")
    .setData((entity, data) =>data.load(Math.min(Math.max(entity.getInterpolatedData("fiskheroes:energy_projection") / 1, 0), 1)))
    .setCondition(entity => (entity.getData("fiskheroes:energy_projection")));

    renderer.removeCustomAnimation("basic.BLOCKING");
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");

    addAnimation(renderer, "zane.SPINJITZU", "nin:spinjitzu_stance")
    .setData((entity, data) => {data.load(entity.getData("nin:dyn/spin_start_timer") * 1.2)})
    .setCondition(entity => (entity.getData("nin:dyn/powerset") == 2));
    
    addAnimation(renderer, "zane.SPINJITZU_SPIN", "nin:spinjitzu_spinning")
    .setData((entity, data) => {data.load(entity.loop(12))})
    .setCondition(entity => (entity.getData("nin:dyn/powerset") == 2) && entity.getData("nin:dyn/spin_start_timer") > 0.20);
    
    addAnimation(renderer, "WALL_HOLD_RIGHT", "nin:wall_hold_right")
    .setData((entity, data) => {data.load(0, entity.getData("nin:dyn/climb_bool"))})
    .setCondition(entity => (getBlockOnLeft(entity) != 'minecraft:air' && entity.world().getBlock(entity.pos().add(0, -1, 0)) == 'minecraft:air' && getBlockInFront(entity) == 'minecraft:air' && entity.getData("nin:dyn/climb_bool") && !entity.isOnGround()));

    addAnimation(renderer, "WALL_RUN_RIGHT", "nin:wall_run_right")
    .setData((entity, data) => {data.load(0, entity.loop(6))})
    .setCondition(entity => (getBlockOnLeft(entity) != 'minecraft:air' && entity.world().getBlock(entity.pos().add(0, -1, 0)) == 'minecraft:air' && getBlockInFront(entity) == 'minecraft:air' && entity.getData("nin:dyn/climb_bool") && !entity.isOnGround() && entity.getData("fiskheroes:moving")));

    addAnimation(renderer, "WALL_HOLD_LEFT", "nin:wall_hold_left")
    .setData((entity, data) => {data.load(0, entity.getData("nin:dyn/climb_bool"))})
    .setCondition(entity => (getBlockOnRight(entity) != 'minecraft:air' && entity.world().getBlock(entity.pos().add(0, -1, 0)) == 'minecraft:air' && getBlockInFront(entity) == 'minecraft:air' && entity.getData("nin:dyn/climb_bool") && !entity.isOnGround()));

    addAnimation(renderer, "WALL_RUN_LEFT", "nin:wall_run_left")
    .setData((entity, data) => {data.load(0, entity.loop(6))})
    .setCondition(entity => (getBlockOnRight(entity) != 'minecraft:air' && entity.world().getBlock(entity.pos().add(0, -1, 0)) == 'minecraft:air' && getBlockInFront(entity) == 'minecraft:air' && entity.getData("nin:dyn/climb_bool") && !entity.isOnGround() && entity.getData("fiskheroes:moving")));

    addAnimation(renderer, "WALL_JUMP_UP", "nin:wall_climb")
    .setData((entity, data) => {data.load(0, entity.loop(6))})
    .setCondition(entity => (getBlockInFront(entity) != 'minecraft:air') && entity.getData("nin:dyn/climb_bool") && entity.getData("fiskheroes:moving"));

    addAnimation(renderer, "WALL_HOLD_STRAIGHT", "nin:wall_hold")
    .setData((entity, data) => {data.load(0, entity.getData("nin:dyn/climb_bool"))})
    .setCondition(entity => (getBlockInFront(entity) != 'minecraft:air') && entity.getData("nin:dyn/climb_bool"));

    // addAnimation(renderer, "zane.IDLE", "nin:armidle").setData((entity, data) =>
    //     data.load(!entity.getData("fiskheroes:beam_charging") && !entity.getData("fiskheroes:moving") && !entity.getPunchTimerInterpolated()));
    /*addAnimation(renderer, "zane.LEFTHIT", "nin:leftarmhitting").setData((entity, data) =>
        data.load(entity.getPunchTimerInterpolated() && !entity.getData("fiskheroes:beam_charging"))); */       
    utils.addHoverAnimation(renderer, "zane.HOVER", "nin:swim").setCondition(entity => (entity.isInWater() && !entity.getData("nin:dyn/spinning")))
    addAnimationWithData(renderer, "ninja.SPRINT",  "fiskheroes:speedster_sprint", "fiskheroes:moving").setCondition(entity => (entity.isSprinting() && !invis(entity) && !entity.getData("nin:dyn/spinning")));
    addAnimationWithData(renderer, "zane.SHURIKENTHROW", "nin:throw_aiming", "fiskheroes:beam_charging").setCondition(entity => (entity.getData("nin:dyn/powerset") == 1 && entity.getData("fiskheroes:beam_charging") && !entity.getData("nin:dyn/spinning")));
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
        if ((entity.getInterpolatedData("nin:dyn/spin_timer") / 2) > 0 && entity.getData("nin:dyn/powerset") == 2) {
            // spinjitzu.setRotation(0, entity.loop(2) * 360, 0)
            // spinjitzu.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
            spinjitzu.render();
            if (isFirstPersonArm) {
                spinjitzu.opacity = 0.05;
            }
            else if (!isFirstPersonArm && entity.getData("nin:dyn/spin_timer") > 0 && entity.getData("nin:dyn/spin_timer") < 0.5) {
                s = entity.getData("nin:dyn/spin_timer");
                spinjitzu.opacity = s;
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
        if (entity.getData("fiskheroes:blade") && entity.getData("fiskheroes:beam_charging")) {
            // throwableshuriken.render();
            // throwableshuriken.setOffset(1, Math.max(-1* (1 - (entity.getInterpolatedData('heat_vision_length') * 16))), 4);
            // throwableshuriken.setRotation(entity.loop(2) * 180, 0, 0)
        }
    
}
