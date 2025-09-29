extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "nin:cole/cole_zx",
    "layer2": "nin:cole/cole_zx",
    "mask": "nin:null",
    "scythe": "nin:cole/scythe",
    "null": "nin:null",
    "spinjitzu": "nin:cole/spinjitzu_cole",
    "airjitzu": "nin:cole/airjitzucole",
    "spikes": "nin:cole/dirttexture",
    "soq_back": "nin:cole/soq_texture",
    "arms": "nin:cole/cole_arms",
});
var airjitzu;
var spinjitzu;
var scythe;
var overlay;
var punch;
var punch2;
var utils = implement("fiskheroes:external/utils");

function invis(entity) {
    return (entity.getData("fiskheroes:energy_projection"));
}
function invis2(entity) {
    return (entity.getData("fiskheroes:beam_charge"));
}
function fly(entity) {
    return !entity.isOnGround() && (entity.getData("fiskheroes:dyn/steel_timer") == 1);
}
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("cole/cole_zx_0", "cole/cole_zx_1", "cole/cole_zx_2", "cole/cole_zx_3");
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
    scytheold = renderer.createEffect("fiskheroes:model");
    scytheold.setModel(utils.createModel(renderer, "nin:scythe", null, "scythe"));
    scytheold.setOffset(2, 5, -16);
    scytheold.setRotation(0.0, 90.0, 90.0)
    scytheold.anchor.set("rightArm");
    scytheold.mirror = false;
    scytheold.opacity = 0.9;
    scytheold.setScale(1.25)

    scytheoldfirst = renderer.createEffect("fiskheroes:model");
    scytheoldfirst.setModel(utils.createModel(renderer, "nin:scythe", null, "scythe"));
    scytheoldfirst.setOffset(2, 5, -16);
    scytheoldfirst.setRotation(-90.0, -90.0, 0.0)
    scytheoldfirst.anchor.set("rightArm");
    scytheoldfirst.mirror = false;
    scytheoldfirst.opacity = 0.9;
    scytheoldfirst.setScale(1.25)

    var earthspikesmodel = renderer.createResource("MODEL", "nin:dirtspikes");
    earthspikesmodel.bindAnimation("nin:earthspikesup").setData((entity, data) => {
        data.load(entity.getInterpolatedData("fiskheroes:beam_shooting_timer"));
    });
		earthspikesmodel.texture.set("spikes");

	earthspikes = renderer.createEffect("fiskheroes:model").setModel(earthspikesmodel);
    earthspikes.setOffset(0, 5, -70);
    earthspikes.setRotation(0, 180.0, 0.0)
    earthspikes.anchor.set("rightArm");
    earthspikes.mirror = false;
    earthspikes.opacity = 0.9;
    earthspikes.setScale(1.0)

	spikesfirstperson = renderer.createEffect("fiskheroes:model").setModel(earthspikesmodel);
    spikesfirstperson.setOffset(0, 0, 0);
    spikesfirstperson.setRotation(0, 0.0, 0.0)
    spikesfirstperson.anchor.set("body");
    spikesfirstperson.mirror = false;
    spikesfirstperson.opacity = 0.9;
    spikesfirstperson.setScale(1.0)

    var coleplayermodel = renderer.createResource("MODEL", "nin:cole_model");
    coleplayermodel.bindAnimation("nin:coleanimation").setData((entity, data) => {
        data.load(entity.getData("fiskheroes:beam_charge"));
    });
        coleplayermodel.texture.set("layer1");

	cole = renderer.createEffect("fiskheroes:model").setModel(coleplayermodel);
    cole.setOffset(0, -2, 7);
    cole.setRotation(0, 0.0, 0.0)
    cole.anchor.set("head");
    cole.mirror = false;
    cole.opacity = 0.9;
    cole.setScale(1.0)
    // earthspikes.anchor.ignoreAnchor(true);	

    scythe = renderer.createEffect("fiskheroes:model");
    scythe.setModel(utils.createModel(renderer, "nin:scythe", null, "scythe"));
    scythe.setOffset(12/*side to side*/, 7/*closeness to hands*/, -2/* Height */);
    scythe.setRotation(180.0, 15.0, -90.0)
    scythe.anchor.set("rightArm");
    scythe.mirror = false;
    scythe.opacity = 0.9;
    scythe.setScale(1.25)
    
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

    overlay = renderer.createEffect("fiskheroes:overlay");

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "nin:invisible", "body", 0xF83A0C, [{
                "firstPerson": [0, 0, 0],
                "offset": [0, 0, 0],
            }
        ]);
        utils.bindBeam(renderer, "fiskheroes:charged_beam", "nin:invisible", "head", 0xF83A0C, [{
            "firstPerson": [0, 0, 0],
            "offset": [0, 0, 0],
        }
    ]);
        utils.bindBeam(renderer, "fiskheroes:energy_manipulation", "nin:empty", "rightArm", 0xF83A0C, [
            { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [1.5, 1.5] }
        ]);

        renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return invis(entity) || fly(entity) ? 0.9 : 1;
    });
        var lightningsurge_color = 0xF83A0C;
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
        
        soq_back = renderer.createEffect("fiskheroes:model");
        soq_back.setModel(utils.createModel(renderer, "nin:soq_back", null, "soq_back"));
        soq_back.setOffset(0.0, 0.0, 0.0);
        soq_back.setRotation(0.0, 0.0, 0.0)
        soq_back.anchor.set("body");
        soq_back.mirror = false
        soq_back.opacity = 0.9;
        soq_back.setScale(0.75)

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
    addAnimationWithData(renderer, "basic.AIMING", "nin:nothing", "fiskheroes:aiming_timer");
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
    addAnimationWithData(renderer, "ninja.SPRINT",  "fiskheroes:speedster_sprint", "fiskheroes:moving").setCondition(entity => (entity.isSprinting() && !invis(entity)));
    addAnimation(renderer, "cole.EARTHSPIKES", "nin:scytheplayer").setData((entity, data) =>
        data.load(Math.min(Math.max(entity.getInterpolatedData("fiskheroes:beam_charge") / 1, 0), 1)));
    // addAnimation(renderer, "cole.SPIKING", "nin:newscytheanim").setData((entity, data) =>
    //     data.load(Math.min(Math.max(entity.getInterpolatedData("fiskheroes:beam_charge") / 1, 0), 1)));
};

