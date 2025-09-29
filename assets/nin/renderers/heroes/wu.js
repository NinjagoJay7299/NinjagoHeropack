extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "nin:wu/wu",
    "layer2": "nin:wu/wu",
    "mask": "nin:null",
    "staff": "nin:wu/staff",
    "hat": "nin:wu/hat",
    "null": "nin:null",
    "spinjitzu": "nin:wu/golden_spinjitzu",
    "flute": "nin:wu/flute",
    "dragon": "nin:wu/doe",
    "dragonflying": "nin:wu/derg2",
    "overlay": "nin:wu/wu"
});
var spinjitzu;
var staff;
var overlay;
var utils = implement("fiskheroes:external/utils");
function invis(entity) {
    return entity.getHeldItem().isEmpty() && (entity.isSprinting()) && (entity.getData("fiskheroes:energy_projection"));
}
function invis2(entity) {
    return entity.getHeldItem().isEmpty() && (entity.getData("fiskheroes:beam_charging"));
}
function dragonflying(entity) {
    return entity.getData("nin:dyn/dragon_timer") == 1 && entity.getData("fiskheroes:flying");
}
function dragon(entity) {
    return entity.getData("nin:dyn/dragon_timer") == 1 && !entity.getData("fiskheroes:flying");
}
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("wu/wu_0", "wu/wu_1", "wu/wu_2", "wu/wu_3");
    renderer.setTexture((entity, renderLayer) => {
        if (invis(entity)) {
            return "null";
        }
        if (dragonflying(entity)) {
            return "null";
        }
        if (dragon(entity)) {
            return "null";
        }
        return "layer1";
    });
    //renderer.setLights((entity, renderLayer) => renderLayer == "CHESTPLATE" ? "lights" : null);

    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("HELMET", "CHESTPLATE");
}

