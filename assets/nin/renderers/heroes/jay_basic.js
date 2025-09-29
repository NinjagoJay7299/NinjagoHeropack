extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "nin:jay/ninjagojay_layer1",
    "layer2": "nin:jay/ninjagojay_layer2",
    "mask": "nin:jay/ninjagojay_mask",
    "nunchuck": "nin:jay/nol1",
    "nolback": "nin:jay/nolback",
    "null": "nin:null",
    "spinjitzu": "nin:jay/spinjitzu_jay",
    "nunhand": "nin:jay/nunhand",
    "airjitzu":"nin:jay/airjitzujay",
    "nunchuck_pose": "nin:jay/nunchuck_pose",
    "nunchuck_normal_back": "nin:jay/nunchucks_normal",
});
var airjitzu;
var nunhand;
var spinjitzu;
var nunchuck;
var overlay;
var utils = implement("fiskheroes:external/utils");
function isGolden(entity) {
    return false;
}
function invis(entity) {
    return (entity.getData("fiskheroes:energy_projection"));
}
function fly(entity) {
    return !entity.isOnGround() && (entity.getData("fiskheroes:dyn/steel_timer") == 1);
}
function nunchuckenabled(entity) {
    return entity.getHeldItem().nbt().getString("WeaponType") == "nin:nol" && !entity.getPunchTimerInterpolated();
}
function pull(property) {
    var properties = {
        "spinjitzu": "nin:blue_lightning",
    }
    return properties[property];
}
var color = 0x0000FF
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("jay/jay_0", "jay/jay_1", "jay/jay_2", "jay/jay_3");
    renderer.setTexture((entity, renderLayer) => {
        if (invis(entity)) {
            return "null";
        }
        if (fly(entity)) {
            return "null";
        }
        /*if (nunchuckenabled(entity) && entity.isSprinting()) {
            return "null";
        }*/
        return "layer1";
    });
    //renderer.setLights((entity, renderLayer) => renderLayer == "CHESTPLATE" ? "lights" : null);

    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("HELMET", "CHESTPLATE");
}