function render(entity, renderLayer, isFirstPersonArm) {
    if (isFirstPersonArm) {
        earthspikes.anchor.ignoreAnchor(true)
        if (entity.getHeldItem().nbt().getString("WeaponType") == "nin:soq") {
            earthspikes.setOffset(0, -30, -70);
        }
    }
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
        if (renderLayer == "CHESTPLATE") {
            var punch_timer = entity.getInterpolatedData('fiskheroes:energy_charge');
        
            // lightningsurgearms.progress = punch_timer;
            // lightningsurgearms.render();
            overlay.texture.set(null, "arms");
            overlay.opacity = punch_timer;
            overlay.render();
        }
        if (!isFirstPersonArm){
            if (entity.getData("fiskheroes:blade") && !entity.getData("fiskheroes:moving") && !entity.getPunchTimerInterpolated()) {
                scythe.render();
            }
            if (entity.getData("fiskheroes:blade") && entity.getData("fiskheroes:moving") || entity.getData("fiskheroes:blade") && entity.getPunchTimerInterpolated()){
                scytheold.render();
            }
        }
        if (isFirstPersonArm) {
            if (entity.getInterpolatedData("fiskheroes:beam_charge")){
                spikesfirstperson.render();
            }
            if (entity.getData("fiskheroes:blade")){
                scytheold.render();
            }
        }
        if (entity.getHeldItem().isEmpty() && (!invis(entity) && !fly(entity))) {
            soq_back.setOffset(2.0, -9.0, 2.5);
            soq_back.setRotation(0.0, 0.0, 0.0);
            soq_back.setScale(0.75);
            soq_back.render();
        }
        // if (entity.getInterpolatedData("fiskheroes:beam_charge") > 0) {
        //     earthspikes.render();
        //     // cole.render();
        // }
}
