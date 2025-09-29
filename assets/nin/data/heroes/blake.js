var utils = implement("fiskheroes:external/utils");
function init(hero) {

    hero.setName("Blake/custom");

    hero.setTier(10);

    hero.setHelmet("helmet");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("boots");

    hero.addPowers("nin:blake", "nin:throw");
    hero.addAttribute("FALL_RESISTANCE", 100.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2, 0);
    hero.addAttribute("PUNCH_DAMAGE", 20.0, 0);
    hero.addAttribute("SPRINT_SPEED", 1, 1);
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 10.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.1, 1);


    hero.addKeyBindFunc("Func_POWERSET_NEXT", nextpowersetKey, "Next Powerset", 5)
    hero.addKeyBindFunc("Func_POWERSET_PREV", prevpowersetKey, "Prev Powerset", 5)

    //powerset1 = 1
    hero.addKeyBind("BLADE", "Hard Matter Sword", 1);
    hero.addKeyBind("SHIELD", "Hard Matter Shield", 1);
    hero.addKeyBind("EARTHQUAKE", "key.earthquake", 2)
    hero.addKeyBind("CHARGED_BEAM", "super bean", 3);
    hero.addKeyBind("INTANGIBILITY", "Phasing", 4);
    // hero.addKeyBind("CHARGE_ENERGY", "Magma Punch", 4);
    //powerset2 = 2
    hero.addKeyBind("SUPER_SPEED", "Super speed", 1);
    hero.addKeyBind("STEEL_TRANSFORM", "Sonic Punch", 2);
    hero.addKeyBind("CHARGED_PUNCH", "Spinjitzu", 3);
    hero.addKeyBind("SLOW_MOTION", "Ninja Senses", 4);
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:nin:drill, AttributeModifiers:[{Operation:0,UUIDLeast:1,UUIDMost:1,Amount:40,AttributeName:generic.attackDamage,Name:Attack Damage}]}", true, item=> item.nbt().getString("WeaponType") == "nin:drill");


    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);

	hero.supplyFunction("canDischargeEnergy", false);

    hero.setHasProperty(hasProperty);
    hero.supplyFunction("canAim", canAim);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("SNEAK", sneakProfile);
    hero.addAttributeProfile("SCYTHE", scytheProfile);
    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.addAttributeProfile("BOOST", boostProfile);
    hero.setAttributeProfile((entity) => {
        if (entity.getData("nin:dyn/sneaking_timer")) {
            return "SNEAK";
        }
        if (entity.getHeldItem().nbt().getString("WeaponType") == "nin:drill") {
            return "SCYTHE";
        }
        if (entity.getData("fiskheroes:dyn/steel_timer") > 0 && entity.isSprinting()) {
            return "BOOST";
        }
        if (entity.getData("fiskheroes:blade")) {
            return "BLADE";
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
        manager.incrementData(entity, "nin:dyn/blade", 8, entity.getData("fiskheroes:blade_timer"));
        spinjitzuAttack(hero, entity, manager);
        utils.flightOnIntangibility(entity, manager);
        if (entity.isInWater()) {
            manager.setData(entity, "fiskheroes:flying", true);
        };
        if (entity.getData("fiskheroes:dyn/steel_timer") > 0.1 && entity.isSprinting()) {
            manager.setData(entity, "fiskheroes:energy_projection", true)
            // manager.setData(entity, "fiskheroes:super_speed", true)
        }
        if (entity.getData("fiskheroes:dyn/steel_timer") == 0) {
            manager.setData(entity, "fiskheroes:energy_projection", false)
            // manager.setData(entity, "fiskheroes:super_speed", false)
        }
        if (entity.getData("fiskheroes:punchmode")) {
            manager.setData(entity, "nin:dyn/spinning", true);
        } else {
            manager.setData(entity, "nin:dyn/spinning", false);
        }
        
        // boostPunch(hero, entity, manager);
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
function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 25.0, 1);
}
function boostProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", 10.0, 1);
}
function spinjitzuAttack(hero, entity, manager) {
    if (entity.getData("fiskheroes:punchmode") && entity.getHeldItem().isEmpty()) {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 2.5);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "THORNS", "%s was ripped to shreads by %s's spinjitzu", 35, entity);
            }
        }
    }
    else if (entity.getData("fiskheroes:punchmode") && entity.getHeldItem().nbt().getString("WeaponType") == "nin:drill") {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 2.5);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "THORNS", "%s was returned to earth by %s's spinjitzu", 50, entity);
            }
        }
    }
    //manager.incrementData(entity, "nin:dyn/lightning_pulse_shooting_timer", 999, entity.getData("nin:dyn/lightning_pulse_timer") == 1, false);

    /*if (entity.getData("nin:dyn/lightning_pulse_shooting_timer") == 1 || !entity.getData("nin:dyn/lightning_pulse")) {
        manager.setInterpolatedData(entity, "nin:dyn/lightning_pulse_shooting_timer", 0);
        manager.setDataWithNotify(entity, "nin:dyn/lightning_pulse", false);
    }*/
}
// function boostPunch(hero, entity, manager) {
//     if (entity.getData("fiskheroes:energy_charge") > 0 && entity.isSprinting()) {
//         var list = entity.world().getEntitiesInRangeOf(entity.pos(), 8);
//         for (var i = 0; i < list.size(); ++i) {
//             var other = list.get(i);
//             if (other.isLivingEntity() && !entity.equals(other)) {
//                 other.hurtByAttacker(hero, "THORNS", "%s was torn apart with the earth", 35, entity);
//             }
//         }
//     }
// }
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
    // var trans = entity.getData("fiskheroes:dyn/steel_timer") == 1;
    var leap = entity.getData("fiskheroes:punchmode");
    switch (modifier.name()) {
    case "fiskheroes:flight":
        return !entity.exists();
    case "fiskheroes:leaping":
        return leap;
    case "fiskheroes:blade":
        return !entity.getData("fiskheroes:aiming") && !entity.getData("fiskheroes:shield") && !(entity.isSprinting() && entity.getData("fiskheroes:flying"));
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
        case "INTANGIBILITY":
            return (entity.getData("nin:dyn/powerset") == 1);
        case "EARTHQUAKE":
            return (entity.getData("nin:dyn/powerset") == 1);
        case "CHARGED_BEAM":
            return (entity.getData("nin:dyn/powerset") == 1) && entity.getHeldItem().nbt().getString("WeaponType") == "nin:drill";
        case "SHIELD":
            return entity.isSneaking() && (entity.getData("nin:dyn/powerset") == 1) || entity.isBookPlayer();
        case "BLADE":
            return !entity.isSneaking() && !entity.getData("fiskheroes:shield") && (entity.getData("nin:dyn/powerset") == 1);
    //powerset 2
        case "STEEL_TRANSFORM":
            return (entity.getData("nin:dyn/powerset") == 2);
        case "SLOW_MOTION":
            return (entity.getData("nin:dyn/powerset") == 2);
        case "CHARGED_PUNCH":
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