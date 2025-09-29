function toss(entity) {
    return entity.getHeldItem().nbt().getString("WeaponType") == "nin:shuriken" && entity.getData("nin:dyn/powerset") == 1;
}
function spin(entity) {
    return entity.getData("nin:dyn/powerset") == 2;
}
function init(hero) {

    hero.setName("Zane/Ninjago");
    hero.setVersion("Basic");
    hero.setTier(6);

    hero.setHelmet("Mask");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Shoes");

    hero.addPowers("nin:zane");
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.5, 0);
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.40, 1);
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.1, 1);
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:nin:shuriken, AttributeModifiers:[{Operation:0,UUIDLeast:1,UUIDMost:1,Amount:40,AttributeName:generic.attackDamage,Name:Attack Damage}]}", true, item=> item.nbt().getString("WeaponType") == "nin:shuriken");

    hero.addKeyBindFunc("Func_POWERSET_NEXT", nextpowersetKey, "Next Powerset", 5)
    hero.addKeyBindFunc("Func_POWERSET_PREV", prevpowersetKey, "Prev Powerset", 5)

    //powerset1 = 1
    hero.addKeyBind("ENERGY_PROJECTION", "Ice Beam", 1);
    hero.addKeyBind("BLADE", "Shurikens Of Ice", 2);
    hero.addKeyBind("CHARGE_ICE", "key.chargeIce", 3);
    hero.addKeyBindFunc("TOSS", shurikenKey, "Throw Shuriken", 4);
    hero.addKeyBind("CHARGED_BEAM", "Throw Shuriken", 4);
    // hero.addKeyBind("TOSS", "Throw Shuriken", 4)
    // hero.addKeyBind("CHARGED_BEAM", "Spinjitzu", 4);
    //powerset2 = 2
    hero.addKeyBind("SUPER_SPEED", "Super Speed", 1);
    hero.addKeyBindFunc("SPEED", speedKey, "Super Speed", 1);
    hero.addKeyBind("STEEL_TRANSFORM", "Airjitzu", 2);
    hero.addKeyBindFunc("SPINJITZU", spinjitzuKey, "Spinjitzu", 4);
    // hero.addKeyBind("SPIN", "Spinjitzu", 4);
    hero.addKeyBind("SLOW_MOTION", "Ninja Senses", 3);


    

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
    hero.addDamageProfile("COLD", {
        "types": {
            "COLD": 1.0
        }
    });
    hero.setTickHandler((entity, manager) => {
        spinvalue = entity.getData("nin:dyn/spin_timer");
        startvalue = entity.getData("nin:dyn/spin_start_timer");
        // shoot_timer = entity.getData("fiskheroes:beam_shooting_timer");
        if (entity.getData("nin:dyn/spinning")) {
            manager.setData(entity, "fiskheroes:speeding", true);
            if (entity.getData("nin:dyn/spin_start_timer") < 2) {
                manager.setData(entity, "nin:dyn/spin_start_timer", startvalue + 0.01);
            }
            if (entity.getData("nin:dyn/spin_start_timer") >= .27) {
                manager.setData(entity, "nin:dyn/spin_timer", spinvalue + 0.005);
                manager.setData(entity, "nin:dyn/spinning_1", true);
                manager.setData(entity, "fiskheroes:energy_projection", true);
                // if (entity.getData("nin:dyn/spin_timer") > .25) {
                //     manager.setData(entity, "fiskheroes:beam_shooting_timer", shoot_timer + 0.1);        
                // }
                if (entity.getData("nin:dyn/spin_timer") >= 2) {
                    manager.setData(entity, "nin:dyn/spin_timer", (2 + (.5)));
                }
                else if (entity.getData("nin:dyn/spin_timer") > (2 + (.5))) {
                    manager.setData(entity, "nin:dyn/spin_timer", (2 + (.5)));
                }
            }
        }
        else if (entity.getData("nin:dyn/spin_start_timer") < 0.20 && !entity.getData("nin:dyn/speedkey")) {
            manager.setData(entity, "fiskheroes:speeding", false);
            if (!entity.getData("fiskheroes:energy_projection")) {
                manager.setData(entity, "fiskheroes:energy_projection", false);
            }
        }
        else if (entity.getData("nin:dyn/spin_start_timer") < 0.20 && entity.getData("nin:dyn/speedkey")) {
            manager.setData(entity, "fiskheroes:speeding", true);
            if (!entity.getData("fiskheroes:energy_projection")) {
                manager.setData(entity, "fiskheroes:energy_projection", false);
            }
        }
        if (!entity.getData("nin:dyn/spinning")) {
            manager.setData(entity, "nin:dyn/spin_start_timer", 0);
            manager.setData(entity, "nin:dyn/spin_timer", 0);
            manager.setData(entity, "nin:dyn/spinning_1", false);
        }

        // spinvalue = entity.getData("nin:dyn/spin_timer");
        // startvalue = entity.getData("nin:dyn/spin_start_timer");
        // if (entity.getData("fiskheroes:beam_charge")){
        //     manager.setData(entity, "nin:dyn/spin_start_timer", startvalue + 0.1);
        // }
        // else if (entity.getData("fiskheroes:beam_charge") == 1) {
        //     manager.setData(entity, "nin:dyn/spin_timer", spinvalue + 0.1);
        // }
        // else if (entity.getData("fiskheroes:beam_charge") == 0) {
        //     manager.setData(entity, "nin:dyn/spin_timer", 0);
        // }
        // if (entity.getData("nin:dyn/spin_timer") > 2) {
        //     manager.setData(entity, "nin:dyn/spin_timer", 2);
        // }
        manager.incrementData(entity, "nin:dyn/blade", 8, entity.getData("fiskheroes:blade_timer"));

        if (entity.getData("nin:dyn/spinjitzukey") && entity.getData("nin:dyn/powerset") == 2) {
            // manager.setDataWithNotify(entity, "nin:dyn/spinning", true);
            manager.setData(entity, 'fiskheroes:tentacle_lift', true);
        }
        if (entity.getData("nin:dyn/powerset") != 2) {
            manager.setDataWithNotify(entity, "nin:dyn/spinning", false);
        }
        var value = entity.getData("nin:dyn/climb");
        if (entity.getData('fiskheroes:tentacle_lift')) {
            if (entity.motionY() > 0.05 || entity.isSneaking() && entity.world().getBlock(entity.pos().add(0, -1, 0)) == 'minecraft:air') {
                manager.setData(entity, "nin:dyn/climb", value + 0.1);
            }
        } else if (!entity.getData('fiskheroes:tentacle_lift') && value != 0) {
            manager.setData(entity, "nin:dyn/climb", 0);
            manager.setData(entity, "nin:dyn/climb_bool", false);
        }
        if (entity.getData("fiskheroes:tentacles") == null && entity.getData('fiskheroes:tentacle_lift')) {
            manager.setData(entity, "fiskheroes:tentacle_lift", false);
        } else if (entity.getData("fiskheroes:tentacles") != null && !entity.getData('fiskheroes:tentacle_lift') || entity.getData("nin:dyn/spinning")) {
            manager.setData(entity, "fiskheroes:tentacle_lift", true);
        }
        if (entity.getData("nin:dyn/climb") > 0) {
            manager.setData(entity, "nin:dyn/fall_damage_immunity_cooldown", 1);
        }
        //manager.incrementData(entity, "nin:dyn/throw_timer", 30, entity.getData("fiskheroes:beam_shooting_timer"));
        spinjitzuAttack(hero, entity, manager);
        if (entity.isInWater()) {
            manager.setData(entity, "fiskheroes:flying", true);
        };
    });
}
function spinjitzuAttack(hero, entity, manager) {
    if (spin(entity) && entity.getData("nin:dyn/spin_timer") > 0) {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 2.5);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "COLD", "%s was ripped to shreads by %s's spinjitzu", 1, entity);
            }
        }
    }
    else if (spin(entity) && entity.getData("nin:dyn/spin_timer") > 0 && entity.getHeldItem().nbt().getString("WeaponType") == "nin:shuriken") {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 2.5);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "COLD", "%s was turned into a popsicle by %s's spinjitzu", 3, entity);
            }
        }
    }
    //manager.incrementData(entity, "nin:dyn/lightning_pulse_shooting_timer", 999, entity.getData("nin:dyn/lightning_pulse_timer") == 1, false);

    /*if (entity.getData("nin:dyn/lightning_pulse_shooting_timer") == 1 || !entity.getData("nin:dyn/lightning_pulse")) {
        manager.setInterpolatedData(entity, "nin:dyn/lightning_pulse_shooting_timer", 0);
        manager.setDataWithNotify(entity, "nin:dyn/lightning_pulse", false);
    }*/
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
function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 12.0, 0);
}

    function isModifierEnabled(entity, modifier) {
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
    var leap = entity.getData("nin:dyn/spinning_1") || entity.getData("nin:dyn/spinning");
        switch (modifier.name()) {
        case "fiskheroes:blade":
            return entity.getData("fiskheroes:cryo_charge") == 1 || entity.getData("fiskheroes:blade");
        case "fiskheroes:cryoball":
            return entity.getData("fiskheroes:energy_charge") == 0 && !entity.getData("fiskheroes:energy_projection") && entity.getData("fiskheroes:cryo_charge") == 1;
        case "fiskheroes:icicles":
            return entity.getData("fiskheroes:energy_charge") == 0 && !entity.getData("fiskheroes:energy_projection") && entity.getData("fiskheroes:cryo_charge") < 1;
        // case "fiskheroes:charged_beam":
        //     return entity.getData("nin:dyn/powerset") == 1 && entity.getHeldItem().nbt().getString("WeaponType") == "nin:shuriken";
        case "fiskheroes:flight":
            return trans;
        case "fiskheroes:leaping":
            return leap;
        case "fiskheroes:controlled_flight":
            return entity.isInWater();
        case "fiskheroes:energy_projection":
            switch (modifier.id()) {
                case "normal":
                    return entity.getData("nin:dyn/powerset") == 1;
                case "forwards":
                    return entity.getData("nin:dyn/powerset") == 2 && modifier.id() == "forwards" == (Math.random() > 0.5);
                case "backwards":
                    return entity.getData("nin:dyn/powerset") == 2 && modifier.id() == "backwards" == (Math.random() < 0.5);
            };
        
        // case "fiskheroes:tentacles":
        //     if (entity.world().getBlock(entity.pos().add(0, YDif, 0.5)) == 'minecraft:air'
        //             && entity.world().getBlock(entity.pos().add(0, YDif, -0.5)) == 'minecraft:air'
        //             && entity.world().getBlock(entity.pos().add(0.5, YDif, 0)) == 'minecraft:air'
        //             && entity.world().getBlock(entity.pos().add(-0.5, YDif, 0)) == 'minecraft:air' &&

        //         entity.world().getBlock(entity.pos().add(0, YDif + 0, 1.5)) == 'minecraft:air'
        //             && entity.world().getBlock(entity.pos().add(0, YDif + 0, -2.0)) == 'minecraft:air'
        //             && entity.world().getBlock(entity.pos().add(2.0, YDif + 0, 0)) == 'minecraft:air'
        //             && entity.world().getBlock(entity.pos().add(-2.0, YDif + 0, 0)) == 'minecraft:air'

        //             || entity.isInWater() || !entity.getData("fiskheroes:moving")) {
        //         return false
        //     };
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
        case "ENERGY_PROJECTION":
            return (entity.getData("nin:dyn/powerset") == 1);
        case "BLADE":
            return (entity.getData("nin:dyn/powerset") == 1) && entity.getData("fiskheroes:cryo_charge") == 1 || (entity.getData("nin:dyn/powerset") == 1) && entity.getData("fiskheroes:blade");
        case "CHARGE_ICE":
            return (entity.getData("nin:dyn/powerset") == 1);
    //powerset 2
        case "SLOW_MOTION":
            return (entity.getData("nin:dyn/powerset") == 2);
        case "STEEL_TRANSFORM":
            return (entity.getData("nin:dyn/powerset") == 2);
        case "SUPER_SPEED":
            return (entity.getData("nin:dyn/powerset") == 2);
        case "SPEED":
            return (entity.getData("nin:dyn/powerset") == 2);
        case "CHARGED_BEAM":
            return entity.getData("nin:dyn/powerset") == 1 && entity.getHeldItem().nbt().getString("WeaponType") == "nin:shuriken";
        case "TOSS":
            return entity.getData("nin:dyn/powerset") == 1 && entity.getHeldItem().nbt().getString("WeaponType") == "nin:shuriken";
        case "SPINJITZU":
            return entity.getData("nin:dyn/powerset") == 2;
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
//shurikenKey
function spinjitzuKey(entity, manager) {
    // spinvalue = entity.getData("nin:dyn/spin_timer");
    // startvalue = entity.getData("nin:dyn/spin_start_timer");
    // manager.setData(entity, "nin:dyn/spin_start_timer", startvalue + 0.1);
    // if (entity.getData("nin:dyn/spin_start_timer") >= 2) {
    //     manager.setData(entity, "nin:dyn/spin_timer", spinvalue + 0.1);
    //     if (entity.getData("nin:dyn/spin_timer") > .25) {
    //         manager.setData(entity, "fiskheroes:energy_projection", true);        
    //     }
    // }
    manager.setData(entity, "nin:dyn/shurikenkey", false);
    if (entity.getData("nin:dyn/spinjitzukey")) {
        manager.setData(entity, "nin:dyn/spinjitzukey", false);
    }
    else if (entity.getData("nin:dyn/spinjitzukey") == false) {
        manager.setData(entity, "nin:dyn/spinjitzukey", true);
    }
    return true;
}
function shurikenKey(entity, manager) {
    // spinvalue = entity.getData("nin:dyn/spin_timer");
    // startvalue = entity.getData("nin:dyn/spin_start_timer");
    // manager.setData(entity, "nin:dyn/spin_start_timer", startvalue + 0.1);
    // if (entity.getData("nin:dyn/spin_start_timer") > 2) {
    //     manager.setData(entity, "nin:dyn/spin_timer", spinvalue + 0.1);
    //     if (entity.getData("nin:dyn/spin_timer") > .25) {
    //         manager.setData(entity, "fiskheroes:energy_projection", true);        
    //     }
    // }
    // manager.setData(entity, "fiskheroes:beam_charging", true);
    // manager.setData(entity, "nin:dyn/shurikenkey", true);
    // manager.setData(entity, "nin:dyn/spinjitzukey", false);
    return true;
}
function speedKey(entity, manager) {
    // spinvalue = entity.getData("nin:dyn/spin_timer");
    // startvalue = entity.getData("nin:dyn/spin_start_timer");
    // manager.setData(entity, "nin:dyn/spin_start_timer", startvalue + 0.1);
    // if (entity.getData("nin:dyn/spin_start_timer") >= 2) {
    //     manager.setData(entity, "nin:dyn/spin_timer", spinvalue + 0.1);
    //     if (entity.getData("nin:dyn/spin_timer") > .25) {
    //         manager.setData(entity, "fiskheroes:energy_projection", true);        
    //     }
    // }
    if (entity.getData("nin:dyn/speedkey")) {
        manager.setData(entity, "nin:dyn/speedkey", false);
    }
    else if (entity.getData("nin:dyn/speedkey") == false) {
        manager.setData(entity, "nin:dyn/speedkey", true);
    }
    return true;
}
