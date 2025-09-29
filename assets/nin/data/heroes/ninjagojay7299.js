function IsCreator(entity) {
    return entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd";
}
var utils = implement("fiskheroes:external/utils");
function init(hero) {

    hero.setName("NinjagoJay7299/\u00A73\u00A7lMaster of Lightning\u00A7l\u00A73");

    hero.setTier(10);
    hero.hide()
    hero.setHelmet("Mask");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Shoes");

    hero.addPowers("nin:ninjagojay7299"/*,"nin:throw", "nin:charged_beam"*/);
    hero.addAttribute("FALL_RESISTANCE", 10000000000.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.5, 0);
    hero.addAttribute("PUNCH_DAMAGE", 999.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.40, 1);
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 8.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.1, 1);
    hero.addAttribute("DAMAGE_REDUCTION", 1000.0, 1);
    hero.addAttribute("MAX_HEALTH", 10.0, 1);
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:nin:nol}", true, item => item.nbt().getString("WeaponType") == 'nin:nol');
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:nin:shuriken}", true, item => item.nbt().getString("WeaponType") == 'nin:shuriken');
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:nin:scythe}", true, item => item.nbt().getString("WeaponType") == 'nin:scythe');
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:nin:nunchucks}", true, item => item.nbt().getString("WeaponType") == 'nin:nunchucks');
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:nin:katana}", true, item => item.nbt().getString("WeaponType") == 'nin:katana');
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:nin:trident}", true, item => item.nbt().getString("WeaponType") == 'nin:trident');


    hero.addKeyBindFunc("Func_POWERSET_NEXT", nextpowersetKey, "Next Powerset", 5)
    hero.addKeyBindFunc("Func_POWERSET_PREV", prevpowersetKey, "Prev Powerset", 5)

    //powerset1 = 1
    hero.addKeyBind("CHARGED_BEAM", "Lightning Beam", 1);
    hero.addKeyBind("CHARGE_ENERGY", "Lightning Throw", 2);
    hero.addKeyBind("BLADE", "Nunchucks Of Lightning", 3);
    hero.addKeyBind("GOD_MODE", "God Of Lightning", 4)

    //powerset2 = 2
    hero.addKeyBind("SUPER_SPEED", "Super speed", 1);
    hero.addKeyBind("SHIELD", "Airjitzu", 2);
    hero.addKeyBind("ENERGY_PROJECTION", "Spinjitzu", 3);
    hero.addKeyBind("SLOW_MOTION", "Ninja Senses", 4);
    
    //powerset3 = 3
    hero.addKeyBind("INTANGIBILITY", "Phase Shift", 3);
    hero.addKeyBind("LIGHTNING_PULSE", "Lightning Burst", 4);
    hero.addKeyBind("LIGHTNING_PULSE_HOLD", "Lightning Burst", 4);

    hero.setHasProperty(hasProperty);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("CLAWS", clawsProfile);
    hero.addAttributeProfile("SNEAK", sneakProfile);
    hero.setAttributeProfile((entity) => {
        if (entity.getData("fiskheroes:blade")) {
            return "CLAWS";
        }
        if (entity.getData("nin:dyn/sneaking_timer")) {
            return "SNEAK";
        }
        return null;
    });
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("CLAWS", {"types": {"SHARP": 1.0}});
    hero.addDamageProfile("ELECTRICITY", {
        "types": {
            "ELECTRICITY": 1.0
        }
    });
    hero.setTickHandler((entity, manager) => {
        utils.flightOnIntangibility(entity, manager);

        //lightningPulse(hero, entity, manager);

        manager.incrementData(entity, "nin:dyn/blade", 8, entity.getData("fiskheroes:blade_timer"));
        
        if (!entity.getData("fiskheroes:shield") || entity.getData("nin:dyn/goded") || entity.isOnGround()) {
            manager.setData(entity, "nin:dyn/aired", false);
        };
        //manager.incrementData(entity, "nin:dyn/airjitzu_timer", entity.getData("fiskheroes:shield_timer"));
        if (entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:shield", false);
        };
        if (entity.getData("fiskheroes:shield") && !entity.getData("nin:dyn/goded")) {
            manager.setData(entity, "nin:dyn/aired", true);
        };
        if (entity.getData("fiskheroes:energy_projection")) {
            manager.setData(entity, "nin:dyn/spinning", true);
        } else {
            manager.setData(entity, "nin:dyn/spinning", false);
        };
        /*if (entity.getData("nin:dyn/aired")) {
            manager.setData(entity, "fiskheroes:flight", true);
        };*/lightningPulse(hero, entity, manager);
            spinjitzuAttack(hero, entity, manager);
    });
}
function spinjitzuAttack(hero, entity, manager) {
    if (entity.getData("fiskheroes:energy_projection")) {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 2.5);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "ELECTRICITY", "%s was shocked to death by %s's spinjitzu", 70, entity);
            }
        }
    }
}
function lightningPulse(hero, entity, manager) {
    if (entity.getData("nin:dyn/lightning_pulse_timer") == 1) {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 14);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "ELECTRICITY", "%s was blasted away by %s's lightning pulse", 400, entity);
            }
        }
    }

    manager.incrementData(entity, "nin:dyn/lightning_pulse_shooting_timer", 30, entity.getData("nin:dyn/lightning_pulse_timer") == 1, false);

    if (entity.getData("nin:dyn/lightning_pulse_shooting_timer") == 1 || !entity.getData("nin:dyn/lightning_pulse")) {
        manager.setInterpolatedData(entity, "nin:dyn/lightning_pulse_shooting_timer", 0);
        manager.setDataWithNotify(entity, "nin:dyn/lightning_pulse", false);
    }
}
function clawsProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 20.0, 0);
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
function isModifierEnabled(entity, modifier) {
    var trans = entity.getData("fiskheroes:dyn/steel_timer") == 1;
    var leap = entity.getData("fiskheroes:energy_projection");
    var YDif = Math.round(entity.posY()) - entity.posY(); 
    var pitch = entity.rotPitch();
    var syaw = entity.getData("nin:dyn/startedyaw");
    var yaw = entity.rotYaw();
    var transformation = entity.getData("fiskheroes:dyn/steeled");
        switch(modifier.name()) {
            case "fiskheroes:metal_skin":
                return transformation;
            default:
                return true;
        }
    }
