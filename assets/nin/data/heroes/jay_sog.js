function init(hero) {

    hero.setName("Jay/\u00A73\u00A7lMaster of Lightning\u00A7l\u00A73");
    hero.setVersion("SOG");

    hero.setTier(6);

    hero.setHelmet("Mask");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Shoes");

    hero.addPowers("nin:jay_sog", "nin:throw", "nin:charged_beam2");
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.5, 0);
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.40, 1);
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.1, 1);
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:nin:nunchucks}", true, item => item.nbt().getString("WeaponType") == 'nin:nunchucks');

    hero.addKeyBindFunc("Func_POWERSET_NEXT", nextpowersetKey, "Next Powerset", 5)
    hero.addKeyBindFunc("Func_POWERSET_PREV", prevpowersetKey, "Prev Powerset", 5)

    //powerset1 = 1
    hero.addKeyBind("CHARGED_BEAM", "Lightning Beam", 1);
    hero.addKeyBind("BEAM", "Lightning Beam", 1);
    hero.addKeyBind("CHARGE_ENERGY", "Lightning Throw", 2);
    hero.addKeyBindFunc("TENTACLES", StartClimb, "Wall Run", 3);
    // hero.addKeyBind("BLADE", "Nunchucks Of Lightning", 3);


    //powerset2 = 2

    hero.addKeyBind("STUN", "Electric Stun", 1);
    hero.addKeyBind("SUPER_SPEED", "Super speed", 2);
    hero.addKeyBind("ENERGY_PROJECTION", "Spinjitzu", 3);
    hero.addKeyBindFunc("SPINJITZU", spinjitzuKey, "Spinjitzu", 3);
    hero.addKeyBind("SLOW_MOTION", "Ninja Senses", 4);
    
    hero.setHasProperty(hasProperty);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("CLAWS", clawsProfile);
    hero.addAttributeProfile("SNEAK", sneakProfile);
    hero.addAttributeProfile("NUNCHUCKS", nunchuckProfile);
    hero.setAttributeProfile((entity) => {
        if (entity.getData("fiskheroes:blade")) {
            return "CLAWS";
        }
        if (entity.getData("nin:dyn/sneaking_timer")) {
            return "SNEAK";
        }
        if (entity.getHeldItem().nbt().getString("WeaponType") == "nin:nunchucks") {
            return "NUNCHUCKS";
        }
        if ((entity.getData("nin:dyn/fall_damage_immunity_cooldown") < 0.5)) {
            return "FALL";
        }
        if ((entity.getData("fiskheroes:dyn/steel_cooldown") > 0 && entity.isOnGround())) {
            return "FALL";
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
        manager.incrementData(entity, "nin:dyn/blade", 8, entity.getData("fiskheroes:blade_timer"));
        spinjitzuAttack(hero, entity, manager);
        waterConudct(hero, entity, manager);
        if (entity.isInWater()) {
            manager.setData(entity, "fiskheroes:flying", true);
        };
        var notspinning = true;
        if (entity.getData("fiskheroes:energy_projection")) {
            manager.setData(entity, "nin:dyn/spinning", true);
            manager.setData(entity, 'fiskheroes:tentacle_lift', true);
            notspinning = false;
        } else {
            manager.setData(entity, "nin:dyn/spinning", false);
            notspinning = true;
        }
        var value = entity.getData("nin:dyn/climb");
        if (entity.getData('fiskheroes:tentacle_lift')) {
                manager.setData(entity, "nin:dyn/climb", value + 0.1);
        } else if (!entity.getData('fiskheroes:tentacle_lift') && value != 0) {
            manager.setData(entity, "nin:dyn/climb", 0);
            manager.setData(entity, "nin:dyn/climb_bool", false);
        }
        // if (entity.getData("fiskheroes:tentacles") == null && entity.getData('fiskheroes:tentacle_lift')) {
        //     manager.setData(entity, "fiskheroes:tentacle_lift", false);
        // } else 
        if (entity.getData("fiskheroes:tentacles") != null ) {
            manager.setData(entity, "fiskheroes:tentacle_lift", true);
        }
        if (entity.getData("nin:dyn/spinning") && !entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:tentacle_lift", true);
        }
        else if (!entity.getData("nin:dyn/spinning") && entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:tentacle_lift", false);
        }
        // else if (entity.isOnGround()){
        //     manager.setData(entity, "fiskheroes:tentacle_lift", false)
        // }
        else if (notspinning && entity.world().getBlock(entity.pos().add(0, 0, -1)) == 'minecraft:air' && entity.world().getBlock(entity.pos().add(0, 0, 1)) == 'minecraft:air') {
            manager.setData(entity, "fiskheroes:tentacle_lift", false);
        }
        if (entity.getData("fiskheroes:tentacle_lift")) {
            manager.setData(entity, "nin:dyn/climb_bool", true);
        }
        else{
            manager.setData(entity, "nin:dyn/climb_bool", false);
        }
        if (entity.getData("nin:dyn/climb") > 0) {
            manager.setData(entity, "nin:dyn/fall_damage_immunity_cooldown", 1);
        }
    });
}
function spinjitzuAttack(hero, entity, manager) {
    if (entity.getData("fiskheroes:energy_projection") && entity.getHeldItem().nbt().getString("WeaponType") != "nin:nunchucks") {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 2.5);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "ELECTRICITY", "%s was ripped to shreads by %s's spinjitzu", 35, entity);
            }
        }
    }
    else if (entity.getData("fiskheroes:energy_projection") && entity.getHeldItem().nbt().getString("WeaponType") == "nin:nunchucks") {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 2.5);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "ELECTRICITY", "%s was shocked to death by %s's spinjitzu", 50, entity);
            }
        }
    }
    //manager.incrementData(entity, "nin:dyn/lightning_pulse_shooting_timer", 999, entity.getData("nin:dyn/lightning_pulse_timer") == 1, false);

    /*if (entity.getData("nin:dyn/lightning_pulse_shooting_timer") == 1 || !entity.getData("nin:dyn/lightning_pulse")) {
        manager.setInterpolatedData(entity, "nin:dyn/lightning_pulse_shooting_timer", 0);
        manager.setDataWithNotify(entity, "nin:dyn/lightning_pulse", false);
    }*/
}
function waterConudct(hero, entity, manager) {
    if (entity.isInWater() && entity.getData("fiskheroes:beam_shooting_timer") > 0 && entity.getHeldItem().nbt().getString("WeaponType") != "nin:nunchucks") {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 200);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "ELECTRICITY", "%s was shocked out of the water by %s's attack", 15, entity);
            }
        }
    }
    else if (entity.isInWater() && entity.getData("fiskheroes:beam_shooting_timer") > 0 && entity.getHeldItem().nbt().getString("WeaponType") == "nin:nunchucks") {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 200);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "ELECTRICITY", "%s was shocked out of the water by %s's attack", 20, entity);
            }
        }
    }
}
function clawsProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 20.0, 0);
}
function nunchuckProfile(profile) {
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
            //repeat above for each modifer you want to be possible anyways
            default:
                return true;
        }
    }
