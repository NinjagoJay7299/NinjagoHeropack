/*function init(hero) {
    hero.setName("Master Wu/Ninjago");
    hero.setTier(6);
    hero.hide();
    hero.setHelmet("Mask");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Shoes");

    hero.addPowers("nin:wu", "nin:throw");
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.5, 0);
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.40, 1);
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.1, 1);


    hero.addKeyBindFunc("Kai", select, "Fire Powers <1/5>", 1);
    hero.addKeyBindFunc("Jay", select, "Lightning Powers <2/5>", 1);
    hero.addKeyBindFunc("Zane", select, "Ice Powers <3/5>", 1);
    hero.addKeyBindFunc("Cole", select, "Earth Powers <4/5>", 1);
    hero.addKeyBindFunc("Wu", select, "Wu's Powers <5/5>", 1);


    //Powers
    //Jay
    hero.addKeyBind("CHARGED_BEAM", "Lightning Beam", 1);
    hero.addKeyBind("CHARGE_ENERGY", "Lightning Throw", 2);
    //Kai
    hero.addKeyBind("AIM", "FireBlast", 1);
    //Cole
    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 1);
    hero.addKeyBind("EARTHQUAKE", "key.earthquake", 2)
    hero.addKeyBind("CHARGE_ENERGY", "Magma Punch", 4);
    //Zane
    hero.addKeyBind("CHARGED_BEAM", "Ice Beam", 1);
    hero.addKeyBind("CHARGE_ICE", "key.chargeIce", 3);

    hero.setHasProperty(hasProperty);
    hero.supplyFunction("canAim", canAim);
    hero.addAttributeProfile("SNEAK", sneakProfile);
    hero.addAttributeProfile("SHIELD", shieldProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("CLAWS", {
        "types": {
            "SHARP": 16.0
        }
    });

    hero.setHasProperty(hasProperty);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setTickHandler((entity, manager) => {
        var data = entity.getData("nin:dyn/powers");
        if (entity.getData("nin:dyn/use")) {
            manager.setData(entity, "nin:dyn/powers", entity.isSneaking() ? data == 0 ? 5 : data - 1 : data == 5 ? 0 : data + 1);
            manager.setData(entity, "nin:dyn/use", false);
        }
    });
}

function clawsProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 16.5, 0);
}
function select(entity, manager) {
    manager.setData(entity, "nin:dyn/use", true);
    return true;
}
function getProfile(entity) {
    return entity.getData("fiskheroes:blade") ? "CLAWS" : null;
}
function getProfile(entity) {
    if (entity.getData("nin:dyn/sneaking_timer")) {
        return "SNEAK";
    }
}

function sneakProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", 0.5, 1);
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}
function shieldProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 12.0, 0);
}
function getAttributeProfile(entity) {
    return entity.getData("fiskheroes:shield_blocking") ? "SHIELD" : null;
}
function isModifierEnabled(entity, modifier) {
    var trans = entity.getData("fiskheroes:dyn/steel_timer") == 1;
    var leap = entity.getData("fiskheroes:energy_projection");
    var YDif = Math.round(entity.posY()) - entity.posY(); 
    var pitch = entity.rotPitch();
    var syaw = entity.getData("nin:dyn/startedyaw");
    var yaw = entity.rotYaw();
    switch (modifier.name()) {
    case "fiskheroes:energy_projection":
        return entity.getData('fiskheroes:speeding') && entity.isSprinting();
    case "fiskheroes:flight":
        return entity.getData("fiskheroes:blade") && entity.getHeldItem().isEmpty();
    default:
        return true;

    }
}

function isKeyBindEnabled(entity, keyBind) {
    var trans = entity.getData("fiskheroes:dyn/steel_timer") == 1;
    var leap = entity.getData("fiskheroes:energy_projection");
    var YDif = Math.round(entity.posY()) - entity.posY(); 
    var pitch = entity.rotPitch();
    var syaw = entity.getData("nin:dyn/startedyaw");
    var yaw = entity.rotYaw();
    var allowspikes = !entity.world().getBlock(entity.pos().add(0, YDif, 0.5)) == 'minecraft:air'
    && entity.world().getBlock(entity.pos().add(0, YDif, -0.5)) == 'minecraft:air'
    && entity.world().getBlock(entity.pos().add(0.5, YDif, 0)) == 'minecraft:air'
    && entity.world().getBlock(entity.pos().add(-0.5, YDif, 0)) == 'minecraft:air' ||

    entity.world().getBlock(entity.pos().add(0, YDif+0, 0.5)) == 'minecraft:air'
    && entity.world().getBlock(entity.pos().add(0, YDif+0, -0.5)) == 'minecraft:air'
    && entity.world().getBlock(entity.pos().add(0.5, YDif+0, 0)) == 'minecraft:air'
    && entity.world().getBlock(entity.pos().add(-0.5, YDif+0, 0)) == 'minecraft:air' 


    || entity.isInWater() || pitch > 30
    switch (keyBind) {
    //powerset 1
        case "AIM":
            return (entity.getData("nin:dyn/powerset") == 1);       
        case "SHIELD":
            return (entity.getData("nin:dyn/powerset") == 1);
    //powerset 2
        case "SLOW_MOTION":
            return (entity.getData("nin:dyn/powerset") == 2);
        case "ENERGY_PROJECTION":
            return (entity.getData("nin:dyn/powerset") == 2) && entity.getData('fiskheroes:speeding') && entity.isSprinting();
        case "BLADE":
            return (entity.getData("nin:dyn/powerset") == 2);
        case "SUPER_SPEED":
            return (entity.getData("nin:dyn/powerset") == 2);
    //powerset cases
    case "Func_POWERSET_NEXT":
        return !entity.isSneaking();
    case "Func_POWERSET_PREV":
                return entity.isSneaking();
        case "TENTACLES":   
            if (entity.world().getBlock(entity.pos().add(0, YDif, 0.5)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(0, YDif, -0.5)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(0.5, YDif, 0)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(-0.5, YDif, 0)) == 'minecraft:air' ||

                entity.world().getBlock(entity.pos().add(0, YDif+0, 0.5)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(0, YDif+0, -0.5)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(0.5, YDif+0, 0)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(-0.5, YDif+0, 0)) == 'minecraft:air' 


                || entity.isInWater() || pitch > 30/*|| entity.getData("nin:dyn/powerset") == 2*/) {
                return (false)
        }; 
        default:
            return true;
        }
    
}
function isKeyBindEnabled(entity, keyBind) {
    var data = entity.getData("nin:dyn/powers");
    switch (keyBind) {
    case "POWER":
        return data == 0;
    case "REALITY":
        return data == 1;
    case "MIND":
        return data == 2;
    case "SPACE":
        return data == 3;
    case "SOUL":
        return data == 4;
    case "TIME":
        return data == 5;

        //Abilities

        //Power
    case "GROUND_SMASH":
        return data == 0;
    case "AIM":
        return data == 0;
        case "ENERGY_PROJECTION":
            return data ==0;
        //Reality

    case "SHAPE_SHIFT":
        return data == 1;
    case "SHAPE_SHIFT_RESET":
        return data == 1 && entity.isSneaking();

    case "INTANGIBILITY":
        return data == 1 && entity.isSneaking();

    case "INVISIBILITY":
        return data == 1 && entity.isSneaking();
      
    case "CAPE_TRANSFORM":
        return data == 1 && !entity.isSneaking();

    case "SHADOWDOME" :
        return data == 1 && !entity.isSneaking();
    case "TELEKINESIS" :
            return data == 2;
    default:
        return true;
    }
}
function hasProperty(entity, property) {
    return property == "MASK_TOGGLE";
}*/