function isModifierEnabled(entity, modifier) {
    // var trans = entity.getData("fiskheroes:dyn/steel_timer") == 1;
    var leap = entity.getData("fiskheroes:energy_projection");
    var YDif = Math.round(entity.posY()) - entity.posY(); 
    var pitch = entity.rotPitch();
    var syaw = entity.getData("nin:dyn/startedyaw");
    var yaw = entity.rotYaw();
    var trans = entity.getData("nin:dyn/airjitzu_timer") == 1;
    var god = entity.getData("nin:dyn/goded");
    var leap = entity.getData("fiskheroes:energy_projection")
    var allow = IsCreator(entity)
    switch (modifier.name()) {
    // case "fiskheroes:lightning_cast":
    //     return allow && entity.getData("fiskheroes:energy_charge") == 0 && !entity.getData("fiskheroes:energy_projection");
    case "fiskheroes:energy_projection":
        switch (modifier.id()) {
            case "straight":
                return modifier.id() == "straight" == (Math.random() > 0.5);
            case "backwards":
                return modifier.id() == "backwards" == (Math.random() < 0.5);
        };
        return true;
    case "fiskheroes:cooldown":
        switch (modifier.id()) {
            case "god":
                return !trans;
            case "air":
                return !god;
        }
    /*case "fiskheroes:transformation":
        switch (modifier.id()) {
            case "god":
                return !trans;
            case "air":
                return !entity.isOnGround();
            };*/
    case "fiskheroes:controlled_flight":
        return god || allow && entity.isInWater();
    case "fiskheroes:flight":
        return trans;
    case "fiskheroes:leaping":
        return leap;
    case "fiskheroes:charged_beam":
        switch (modifier.id()) {
            case "normal":
                return !(entity.getData("nin:dyn/lightning_pulse_timer") == 1);
            /*case "storm":
                return (entity.getData("nin:dyn/lightning_pulse_timer") == 1);*/
        };
        return true;
    default:
        return true;

    }
}