function initEffects(renderer) {

    /*var wudragon = renderer.createResource("MODEL", "nin:wu_dragon");
    wudragon.texture.set("dragon", null);
    wudragon.bindAnimation("nin:wu_dragon_moving").setData((entity, data) => {
		data.load((entity.exists()));
	  });
    wusdragon = renderer.createEffect("fiskheroes:model").setModel(wudragon);
    wusdragon.anchor.set("body");*/
    //wusdragon.setOffset(1.0, 10.0, 1.0);

    wingstate1 = renderer.createEffect("fiskheroes:model");
    wingstate1.setModel(utils.createModel(renderer, "nin:wingstate1", null, "dragonflying"));
    wingstate1.anchor.set("rightArm");
    wingstate1.setOffset(0.0, 25.0, 0.0);
    wingstate1.setRotation(90.0, 90.0, 90.0)
    wingstate1.opacity = 0.9;
    wingstate1.mirror = false

    wingstate2 = renderer.createEffect("fiskheroes:model");
    wingstate2.setModel(utils.createModel(renderer, "nin:wingstate2", null, "dragonflying"));
    wingstate2.anchor.set("rightArm");
    wingstate2.setOffset(0.0, 25.0, 0.0);
    wingstate2.setRotation(90.0, 90.0, 90.0)
    wingstate2.opacity = 0.9;
    wingstate2.mirror = false

    wingstate3 = renderer.createEffect("fiskheroes:model");
    wingstate3.setModel(utils.createModel(renderer, "nin:wingstate3", null, "dragonflying"));
    wingstate3.anchor.set("rightArm");
    wingstate3.setOffset(0.0, 25.0, 0.0);
    wingstate3.setRotation(90.0, 90.0, 90.0)
    wingstate3.opacity = 0.9;
    wingstate3.mirror = false

    wingstate4 = renderer.createEffect("fiskheroes:model");
    wingstate4.setModel(utils.createModel(renderer, "nin:wingstate4", null, "dragonflying"));
    wingstate4.anchor.set("rightArm");
    wingstate4.setOffset(0.0, 25.0, 0.0);
    wingstate4.setRotation(90.0, 90.0, 90.0)
    wingstate4.opacity = 0.9;
    wingstate4.mirror = false

    wudragonflying = renderer.createEffect("fiskheroes:model");
    wudragonflying.setModel(utils.createModel(renderer, "nin:wudragonflying", null, "dragonflying"));
    wudragonflying.setOffset(0.0, 25.0, 0.0);
    wudragonflying.setRotation(90.0, 90.0, 90.0)
    wudragonflying.anchor.set("rightArm");
    wudragonflying.opacity = 0.9;
    wudragonflying.mirror = false

    headwuflying = renderer.createEffect("fiskheroes:model");
    headwuflying.setModel(utils.createModel(renderer, "nin:headwuflying", null, "dragonflying"));
    headwuflying.setOffset(0.0, 25.0, 0.0);
    headwuflying.setRotation(90.0, 90.0, 90.0)
    headwuflying.anchor.set("rightArm");
    headwuflying.opacity = 0.9;
    headwuflying.mirror = false

    wuridingdragon = renderer.createEffect("fiskheroes:model");
    wuridingdragon.setModel(utils.createModel(renderer, "nin:wuridingdragon", "dragonflying"));
    wuridingdragon.setOffset(0.0, 12.0, 0.0);
    wuridingdragon.setRotation(0.0, 0.0, 0.0)
    wuridingdragon.anchor.set("head");
    wuridingdragon.opacity = 0.9;
    wuridingdragon.mirror = false

    rightwing = renderer.createEffect("fiskheroes:model");
    rightwing.setModel(utils.createModel(renderer, "nin:rightwing", null, "dragonflying"));
    rightwing.anchor.set("body");
    rightwing.setOffset(0.0, 0.0, 0.0);
    rightwing.setRotation(0.0, 0.0, 0.0)
    rightwing.opacity = 0.9;
    rightwing.mirror = false

    leftwing = renderer.createEffect("fiskheroes:model");
    leftwing.setModel(utils.createModel(renderer, "nin:leftwing", null, "dragonflying"));
    leftwing.anchor.set("body");
    leftwing.setOffset(0.0, 0.0, 0.0);
    leftwing.setRotation(0.0, 0.0, 0.0)
    leftwing.opacity = 0.9;
    leftwing.mirror = false

    headwu = renderer.createEffect("fiskheroes:model");
    headwu.setModel(utils.createModel(renderer, "nin:headwu", null, "dragon"));
    headwu.setOffset(0.0, 2.0, 0.0);
    headwu.setRotation(0.0, 0.0, 0.0)
    headwu.anchor.set("body");
    headwu.mirror = false

    headwu_open = renderer.createEffect("fiskheroes:model");
    headwu_open.setModel(utils.createModel(renderer, "nin:headwu_open", null, "dragon"));
    headwu_open.setOffset(0.0, 2.0, 0.0);
    headwu_open.setRotation(0.0, 0.0, 0.0)
    headwu_open.anchor.set("body");
    headwu_open.opacity = 0.9;
    headwu_open.mirror = false

    bodywu = renderer.createEffect("fiskheroes:model");
    bodywu.setModel(utils.createModel(renderer, "nin:bodywu", null, "dragon"));
    bodywu.setOffset(0.0, 0.0, 0.0);
    bodywu.setRotation(0.0, 0.0, 0.0)
    bodywu.anchor.set("body");
    bodywu.mirror = false

    frontleftlegwu = renderer.createEffect("fiskheroes:model");
    frontleftlegwu.setModel(utils.createModel(renderer, "nin:frontleftlegwu", null, "dragon"));
    frontleftlegwu.setOffset(0.0, -10.0, 0.0);
    frontleftlegwu.setRotation(0.0, 0.0, 0.0)
    frontleftlegwu.anchor.set("leftLeg");
    frontleftlegwu.mirror = false

    frontrightlegwu = renderer.createEffect("fiskheroes:model");
    frontrightlegwu.setModel(utils.createModel(renderer, "nin:frontrightlegwu", null, "dragon"));
    frontrightlegwu.setOffset(0.0, -10.0, 0.0);
    frontrightlegwu.setRotation(0.0, 0.0, 0.0)
    frontrightlegwu.anchor.set("rightLeg");
    frontrightlegwu.mirror = false

    backrightlegwu = renderer.createEffect("fiskheroes:model");
    backrightlegwu.setModel(utils.createModel(renderer, "nin:backrightlegwu", null, "dragon"));
    backrightlegwu.setOffset(3.0, -10.0, 0.0);
    backrightlegwu.setRotation(0.0, 0.0, 0.0)
    backrightlegwu.anchor.set("leftLeg");
    backrightlegwu.mirror = false

    backleftlegwu = renderer.createEffect("fiskheroes:model");
    backleftlegwu.setModel(utils.createModel(renderer, "nin:backleftlegwu", null, "dragon"));
    backleftlegwu.setOffset(-3.0, -10.0, 0.0);
    backleftlegwu.setRotation(0.0, 0.0, 0.0)
    backleftlegwu.anchor.set("rightLeg");
    backleftlegwu.mirror = false

    staff = renderer.createEffect("fiskheroes:model");
    staff.setModel(utils.createModel(renderer, "nin:staff_short", "staff"));
    staff.setOffset(1.0, 10.0, 1.0);
    staff.setRotation(90.0, 0.0, 0.0)
    staff.anchor.set("rightArm");
    staff.mirror = false
    staff.opacity = 0.9;
    staff.setScale(0.75)

    staffshield = renderer.createEffect("fiskheroes:model");
    staffshield.setModel(utils.createModel(renderer, "nin:staffshield", "staff"));
    staffshield.setOffset(0.0, 14.0, 0.0);
    staffshield.setRotation(0.0, 0.0, 0.0)
    staffshield.anchor.set("rightArm");
    staffshield.mirror = false
    staffshield.opacity = 0.9;
    staffshield.setScale(0.5)

    flute = renderer.createEffect("fiskheroes:model");
    flute.setModel(utils.createModel(renderer, "nin:flute", "flute"));
    flute.setOffset(-2.0, 6.0, 0.0);
    flute.setRotation(0.0, -65.0, 0.0)
    flute.anchor.set("rightArm");
    flute.mirror = false
    flute.opacity = 0.9;
    flute.setScale(0.3)

    hat = renderer.createEffect("fiskheroes:model");
    hat.setModel(utils.createModel(renderer, "nin:hat_2", "hat"));
    hat.setOffset(2.0, -9.4, -3.0);
    hat.setRotation(0.0, 0.0, 0.0)
    hat.anchor.set("head");
    hat.mirror = false
    hat.opacity = 0.9;
    hat.setScale(0.335)

    hat2 = renderer.createEffect("fiskheroes:model");
    hat2.setModel(utils.createModel(renderer, "nin:hat_2", "hat"));
    hat2.setOffset(2.0, -28, -33.0);
    hat2.setRotation(0.0, 0.0, 0.0)
    hat2.anchor.set("head");
    hat2.mirror = false
    hat2.opacity = 0.9;
    hat2.setScale(0.335)

    hat3 = renderer.createEffect("fiskheroes:model");
    hat3.setModel(utils.createModel(renderer, "nin:hat_2", "hat"));
    hat3.setOffset(2.0, -40, -33.0);
    hat3.setRotation(0.0, 0.0, 0.0)
    hat3.anchor.set("body");
    hat3.mirror = false
    hat3.opacity = 0.9;
    hat3.setScale(0.335)

    overlay = renderer.createEffect("fiskheroes:overlay");
    overlay.texture.set("nin:wu")

    spinjitzu = renderer.createEffect("fiskheroes:model");
    spinjitzu.setModel(utils.createModel(renderer, "nin:spinjitzu_zane", null, "spinjitzu"));
    spinjitzu.setOffset(1, 0, 1);
    spinjitzu.anchor.set("body");
    spinjitzu.mirror = false;
    spinjitzu.setScale(1.0)
    spinjitzu.opacity = 0.9;


    // wudragon = renderer.createEffect("fiskheroes:model");
    // wudragon.setModel(utils.createModel(renderer, "nin:dragon_wu", null, "dragon"));
    // wudragon.setOffset(0.0, 0.0, 0.0);
    // wudragon.setRotation(0.0, 0.0, 0.0)
    // wudragon.anchor.set("body");
    // wudragon.mirror = false

    var dragondefaultmodel = utils.createModel(renderer, "nin:dragon_wu", null, "dragon");
    var walkingmodel = utils.createModel(renderer,"nin:wus_dragon", null, "dragon");
    var flyingmodel = utils.createModel(renderer,"nin:wus_dragon", null, "dragon");
    var boostingmodel = utils.createModel(renderer,"nin:wus_dragon", null, "dragon");

    walkingmodel.bindAnimation("nin:dragon_walk")
    .setData((entity, data) => data.load(entity.loop(35)));
    
    walkingmodel.bindAnimation("nin:dragon_idle")
    .setData((entity, data) => data.load(entity.exists()));

    flyingmodel.bindAnimation("nin:dragon_fly")
    .setData((entity, data) => data.load(entity.loop(25)));
    
    flyingmodel.bindAnimation("nin:dragon_idle")
    .setData((entity, data) => data.load(entity.exists()));

    boostingmodel.bindAnimation("nin:dragon_boost")
    .setData((entity, data) => data.load(entity.loop(15)));

    boostingmodel.bindAnimation("nin:dragon_idle")
    .setData((entity, data) => data.load(entity.exists()));

    var model = utils.createModel(renderer, "nin:dragon_wu", null, "dragon");

    dragondefault = renderer.createEffect("fiskheroes:model").setModel(dragondefaultmodel);
    dragondefault.setOffset(0.0, 0.0, 0.0);
    dragondefault.setRotation(0.0, 0.0, 0.0)
    dragondefault.anchor.set("body");
//    dragondefault.anchor.ignoreAnchor(true)
    dragondefault.mirror = false

    wudragonwalking = renderer.createEffect("fiskheroes:model").setModel(walkingmodel);
    wudragonwalking.setOffset(0.0, 0.0, 0.0);
    wudragonwalking.setRotation(0.0, 0.0, 0.0)
    wudragonwalking.anchor.set("body");
  //  wudragonwalking.anchor.ignoreAnchor(true)
    wudragonwalking.mirror = false

    wudragonflying = renderer.createEffect("fiskheroes:model").setModel(flyingmodel);
    wudragonflying.setOffset(0.0, 12.0, 0.0);
    wudragonflying.setRotation(0.0, 0.0, 0.0)
    wudragonflying.anchor.set("head");
 //   wudragonflying.anchor.ignoreAnchor(true)
    wudragonflying.mirror = false

    wudragonboosting = renderer.createEffect("fiskheroes:model").setModel(boostingmodel);
    wudragonboosting.setOffset(0.0, 12.0, 0.0);
    wudragonboosting.setRotation(0.0, 0.0, 0.0)
    wudragonboosting.anchor.set("head");
   // wudragonboosting.anchor.ignoreAnchor(true)
    wudragonboosting.mirror = false

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "nin:invisible", "rightArm", 0xdb472b, [{
                "firstPerson": [-4.5, 3.75, -8.0],
                "offset": [-0.5, 9.0, 0.0],
                "size": [2.0, 2.0]
            }
        ]);

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "nin:invisible", "body", 0xFFE942, [
        { "firstPerson": [0.0, 30.0, 0.0], "offset": [0.0, -5.0, -54.0], "size": [3.0, 3.0] }
    ]).setCondition(entity => dragon(entity));

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "nin:invisible", "head", 0xFFE942, [
        { "firstPerson": [0.0, 30.0, 0.0], "offset": [-5.0, 15.0, -54.0], "size": [3.0, 3.0] }
    ]).setCondition(entity => entity.getData("fiskheroes:flying"));

    utils.bindBeam(renderer, "fiskheroes:energy_manipulation", "fiskheroes:energy_discharge", "rightArm", 0xFFE942, [{
                "firstPerson": [-2.5, 0.0, -7.0],
                "offset": [-0.5, 19.0, -12.0],
                "size": [1.5, 1.5]
            }

        ]);
    //utils.bindCloud(renderer, "nin:dyn/dragon_timer", "pkg:teleport_morgana").setCondition(entity => entity.getData('nin:dyn/dragon_timer') > 0.125 && entity.getData('nin:dyn/dragon_timer') > 0);
    utils.bindParticles(renderer, "nin:wu_dragon_background").setCondition(entity => entity.getInterpolatedData('nin:dyn/dragon_timer') > 0 && entity.getInterpolatedData('nin:dyn/dragon_timer') < 1);

        //utils.bindParticles(renderer, "nin:fire_hands").setCondition(entity => (entity.getInterpolatedData("fiskheroes:shield_timer") > 0 && entity.getInterpolatedData("fiskheroes:shield_timer") < 1));
        //utils.bindParticles(renderer, "nin:fire_hands").setCondition(entity => entity.getData("fiskheroes:shield") && (entity.getInterpolatedData("fiskheroes:shield_timer") > 0.5 && entity.getInterpolatedData("fiskheroes:shield_timer") < 1));
    var sprint = renderer.bindProperty("fiskheroes:trail");  
    sprint.setTrail(renderer.createResource("TRAIL", "nin:wu"));
    sprint.setCondition(entity => invis(entity));
        renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return invis(entity) ? 0.9 : 1 || dragonflying(entity) ? 0.9 : 1 || dragon(entity) ? 0.9 : 1;
    });
    //utils.bindParticles(renderer, "nin:testhands").setCondition(entity => invis2(entity));
    var mouthbeam = renderer.createResource("BEAM_RENDERER", "fiskheroes:charged_beam");

    mouth_beam = utils.createLines(renderer, mouthbeam, 0xFFE942, [
        {"start": [0.0, 0.0, -80.0], "end": [0.0, 0.0, 0.0], "size": [60.0, 60.0]}
    ]);
    mouth_beam.anchor.set("body", model.getCubeOffset("dragon_head"));
    mouth_beam.setScale(1.5);
    mouth_beam.mirror = false;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    renderer.removeCustomAnimation("basic.BLOCKING");
    addAnimationWithData(renderer, "wu.STAFF", "nin:stick", "nin:dyn/blade");
    addAnimationWithData(renderer, "ninja.SPRINT",  "fiskheroes:speedster_sprint", "fiskheroes:moving").setCondition(entity => (entity.isSprinting() && !invis(entity) && !dragonflying(entity) && !dragon(entity)));   
    addAnimationWithData(renderer, "wu.SHEILD", "nin:shieldspin", "fiskheroes:shield_blocking").setData((entity, data) => 
        data.load(entity.getData('fiskheroes:shield_blocking') && entity.loop(5) * 100 && entity.getInterpolatedData("nin:dyn/spinstaff") < 1));
    addAnimationWithData(renderer, "wu.FLUTE", "nin:flute", "nin:dyn/nonblade");
    addAnimationWithData(renderer, "wu.DRAGON", "nin:wu_dragon_moving").setData((entity, data) => 
        data.load(entity.getData("nin:dyn/dragon_timer") == 1 && !entity.getData("fiskheroes:flying")));
    addAnimationWithData(renderer, "wu.DRAGONFLYING", "nin:wu_dragon_flying").setData((entity, data) => 
        data.load(dragonflying(entity)));
    /*addAnimationWithData(renderer, "wu.DRAGONWINGS", "nin:wings").setData((entity, data) => 
        data.load(entity.getData("nin:dyn/dragon_timer") == 1));*/
    /*addAnimationWithData(renderer, "wu.SPIN", "nin:spin").setData((entity, data) => {
        data.load(entity.getData('fiskheroes:energy_projection_timer'));
    });
    addAnimationWithData(renderer, "wu.SPINFULL", "nin:spinjitzu").setData((entity, data) => {
        data.load(entity.getData('fiskheroes:energy_projection_timer') && entity.loop(5) * 10);
    });*/
}