function initEffects(renderer) {
    bolt = renderer.createEffect("fiskheroes:model");
    bolt.setModel(utils.createModel(renderer, "nin:bolt", null, "nunchuck"));
    bolt.setOffset(-4, -9, -6);
    bolt.setRotation(90.0, 0.0, 0.0)
    bolt.anchor.set("rightArm");
    bolt.mirror = false;
    bolt.opacity = 0.9;

    nunhand = renderer.createEffect("fiskheroes:model");
    nunhand.setModel(utils.createModel(renderer, "nin:nunhand", null, "nunhand"));
    nunhand.setOffset(-18, 10, -8);
    nunhand.setRotation(90.0, 0.0, 0.0)
    nunhand.anchor.set("rightArm");
    nunhand.mirror = false;
    nunhand.opacity = 0.9;

    nunright = renderer.createEffect("fiskheroes:model");
    nunright.setModel(utils.createModel(renderer, "nin:nunright", null, "nunchuck"));
    nunright.setOffset(8, -8, -7);
    nunright.setRotation(90.0, 0.0, 0.0)
    nunright.anchor.set("rightArm");
    nunright.mirror = false;
    nunright.opacity = 0.9;

    nunhit = renderer.createEffect("fiskheroes:model");
    nunhit.setModel(utils.createModel(renderer, "nin:nunhit1", null, "nunchuck"));
    nunhit.setOffset(7.5, -5, -20);
    nunhit.setRotation(0.0, -90.0, -90.0)
    nunhit.anchor.set("rightArm");
    nunhit.mirror = false;
    nunhit.opacity = 0.9;

    nunleft = renderer.createEffect("fiskheroes:model");
    nunleft.setModel(utils.createModel(renderer, "nin:nunright", null, "nunchuck"));
    nunleft.setOffset(6, -8, -7);
    nunleft.setRotation(90.0, 0.0, 0.0)
    nunleft.anchor.set("leftArm");
    nunleft.mirror = false;
    nunleft.opacity = 0.9;

    nunhand2 = renderer.createEffect("fiskheroes:model");
    nunhand2.setModel(utils.createModel(renderer, "nin:nunhand", null, "nunhand"));
    nunhand2.setOffset(-18, 15, 0);
    nunhand2.setRotation(180.0, 0.0, 0.0)
    nunhand2.anchor.set("rightArm");
    nunhand2.mirror = false;
    nunhand2.opacity = 0.9;

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
    airjitzu.setScale(0.75)
    airjitzu.opacity = 0.1;

    var nunchuckhit = renderer.createResource("MODEL", "nin:nol_left");
    nunchuckhit.bindAnimation("nin:twist").setData((entity, data) => {
        data.load(entity.getData("fiskheroes:beam_charging"));
    });
		nunchuckhit.texture.set("nunchuck");

		nunchucks = renderer.createEffect("fiskheroes:model").setModel(nunchuckhit);
        nunchucks.setOffset(-2, 14, -.25);
        nunchucks.setRotation(90, 90.0, 15.0)
		nunchucks.anchor.set("rightArm");
        nunchucks.setScale(0.65)

        nolback = renderer.createEffect("fiskheroes:model");
        nolback.setModel(utils.createModel(renderer, "nin:nol_back", null, "nolback"));
        nolback.setOffset(-3.5, -1.9, 7);
        nolback.setRotation(0.0, 0.0, 0.0)
        nolback.setScale(0.6)
		nolback.anchor.set("body");

        nolback2 = renderer.createEffect("fiskheroes:model");
        nolback2.setModel(utils.createModel(renderer, "nin:nunchucks_normal_back", "nunchuck_normal_back"));
        nolback2.setOffset(-6.6, -2.5, 9);
        nolback2.setRotation(0.0, 90.0, 0.0)
        nolback2.setScale(0.4)
		nolback2.anchor.set("body");

        nol_right = renderer.createEffect("fiskheroes:model");
        nol_right.setModel(utils.createModel(renderer, "nin:nol_left", null, "nunchuck"));
        nol_right.setOffset(-3, 14, -3);
        nol_right.setRotation(90, 90.0, 56.0)
        nol_right.setScale(0.65)
		nol_right.anchor.set("rightArm");
        
        nunchuck_pose = renderer.createEffect("fiskheroes:model");
        nunchuck_pose.setModel(utils.createModel(renderer, "nin:nunchuck_pose", null, "nunchuck_pose"));
        nunchuck_pose.setOffset(5, -5, 2);
        nunchuck_pose.setRotation(0, 0.0, -37.0)
        nunchuck_pose.setScale(1.0)
		nunchuck_pose.anchor.set("body");

    overlay = renderer.createEffect("fiskheroes:overlay");

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "nin:invisible", "body", 0x000000, [{
                "firstPerson": [0, 0, 0],
                "offset": [0, 0, 0],
                "size": [1, 1]
            }
        ]);//color

    utils.bindBeam(renderer, "fiskheroes:lightning_cast", "fiskheroes:energy_discharge", "rightArm", color, [{
                "firstPerson": [-8.0, 4.5, -10.0],
                "offset": [-0.5, 9.0, 0.0],
                "size": [0.75, 0.75]
            }
        ]);

    utils.bindBeam(renderer, "fiskheroes:energy_manipulation", "fiskheroes:energy_discharge", "rightArm", color, [{
                "firstPerson": [-8.0, 4.5, -10.0],
                "offset": [-0.5, 9.0, 0.0],
                "size": [1.5, 1.5]
            }

        ]);
        utils.bindBeam(renderer, "fiskheroes:charged_beam", "nin:jay", "rightArm", color, [
            { "firstPerson":  [-4.5, 3.75, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [1.0, 1.0]  }
            //for left arm
            //{ "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [2.0, 2.0], "anchor": "leftArm" }
        ]);
        var lightningsurge_color = color;
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

        /*nunlightning = utils.createLines(renderer, lightningsurge_beam, lightningsurge_color, [
            {"start": [1.3, -1.0, -1.1], "end": [-1.7, 6.5, -1.1], "size": [10.0, 10.0]},
            {"start": [-1.7, -1.0, -1.1], "end": [-0.3, 6.5, -1.1], "size": [10.0, 10.0]},
        ]);    
        nunlightning.anchor.set("rightArm", nol_right.getCubeOffset("cubeoffset"));
        nunlightning.setScale(1.5);
        nunlightning.mirror = false;*/

        
    var sprint = renderer.bindProperty("fiskheroes:trail");  
    sprint.setTrail(renderer.createResource("TRAIL", pull("spinjitzu")));
    sprint.setCondition(entity => (entity.getData("fiskheroes:energy_projection")));

    utils.bindParticles(renderer, "nin:blue_hands").setCondition(entity => (entity.getInterpolatedData("fiskheroes:blade_timer") > 0 && entity.getInterpolatedData("fiskheroes:blade_timer") < 1));
    renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return fly(entity) || invis(entity) ? 0.9 : 1
    });
    var nunchuckhitmodel = utils.createModel(renderer, "nin:nol_idek_3", null, "nunchuck");
    nunchuckhitmodel.bindAnimation("nin:nol_hit_v3").setData((entity, data) => {
        data.load(entity.getPunchTimerInterpolated());
    });
    nunchuckhitting = renderer.createEffect("fiskheroes:model").setModel(nunchuckhitmodel);
    nunchuckhitting.setOffset(-5, 2, -14.5);
    nunchuckhitting.setRotation(0, 90.0, 90.0)
    nunchuckhitting.setScale(0.75)
    nunchuckhitting.anchor.set("rightArm");

    // chain = utils.createLines(renderer, "nin:lightning_cast", 0x0A92D8, [
    //     {"start": [0.0, 0.0, 4.0], "end": [0.0, 0.0, 0.0], "size": [1.0, 1.0]},
    // ]);
	// chain.setOffset(0, 0.0, 0.0).setScale(1.0, 1.0, 1.0);
	// chain.setAnchorCube(nunchuckhitting.getCubeOffset("nunchuck1"));

	// chain1 = utils.createLines(renderer, "nin:lightning_cast", 0x0A92D8, [
    //     {"start": [0.0, 0.0, 4.0], "end": [0.0, 0.0, 0.0], "size": [1.0, 1.0]},
    // ]);
	// chain1.setOffset(0, 0.0, 0.0).setScale(1.0, 1.0, 1.0);
	// chain1.setAnchorCube(nunchuckhitting.getCubeOffset("nunchuck2"));
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
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
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

    utils.addHoverAnimation(renderer, "jay.HOVER", "nin:swim").setCondition(entity => (entity.isInWater()))
    addAnimationWithData(renderer, "basic.AIMING", "fiskheroes:dual_aiming", "fiskheroes:aiming_timer");
    addAnimationWithData(renderer, "ninja.SPRINT",  "fiskheroes:speedster_sprint", "fiskheroes:moving").setCondition(entity => (entity.isSprinting() && !invis(entity)));
    addAnimationWithData(renderer, "jay.CHARGEDBEAM", "fiskheroes:aiming", "fiskheroes:beam_charging").setCondition(entity => (entity.getData("fiskheroes:beam_charging")));
    //addAnimation(renderer, "jay.NUNCHUCKS", "nin:nunchucks").setCondition(entity => (entity.getHeldItem().nbt().getString("WeaponType") == "nin:nol"));
    // addAnimation(renderer, "jay.NUNCHUCKS", "nin:nunchucks")
    //     .setData((entity, data) => data.load(entity.getHeldItem().nbt().getString("WeaponType") == "nin:nol" && !entity.getPunchTimerInterpolated()))
    //     .setCondition(entity => (!entity.getData("fiskheroes:moving") && !entity.getInterpolatedData("fiskheroes:beam_charge")));
    //addAnimationWithData(renderer, "jay.NUNCHUCKS", "nin:nun_right", "fiskheroes:blade").setCondition(entity => (entity.exists()));

    /*addAnimationWithData(renderer, "jay.SPIN", "nin:spin").setData((entity, data) => {
        data.load(entity.getData('fiskheroes:energy_projection_timer'));
    });
    addAnimationWithData(renderer, "jay.SPINFULL", "nin:spinjitzu").setData((entity, data) => {
        data.load(entity.getData('fiskheroes:energy_projection_timer') && entity.loop(5) * 10);
    });*/
 }
