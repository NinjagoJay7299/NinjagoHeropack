function init(hero) {

    hero.setName("Cole/Ninjago");
    hero.setVersion("ZX");

    hero.setTier(6);

    hero.setHelmet("Mask");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Shoes");

    hero.addPowers("nin:cole", "nin:throw");
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.5, 0);
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.40, 1);
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.1, 1);


    hero.addKeyBindFunc("Func_POWERSET_NEXT", nextpowersetKey, "Next Powerset", 5)
    hero.addKeyBindFunc("Func_POWERSET_PREV", prevpowersetKey, "Prev Powerset", 5)

    //powerset1 = 1
    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 1);
    hero.addKeyBind("EARTHQUAKE", "key.earthquake", 2)
    
    hero.addKeyBind("CHARGED_BEAM", "Earth Spikes", 3);
    hero.addKeyBindFunc("TENTACLES", StartClimb, "Wall Run", 3);

    hero.addKeyBind("CHARGE_ENERGY", "Magma Punch", 4);
    //powerset2 = 2
    hero.addKeyBind("SUPER_SPEED", "Super speed", 1);
    hero.addKeyBind("STEEL_TRANSFORM", "Airjitzu", 2);
    hero.addKeyBind("ENERGY_PROJECTION", "Spinjitzu", 3);
    hero.addKeyBind("SLOW_MOTION", "Ninja Senses", 4);
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:nin:soq}", true, item => item.nbt().getString("WeaponType") == 'nin:soq');


    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);

	hero.supplyFunction("canDischargeEnergy", false);

    hero.setHasProperty(hasProperty);
    hero.supplyFunction("canAim", canAim);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("SNEAK", sneakProfile);
    hero.addAttributeProfile("SCYTHE", scytheProfile);
    hero.addAttributeProfile("SPIKES", spikeProfile);
    hero.setAttributeProfile((entity) => {
        if (entity.getData("nin:dyn/sneaking_timer")) {
            return "SNEAK";
        }
        if (entity.getHeldItem().nbt().getString("WeaponType") == "nin:soq" && !entity.getData("nin:dyn/hitting_ground")) {
            return "SCYTHE";
        }
        if (entity.getData("fiskheroes:beam_charging")) {
            return "SPIKES";
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
    hero.addDamageProfile("THORNS", {
        "types": {
            "THORNS": 1.0
        }
    });
    hero.setTickHandler((entity, manager) => {
        if(entity.getData("fiskheroes:beam_shooting")) {
            manager.setData(entity, "nin:dyn/hitting_ground", true);
        }
        else {
            manager.setData(entity, "nin:dyn/hitting_ground", false);
        }
        manager.incrementData(entity, "nin:dyn/blade", 8, entity.getData("fiskheroes:blade_timer"));
        spinjitzuAttack(hero, entity, manager);
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
        // earthspikes(hero, entity, manager);
        /*if (entity.getData("nin:dyn/lightning_pulse_timer") == 1) {
            manager.setData(entity, "fiskheroes:energy_projection", true);
        };*/
        //manager.setData(entity, "fiskheroes:energy_projection", entity.getData("nin:dyn/lightning_pulse_hold"));
        
    });
}
function scytheProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 25.0, 1);
}
function spikeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", -15.0, 1);
    profile.addAttribute("SPRINT_SPEED", -15.0, 1);
}
function spinjitzuAttack(hero, entity, manager) {
    if (entity.getData("fiskheroes:energy_projection") && entity.getHeldItem().isEmpty()) {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 2.5);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "THORNS", "%s was ripped to shreads by %s's spinjitzu", 35, entity);
            }
        }
    }
    else if (entity.getData("fiskheroes:energy_projection") && entity.getHeldItem().nbt().getString("WeaponType") == "nin:soq") {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 2.5);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "THORNS", "%s was returned to earth by %s's spinjitzu", 50, entity);
            }
        }
    }
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
    case "fiskheroes:energy_projection":
        return entity.exists();
    case "fiskheroes:flight":
        return trans;
    case "fiskheroes:leaping":
        return leap;
    case "fiskheroes:controlled_flight":
        return entity.isInWater();
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
        case "GROUND_SMASH":
            return (entity.getData("nin:dyn/powerset") == 1);       
        case "EARTHQUAKE":
            return (entity.getData("nin:dyn/powerset") == 1);
        case "CHARGED_BEAM":
            return (entity.getData("nin:dyn/powerset") == 1) && allowspikes /*&& entity.getHeldItem().nbt().getString("WeaponType") == "nin:soq"*/;
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
function getBlockInFront(entity) {
    var pos = entity.pos();
    var yaw = entity.rotBodyYaw() * Math.PI / 180;
    var x = Math.round(Math.sin(yaw));
    var z = Math.round(Math.cos(yaw));
    return entity.world().getBlock(pos.x() + x, pos.y(), pos.z() + z);
}