function isModifierEnabled(entity, modifier) {
    var trans = entity.getData("fiskheroes:dyn/steel_timer") == 1;
    var leap = entity.getData("fiskheroes:energy_projection");
    var YDif = Math.round(entity.posY()) - entity.posY(); 
    var pitch = entity.rotPitch();
    var syaw = entity.getData("nin:dyn/startedyaw");
    var yaw = entity.rotYaw();
    var trans = entity.getData("fiskheroes:dyn/steel_timer") == 1;
    var leap = entity.getData("fiskheroes:energy_projection");
    switch (modifier.name()) {
    case "fiskheroes:lightning_cast":
        /*switch (modifier.id()) {
            case "normal":
                return !entity.getData("fiskheroes:blade");
            case "blade":
                return entity.getData("fiskheroes:blade");
        };*/
        return entity.getData("fiskheroes:energy_charge") == 0 && !entity.getData("nin:dyn/lightning_pulse_timer") == 1;
    /*case "fiskheroes:energy_projection":
        return entity.isSprinting();*/
    case "fiskheroes:flight":
        return trans;
    case "fiskheroes:leaping":
        return leap;
    case "fiskheroes:controlled_flight":
        return entity.isInWater();
    case "fiskheroes:charged_beam":
        switch (modifier.id()) {
            case "normal":
                return entity.getData("nin:dyn/powerset") == 1;
            case "stun":
                return entity.getData("nin:dyn/powerset") == 2;
        };
    case "fiskheroes:tentacles":
        if (entity.world().getBlock(entity.pos().add(0, YDif, 0.5)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(0, YDif, -0.5)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(0.5, YDif, 0)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(-0.5, YDif, 0)) == 'minecraft:air' &&

            entity.world().getBlock(entity.pos().add(0, YDif + 0, 1.5)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(0, YDif + 0, -2.0)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(2.0, YDif + 0, 0)) == 'minecraft:air'
                && entity.world().getBlock(entity.pos().add(-2.0, YDif + 0, 0)) == 'minecraft:air'

                || entity.isInWater() || !entity.getData("fiskheroes:moving")) {
            return false
        };
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
        case "CHARGED_BEAM":
            return (entity.getData("nin:dyn/powerset") == 1 || entity.getData("nin:dyn/powerset") == 2);   
        case "STUN":
            return entity.getData("nin:dyn/powerset") == 2;
        case "BEAM":
            return entity.getData("nin:dyn/powerset") == 1;    
        case "BLADE":
            return (entity.getData("nin:dyn/powerset") == 1);
        case "CHARGE_ENERGY":
            return (entity.getData("nin:dyn/powerset") == 1);
    //powerset 2
        case "SLOW_MOTION":
            return (entity.getData("nin:dyn/powerset") == 2);
        case "ENERGY_PROJECTION":
            return (entity.getData("nin:dyn/powerset") == 2);
        case "STEEL_TRANSFORM":
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

function hasProperty(entity, property) {
    return property == "MASK_TOGGLE";
}
function prevpowersetKey(player, manager) {
    var flag = player.getData("nin:dyn/powerset");
    if (flag == 1) {
        manager.setDataWithNotify(player, "nin:dyn/powerset", 2);
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
    if (flag == 2) {
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
function StartClimb(entity, manager) {
    manager.setData(entity, "nin:dyn/startedclimb", true);
    manager.setData(entity, "nin:dyn/startedyaw", entity.rotYaw());
    var syaw = entity.getData("nin:dyn/startedyaw");
    return true;
}
function spinjitzuKey(entity, manager) {
    spinvalue = entity.getData("nin:dyn/spin_timer");
    startvalue = entity.getData("nin:dyn/spin_start_timer");
    manager.setData(entity, "nin:dyn/spin_start_timer", startvalue + 0.1);
    if (entity.getData("nin:dyn/spin_start_timer") > 2) {
        manager.setData(entity, "nin:dyn/spin_timer", spinvalue + 0.1);
        if (entity.getData("nin:dyn/spin_timer") > .25) {
            manager.setData(entity, "fiskheroes:energy_projection", true);        
        }
    }
    return true;
}