function render(entity, renderLayer, isFirstPersonArm) {
    if (entity.isWearingFullSuit()) {
        overlay.render();
    /*if (entity.getHeldItem().nbt().getString("WeaponType") == "nin:nol" && !entity.isSprinting()) {
        nol_right.render();
    }
    if (entity.getHeldItem().nbt().getString("WeaponType") == "nin:nol" && entity.isSprinting()) {
        nunchucks.render();
    }*/
    if (entity.getHeldItem().nbt().getString("WeaponType") == "nin:nol" && !entity.getInterpolatedData("fiskheroes:beam_charge") && !entity.getData("fiskheroes:moving") && !entity.getPunchTimerInterpolated()) {
        //bolt.render();
    }
    /*if (entity.getInterpolatedData("fiskheroes:beam_charge") && entity.getHeldItem().nbt().getString("WeaponType") == "nin:nol") {
        nunhand2.render()
    }*/
    if (isGolden(entity)) {
        if (entity.getHeldItem().isEmpty() && !invis(entity) && !fly(entity)){
            nolback.render()
        }
    } else{
        if (entity.getHeldItem().isEmpty() && !invis(entity) && !fly(entity)) {
            nolback2.render()
        }
    }   
    if (invis(entity)) {
        spinjitzu.setRotation(0, entity.loop(2) * 360, 0)
        spinjitzu.render();
    }
    if (fly(entity)) {
        airjitzu.setRotation(0, entity.loop(2) * 1000, 0)
        airjitzu.render();
    }
    if (renderLayer == "CHESTPLATE") {
        var punch_timer = entity.getInterpolatedData('fiskheroes:energy_charge');
    
        lightningsurgearms.progress = punch_timer;
        lightningsurgearms.render();
    }
    if (nunchuckenabled(entity) && (!entity.getData("fiskheroes:energy_projection")) && !entity.getInterpolatedData("fiskheroes:beam_charge") && !entity.getPunchTimerInterpolated() && !entity.getData("fiskheroes:moving")) {
        // nunright.render();
        // nunleft.render();
        // nunchuck_pose.render();
    }
    if (entity.getHeldItem().nbt().getString("WeaponType") == "nin:nol" && !entity.getInterpolatedData("fiskheroes:beam_charge") && !entity.getData("fiskheroes:energy_projection") && !entity.getData("fiskheroes:dyn/steel_timer") == 1) {
        //nunhit.render();
        // chain.progress = 1;
	    // chain.render();
	    // chain1.progress = 1;
	    // chain1.render();
        // nunchuckhitting.render();
    }
    if (entity.getHeldItem().nbt().getString("WeaponType") == "nin:nol" && entity.getData("fiskheroes:beam_charging")) {
        // nunhit.setOffset(7.5, 32, -13.5);
        // nunhit.setRotation(90.0, -90.0, -90.0)
        // nunhit.render();
    }
    /*if (entity.isSprinting()) {
        nunchuck_back.render();
    }*/
    }
}
