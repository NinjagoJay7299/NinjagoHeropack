extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "nin:samx/pixalskin",
    "layer2": "nin:samx/pixalskin",
    "mask": "nin:null",
    "mech": "nin:samx/samxtemp",
    "pixal": "nin:samx/pixalskin",
    // "staff": "nin:samx/staff",
    // "hat": "nin:samx/hat",
    "null": "nin:null",
    "cubes": "nin:samx/spincubes"
    // "spinjitzu": "nin:samx/golden_spinjitzu",
    // "flute": "nin:samx/flute",
    // "dragon": "nin:samx/doe",
    // "dragonflying": "nin:samx/derg2",
    // "overlay": "nin:samx/wu"
});
var pixal;
var mech;
var overlay;
var utils = implement("fiskheroes:external/utils");
function invis(entity) {
    return entity.exists();
}
function invis2(entity) {
    return (entity.getData("fiskheroes:beam_charging"));
}
function dragonflying(entity) {
    return entity.getData("nin:dyn/dragon_timer") == 1 && entity.getData("fiskheroes:flying");
}
function dragon(entity) {
    return entity.getData("nin:dyn/dragon_timer") == 1 && !entity.getData("fiskheroes:flying");
}
function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("samx/wu_0", "samx/wu_1", "samx/wu_2", "samx/wu_3");
    renderer.setTexture((entity, renderLayer) => {
        if (invis(entity)) {
            return "null";
        }
        // if (dragonflying(entity)) {
        //     return "null";
        // }
        // if (dragon(entity)) {
        //     return "ull";
        // }
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

    // wingstate1 = renderer.createEffect("fiskheroes:model");
    // wingstate1.setModel(utils.createModel(renderer, "nin:wingstate1", null, "dragonflying"));
    // wingstate1.anchor.set("rightArm");
    // wingstate1.setOffset(0.0, 25.0, 0.0);
    // wingstate1.setRotation(90.0, 90.0, 90.0)
    // wingstate1.opacity = 0.9;
    // wingstate1.mirror = false

    // wingstate2 = renderer.createEffect("fiskheroes:model");
    // wingstate2.setModel(utils.createModel(renderer, "nin:wingstate2", null, "dragonflying"));
    // wingstate2.anchor.set("rightArm");
    // wingstate2.setOffset(0.0, 25.0, 0.0);
    // wingstate2.setRotation(90.0, 90.0, 90.0)
    // wingstate2.opacity = 0.9;
    // wingstate2.mirror = false

    // wingstate3 = renderer.createEffect("fiskheroes:model");
    // wingstate3.setModel(utils.createModel(renderer, "nin:wingstate3", null, "dragonflying"));
    // wingstate3.anchor.set("rightArm");
    // wingstate3.setOffset(0.0, 25.0, 0.0);
    // wingstate3.setRotation(90.0, 90.0, 90.0)
    // wingstate3.opacity = 0.9;
    // wingstate3.mirror = false

    // wingstate4 = renderer.createEffect("fiskheroes:model");
    // wingstate4.setModel(utils.createModel(renderer, "nin:wingstate4", null, "dragonflying"));
    // wingstate4.anchor.set("rightArm");
    // wingstate4.setOffset(0.0, 25.0, 0.0);
    // wingstate4.setRotation(90.0, 90.0, 90.0)
    // wingstate4.opacity = 0.9;
    // wingstate4.mirror = false

    // wudragonflying = renderer.createEffect("fiskheroes:model");
    // wudragonflying.setModel(utils.createModel(renderer, "nin:wudragonflying", null, "dragonflying"));
    // wudragonflying.setOffset(0.0, 25.0, 0.0);
    // wudragonflying.setRotation(90.0, 90.0, 90.0)
    // wudragonflying.anchor.set("rightArm");
    // wudragonflying.opacity = 0.9;
    // wudragonflying.mirror = false

    // pixalflying = renderer.createEffect("fiskheroes:model");
    // pixalflying.setModel(utils.createModel(renderer, "nin:pixalflying", null, "dragonflying"));
    // pixalflying.setOffset(0.0, 25.0, 0.0);
    // pixalflying.setRotation(90.0, 90.0, 90.0)
    // pixalflying.anchor.set("rightArm");
    // pixalflying.opacity = 0.9;
    // pixalflying.mirror = false

    // wuridingdragon = renderer.createEffect("fiskheroes:model");
    // wuridingdragon.setModel(utils.createModel(renderer, "nin:wuridingdragon", null, "dragonflying"));
    // wuridingdragon.setOffset(0.0, 5.0, 0.0);
    // wuridingdragon.setRotation(0.0, 0.0, 0.0)
    // wuridingdragon.anchor.set("body");
    // wuridingdragon.opacity = 0.9;
    // wuridingdragon.mirror = false

    // rightwing = renderer.createEffect("fiskheroes:model");
    // rightwing.setModel(utils.createModel(renderer, "nin:rightwing", null, "dragonflying"));
    // rightwing.anchor.set("body");
    // rightwing.setOffset(0.0, 0.0, 0.0);
    // rightwing.setRotation(0.0, 0.0, 0.0)
    // rightwing.opacity = 0.9;
    // rightwing.mirror = false

    // leftwing = renderer.createEffect("fiskheroes:model");
    // leftwing.setModel(utils.createModel(renderer, "nin:leftwing", null, "dragonflying"));
    // leftwing.anchor.set("body");
    // leftwing.setOffset(0.0, 0.0, 0.0);
    // leftwing.setRotation(0.0, 0.0, 0.0)
    // leftwing.opacity = 0.9;
    // leftwing.mirror = false

    pixal = renderer.createEffect("fiskheroes:model");
    pixal.setModel(utils.createModel(renderer, "nin:pixal_model", "pixal"));
    pixal.setOffset(0.0, 0.0, 0.0);
    pixal.setRotation(0.0, 0.0, 0.0)
    pixal.anchor.set("body");
    pixal.mirror = false

    // pixal_open = renderer.createEffect("fiskheroes:model");
    // pixal_open.setModel(utils.createModel(renderer, "nin:pixal_open", null, "dragon"));
    // pixal_open.setOffset(0.0, 2.0, 0.0);
    // pixal_open.setRotation(0.0, 0.0, 0.0)
    // pixal_open.anchor.set("body");
    // pixal_open.opacity = 0.9;
    // pixal_open.mirror = false

    var samxmechmodel = utils.createModel(renderer,"nin:samxtemp_model", "mech");
    samxmechmodel.bindAnimation("nin:samxspin").setData((entity, data) => data.load(entity.getData("fiskheroes:energy_projection")));
    //samxmechmodel.bindAnimation("nin:samxhit1").setData((entity, data) => data.load(entity.getPunchTimerInterpolated()));

    samxmech = renderer.createEffect("fiskheroes:model").setModel(samxmechmodel);
    // samxmech.setModel(utils.createModel(renderer, "nin:samx", "mech"));
    samxmech.setOffset(0.0, 0.0, 0.0);
    samxmech.setRotation(0.0, 0.0, 0.0)
    samxmech.anchor.set("body");
    samxmech.mirror = false

    var particlesmodel = utils.createModel(renderer,"nin:spincubes", "cubes");
    particlesmodel.bindAnimation("nin:samxspinp").setData((entity, data) => data.load(entity.getData("fiskheroes:energy_projection")));
    //samxmechmodel.bindAnimation("nin:samxhit1").setData((entity, data) => data.load(entity.getPunchTimerInterpolated()));

    spinparticles = renderer.createEffect("fiskheroes:model").setModel(particlesmodel);
    // samxmech.setModel(utils.createModel(renderer, "nin:samx", "mech"));
    spinparticles.setOffset(0.0, 0.0, 0.0);
    spinparticles.setRotation(0.0, 0.0, 0.0)
    spinparticles.anchor.set("body");
    spinparticles.mirror = false

    samxleftarm = renderer.createEffect("fiskheroes:model");
    samxleftarm.setModel(utils.createModel(renderer, "nin:samxleftarm", "mech"));
    samxleftarm.setOffset(5.0, -3.0, 0.0);
    samxleftarm.setRotation(0.0, 0.0, 0.0)
    samxleftarm.anchor.set("leftArm");
    // samxleftarm.setScale(8.0)
    samxleftarm.mirror = false

    var samxrightarmm = utils.createModel(renderer,"nin:r_arm", "mech");
    //samxrightarmm.bindAnimation("nin:samxhit").setData((entity, data) => data.load(entity.getPunchTimerInterpolated()));
    samxrightarmm.bindAnimation("nin:samxhit").setData((entity, data) => data.load(entity.getPunchTimerInterpolated()));
    samxrightarm = renderer.createEffect("fiskheroes:model").setModel(samxrightarmm);
    // samxrightarm = renderer.createEffect("fiskheroes:model");
    // samxrightarm.setModel(utils.createModel(renderer, "nin:samxrightarm", "mech"));
    samxrightarm.setOffset(-5.0, -3.0, 0.0);
    samxrightarm.setRotation(0.0, 0.0, 0.0)
    samxrightarm.anchor.set("rightArm");
    // samxrightarm.setScale(8.0)
    samxrightarm.mirror = false

    samxleftleg = renderer.createEffect("fiskheroes:model");
    samxleftleg.setModel(utils.createModel(renderer, "nin:samxleftleg", "mech"));
    samxleftleg.setOffset(2.0, -10.5, 0.0);
    samxleftleg.setRotation(0.0, 180.0, 0.0)
    samxleftleg.anchor.set("leftLeg");
    // samxleftleg.setScale(8.0)
    samxleftleg.mirror = false

    samxrightleg = renderer.createEffect("fiskheroes:model");
    samxrightleg.setModel(utils.createModel(renderer, "nin:samxrightleg", "mech"));
    samxrightleg.setOffset(-2.0, -10.5, 0.0);
    samxrightleg.setRotation(0.0, 180.0, 0.0)
    samxrightleg.anchor.set("rightLeg");
    // samxrightleg.setScale(8.0)
    samxrightleg.mirror = false

    samxbody = renderer.createEffect("fiskheroes:model");
    samxbody.setModel(utils.createModel(renderer, "nin:samxbody", "mech"));
    samxbody.setOffset(0.0, 0.0, 0.0);
    samxbody.setRotation(0.0, 180.0, 0.0)
    samxbody.anchor.set("body");
    // samxbody.setScale(8.0)
    samxbody.mirror = false


    // frontleftlegwu = renderer.createEffect("fiskheroes:model");
    // frontleftlegwu.setModel(utils.createModel(renderer, "nin:frontleftlegwu", null, "dragon"));
    // frontleftlegwu.setOffset(0.0, -10.0, 0.0);
    // frontleftlegwu.setRotation(0.0, 0.0, 0.0)
    // frontleftlegwu.anchor.set("leftLeg");
    // frontleftlegwu.mirror = false

    // frontrightlegwu = renderer.createEffect("fiskheroes:model");
    // frontrightlegwu.setModel(utils.createModel(renderer, "nin:frontrightlegwu", null, "dragon"));
    // frontrightlegwu.setOffset(0.0, -10.0, 0.0);
    // frontrightlegwu.setRotation(0.0, 0.0, 0.0)
    // frontrightlegwu.anchor.set("rightLeg");
    // frontrightlegwu.mirror = false

    // backrightlegwu = renderer.createEffect("fiskheroes:model");
    // backrightlegwu.setModel(utils.createModel(renderer, "nin:backrightlegwu", null, "dragon"));
    // backrightlegwu.setOffset(3.0, -10.0, 0.0);
    // backrightlegwu.setRotation(0.0, 0.0, 0.0)
    // backrightlegwu.anchor.set("leftLeg");
    // backrightlegwu.mirror = false

    // backleftlegwu = renderer.createEffect("fiskheroes:model");
    // backleftlegwu.setModel(utils.createModel(renderer, "nin:backleftlegwu", null, "dragon"));
    // backleftlegwu.setOffset(-3.0, -10.0, 0.0);
    // backleftlegwu.setRotation(0.0, 0.0, 0.0)
    // backleftlegwu.anchor.set("rightLeg");
    // backleftlegwu.mirror = false

    // staff = renderer.createEffect("fiskheroes:model");
    // staff.setModel(utils.createModel(renderer, "nin:staff_short", "staff"));
    // staff.setOffset(1.0, 10.0, 1.0);
    // staff.setRotation(90.0, 0.0, 0.0)
    // staff.anchor.set("rightArm");
    // staff.mirror = false
    // staff.opacity = 0.9;
    // staff.setScale(0.75)

    // staffshield = renderer.createEffect("fiskheroes:model");
    // staffshield.setModel(utils.createModel(renderer, "nin:staffshield", "staff"));
    // staffshield.setOffset(0.0, 14.0, 0.0);
    // staffshield.setRotation(0.0, 0.0, 0.0)
    // staffshield.anchor.set("rightArm");
    // staffshield.mirror = false
    // staffshield.opacity = 0.9;
    // staffshield.setScale(0.5)

    // flute = renderer.createEffect("fiskheroes:model");
    // flute.setModel(utils.createModel(renderer, "nin:flute", "flute"));
    // flute.setOffset(-2.0, 6.0, 0.0);
    // flute.setRotation(0.0, -65.0, 0.0)
    // flute.anchor.set("rightArm");
    // flute.mirror = false
    // flute.opacity = 0.9;
    // flute.setScale(0.3)

    // hat = renderer.createEffect("fiskheroes:model");
    // hat.setModel(utils.createModel(renderer, "nin:hat_2", "hat"));
    // hat.setOffset(2.0, -9.4, -3.0);
    // hat.setRotation(0.0, 0.0, 0.0)
    // hat.anchor.set("head");
    // hat.mirror = false
    // hat.opacity = 0.9;
    // hat.setScale(0.335)

    // hat2 = renderer.createEffect("fiskheroes:model");
    // hat2.setModel(utils.createModel(renderer, "nin:hat_2", "hat"));
    // hat2.setOffset(2.0, -11.4, -33.0);
    // hat2.setRotation(0.0, 0.0, 0.0)
    // hat2.anchor.set("rightArm");
    // hat2.mirror = false
    // hat2.opacity = 0.9;
    // hat2.setScale(0.335)

    // hat3 = renderer.createEffect("fiskheroes:model");
    // hat3.setModel(utils.createModel(renderer, "nin:hat_2", "hat"));
    // hat3.setOffset(60.0, -11.5, -35.0);
    // hat3.setRotation(0.0, -15.0, 0.0)
    // hat3.anchor.set("body");
    // hat3.mirror = false
    // hat3.opacity = 0.9;
    // hat3.setScale(0.335)

    // overlay = renderer.createEffect("fiskheroes:overlay");
    // overlay.texture.set("nin:wu")

    // spinjitzu = renderer.createEffect("fiskheroes:model");
    // spinjitzu.setModel(utils.createModel(renderer, "nin:spinjitzu_zane", null, "spinjitzu"));
    // spinjitzu.setOffset(1, 0, 1);
    // spinjitzu.anchor.set("body");
    // spinjitzu.mirror = false;
    // spinjitzu.setScale(1.0)
    // spinjitzu.opacity = 0.9;

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "nin:invisible", "rightArm", 0xdb472b, [{
                "firstPerson": [-4.5, 3.75, -8.0],
                "offset": [-0.5, 9.0, 0.0],
                "size": [2.0, 2.0]
            }
        ]);

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "body", 0xFFE942, [
        { "firstPerson": [0.0, 30.0, 0.0], "offset": [0.0, -5.0, -54.0], "size": [3.0, 3.0] }
    ]).setCondition(entity => dragon(entity));

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "body", 0xFFE942, [
        { "firstPerson": [0.0, 30.0, 0.0], "offset": [-5.0, 11.0, -54.0], "size": [3.0, 3.0] }
    ]).setCondition(entity => entity.getData("fiskheroes:flying"));

    utils.bindBeam(renderer, "fiskheroes:energy_manipulation", "fiskheroes:energy_discharge", "rightArm", 0xFFE942, [{
                "firstPerson": [-2.5, 0.0, -7.0],
                "offset": [-0.5, 19.0, -12.0],
                "size": [1.5, 1.5]
            }

        ]);
    //utils.bindCloud(renderer, "nin:dyn/dragon_timer", "pkg:teleport_morgana").setCondition(entity => entity.getData('nin:dyn/dragon_timer') > 0.125 && entity.getData('nin:dyn/dragon_timer') > 0);
    // utils.bindParticles(renderer, "nin:wu_dragon_background").setCondition(entity => entity.getInterpolatedData('nin:dyn/dragon_timer') > 0 && entity.getInterpolatedData('nin:dyn/dragon_timer') < 1);

        //utils.bindParticles(renderer, "nin:fire_hands").setCondition(entity => (entity.getInterpolatedData("fiskheroes:shield_timer") > 0 && entity.getInterpolatedData("fiskheroes:shield_timer") < 1));
        //utils.bindParticles(renderer, "nin:fire_hands").setCondition(entity => entity.getData("fiskheroes:shield") && (entity.getInterpolatedData("fiskheroes:shield_timer") > 0.5 && entity.getInterpolatedData("fiskheroes:shield_timer") < 1));
    // var sprint = renderer.bindProperty("fiskheroes:trail");  
    // sprint.setTrail(renderer.createResource("TRAIL", "nin:wu"));
    // sprint.setCondition(entity => invis(entity));
        renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
            return invis(entity) ? 0.9 : 1;
    });
    //utils.bindParticles(renderer, "nin:testhands").setCondition(entity => invis2(entity));

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
}

function render(entity, renderLayer, isFirstPersonArm) {
        if (entity.isWearingFullSuit() && !entity.getData("fiskheroes:energy_projection")) {
            samxleftarm.render();
            samxrightarm.render();
            samxleftleg.render();
            samxrightleg.render();
            samxbody.render();
            //pixal.render();
        }
        if (entity.isWearingFullSuit() && entity.getData("fiskheroes:energy_projection")) {
            samxmech.render();
            //pixal.render();
        }

}