function isKeyBindEnabled(entity, keyBind) {
    /*if (keyBind == "LIGHTNING_PULSE") {
        return !(entity.getData("fiskheroes:flying") && entity.isSprinting()) && !entity.getData("nin:dyn/lightning_pulse_hold") && (entity.getData("nin:dyn/lightning_pulse_timer") == 0 || entity.getData("nin:dyn/lightning_pulse"));
    }
    if (keyBind == "LIGHTNING_PULSE_HOLD") {
        return !(entity.getData("fiskheroes:flying") && entity.isSprinting()) && entity.getData("nin:dyn/lightning_pulse_hold") && !(entity.getData("nin:dyn/lightning_pulse_timer") == 0 || entity.getData("nin:dyn/lightning_pulse"));
    }*/
    var god = entity.getData("nin:dyn/goded");
    switch (keyBind) {
        //powerset 1
        case "CHARGED_BEAM":
            return (entity.getData("nin:dyn/powerset") == 1) && (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd");       
        case "BLADE":
            return (entity.getData("nin:dyn/powerset") == 1) && (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd");
        case "CHARGE_ENERGY":
            return (entity.getData("nin:dyn/powerset") == 1) && (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd");
        case "GOD_MODE":
            return (entity.getData("nin:dyn/powerset") == 1) && (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd");
    //powerset 2
        case "SLOW_MOTION":
            return (entity.getData("nin:dyn/powerset") == 2) && (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd");
        case "ENERGY_PROJECTION":
            return (entity.getData("nin:dyn/powerset") == 2) && (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd");
        case "SHIELD":
            return (entity.getData("nin:dyn/powerset") == 2) && (!entity.isOnGround()) && (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd");
        case "SUPER_SPEED":
            return (entity.getData("nin:dyn/powerset") == 2) && (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd");
    //powerset 3
        case "LIGHTNING_PULSE":
            return (entity.getData("nin:dyn/powerset") == 3) && !entity.getData("nin:dyn/lightning_pulse_hold") && (entity.getData("nin:dyn/lightning_pulse_timer") == 0  && (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd") || (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd") && entity.getData("nin:dyn/lightning_pulse"));
        case "LIGHTNING_PULSE_HOLD":
            return (entity.getData("nin:dyn/powerset") == 3) && entity.getData("nin:dyn/lightning_pulse_hold") && !(entity.getData("nin:dyn/lightning_pulse_timer") == 0 && (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd") || (entity.getUUID() == "f8859e84-66ba-40f7-9e83-8d46bc6abcdd") && entity.getData("nin:dyn/lightning_pulse"));
        case "INTANGIBILITY":
            return (entity.getData("nin:dyn/powerset") == 3) && god;
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

function hasProperty(entity, property) {
    return property == "MASK_TOGGLE";
}
function prevpowersetKey(player, manager) {
    var flag = player.getData("nin:dyn/powerset");
    if (flag == 1) {
        manager.setDataWithNotify(player, "nin:dyn/powerset", 3);
        return true;
    }
    if (flag >= 1) {
        manager.setDataWithNotify(player, "nin:dyn/powerset", player.getData("nin:dyn/powerset") - 1);
        return true;
    }

    manager.setDataWithNotify(player, "nin:dyn/powerset", 4);
    return true;
}

function nextpowersetKey(player, manager) {
    var flag = player.getData("nin:dyn/powerset");
    if (flag == 3) {
        manager.setDataWithNotify(player, "nin:dyn/powerset", 1);
        return true;
    }
    if (flag >= 1) {
        manager.setDataWithNotify(player, "nin:dyn/powerset", player.getData("nin:dyn/powerset") + 1);
        return true;
    }

    manager.setDataWithNotify(player, "nin:dyn/powerset", 1);
    return true;
}