function render(entity, renderLayer, isFirstPersonArm) {
        if (dragon(entity)) {
            wuridingdragon.render();
            wuridingdragon.setOffset(0.0, 5.0, 0.0);
            wuridingdragon.setRotation(0.0, 0.0, 0.0)
            wuridingdragon.anchor.set("body");
            hat3.render();
        }
        if (entity.getData("fiskheroes:moving") && dragon(entity) && !dragonflying(entity)) {
            wudragonwalking.render();
            hat3.render();
        }
        else if (dragonflying(entity) && !entity.isSprinting()) {
            wudragonflying.render();
            wuridingdragon.render();
            wuridingdragon.setOffset(0.0, 12.0, 0.0);
            wuridingdragon.setRotation(0.0, 0.0, 0.0)
            wuridingdragon.anchor.set("head");
        }
        else if (dragonflying(entity) && entity.isSprinting()) {
            wudragonboosting.render();
            wuridingdragon.render();
            wuridingdragon.setOffset(0.0, 12.0, 0.0);
            wuridingdragon.setRotation(0.0, 0.0, 0.0)
            wuridingdragon.anchor.set("head");
        }
        else if (dragon(entity)) {
            dragondefault.render();
        }
        if (entity.isWearingFullSuit() && !dragonflying(entity) && !dragon(entity)) {
            hat.render();
        }
        if (entity.isWearingFullSuit() && dragonflying(entity)){
            hat2.render();
        }
        staffshield.setRotation(0.0, entity.getInterpolatedData('fiskheroes:shield_blocking_timer') * entity.loop(50) * 360, 0.0);
            staff.setRotation(90.0, 0.0, entity.getInterpolatedData('fiskheroes:shield_blocking_timer') * entity.loop(2) * -360);
        if (entity.getInterpolatedData("nin:dyn/spinstaff") < 1 && entity.getInterpolatedData("nin:dyn/spinstaff") > 1) {

        }
        if (entity.getData("fiskheroes:shield") && entity.getInterpolatedData("nin:dyn/spinstaff") == 1) {
            staffshield.render();
        }
        if (invis(entity)) {
            spinjitzu.setRotation(0, entity.loop(2) * 360, 0)
            spinjitzu.render();
        }
        if (entity.getData("fiskheroes:shield") && entity.getInterpolatedData("nin:dyn/spinstaff") < 1 && !isFirstPersonArm) {
            staff.render();
        }
        if (isFirstPersonArm && entity.getData("fiskheroes:shield") && entity.getInterpolatedData("nin:dyn/spinstaff") < 1) {
            staff.render();
            staff.setRotation(0.0, 0.0, 0.0)
        }
        if (entity.getData("fiskheroes:blade")) {
            flute.render();
        }
        // if (dragon(entity) || dragonflying(entity)) {
        //     wudragon.render();
        // }
        if (entity.getData("fiskheroes:beam_charging") && (dragon(entity) || dragonflying(entity))) {
            mouth_beam.render();
        }
        
//             if (dragonflying(entity) && !isFirstPersonArm) {
//                 headwu_open.setOffset(0.0, 25.0, 0.0);
//                 headwu_open.setRotation(180.0, 180.0, 180.0)
//                 headwu_open.anchor.set("rightArm")
//             }
//             if (dragon(entity) && !isFirstPersonArm) {
//                 headwu_open.setOffset(0.0, 2.0, 0.0);
//                 headwu_open.setRotation(0.0, 0.0, 0.0)
//                 headwu_open.anchor.set("body")
//             }
//         }
//         if (!isFirstPersonArm){
//             if (dragon(entity)) {
//                 if (!entity.getData("fiskheroes:beam_charging")){
//                 headwu.render();
//                 }
//                 bodywu.render();
//                 wuridingdragon.render();
//                 wingstate1.render();
//                 backleftlegwu.render();
//                 backrightlegwu.render();
//                 frontleftlegwu.render();
//                 frontrightlegwu.render();
//                 wingstate1.anchor.set("body");
//                 wingstate1.setOffset(0.0, 0.0, 0.0);
//                 wingstate1.setRotation(0.0, 0.0, 0.0);
//                 hat3.render();
//                 hat3.setOffset(1.09, -35.5, -33.5);
//             }
//             if (dragonflying(entity)) {
//                 wudragonflying.render();
//                 wudragonflying.setOffset(0.0, 25.0, 0.0);
//                 wudragonflying.setRotation(180.0, 180.0, 180.0)
//                 if (!entity.getData("fiskheroes:beam_charging")){
//                     headwuflying.render();
//                     headwuflying.setOffset(0.0, 25.0, 0.0);
//                     headwuflying.setRotation(180.0, 180.0, 180.0)
//                 }
//                 //wusdragon.render();
//         }
//         }
        if (isFirstPersonArm) {
            if (dragon(entity)/*no flying, dragon active*/){
                //headwuflying.render();
                /*headwuflying.setRotation(-150.0, 200.0, 100.0)
                headwuflying.setOffset(-40.0, -10.0, 15.0);*/

                headwuflying.render();
                headwuflying.anchor.set("rightArm");
                //current
                headwuflying.setRotation(-90.0, 180.0, 88.0)
                headwuflying.setOffset(-20.0, -50.0, -10.0);
                //old
                /*headwuflying.setRotation(-115.0, 180.0, 113.0)
                headwuflying.setOffset(10.0, -20.0, 20.0);*/
            }
            if (dragonflying(entity)/*flying, dragon active*/) {
                /*wudragonflying.render();
                wudragonflying.setRotation(-90.0, 180.0, 88.0)
                wudragonflying.setOffset(-20.0, -50.0, -10.0);*/

            

                // wingstate1.setRotation(-90.0, 180.0, 88.0)
                // wingstate2.setRotation(-90.0, 180.0, 88.0)
                // wingstate3.setRotation(-90.0, 180.0, 88.0)
                // wingstate4.setRotation(-90.0, 180.0, 88.0)
                // wingstate1.setOffset(-20.0, -50.0, -10.0);
                // wingstate2.setOffset(-20.0, -50.0, -10.0);
                // wingstate3.setOffset(-20.0, -50.0, -10.0);
                // wingstate4.setOffset(-20.0, -50.0, -10.0);

                headwuflying.render();
                headwuflying.anchor.set("rightArm");
                headwuflying.setRotation(-90.0, 180.0, 88.0)
                headwuflying.setOffset(-20.0, -50.0, -10.0);
            }
        }   
  
// if (dragonflying(entity) /*&& entity.getData("fiskheroes:moving")*/ && entity.loop(10) >= 0.75 && entity.loop(10) < 1) {
//     wingstate4.render();
//     wingstate4.setOffset(0.0, 25.0, 0.0);
//     wingstate4.setRotation(180.0, 180.0, 180.0)
// }
// if (dragonflying(entity) /*&& entity.getData("fiskheroes:moving")*/ && entity.loop(10) >= 0.50 && entity.loop(10) < 0.75) {
//     wingstate3.render();
//     wingstate3.setOffset(0.0, 25.0, 0.0);
//     wingstate3.setRotation(180.0, 180.0, 180.0)
// }
// if (dragonflying(entity) /*&& entity.getData("fiskheroes:moving")*/ && entity.loop(10) >= 0.25 && entity.loop(10) < 0.50) {
//     wingstate2.render();
//     wingstate2.setOffset(0.0, 25.0, 0.0);
//     wingstate2.setRotation(180.0, 180.0, 180.0)
// }
// if (dragonflying(entity) /*&& entity.getData("fiskheroes:moving")*/ && entity.loop(10) >= 0.0 && entity.loop(10) < 0.25) {
//     wingstate1.render();
//     wingstate1.anchor.set("rightArm")
//     wingstate1.setOffset(0.0, 25.0, 0.0);
//     wingstate1.setRotation(180.0, 180.0, 180.0)
// }
if (entity.isWearingFullSuit() && !dragonflying(entity)) {
    overlay.render();
}
}
    //wingstate1.render();
    //wingstate2.render();
//wingstate1 entity.loop(10) >= 0.0 && entity.loop(10) < 0.25
//wingstate2 entity.loop(10) >= 0.25 && entity.loop(10) < 0.75

