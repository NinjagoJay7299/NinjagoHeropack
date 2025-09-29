function init(hero) {

    hero.setName("Samurai X/Ninjago");

    hero.setTier(6);

    hero.setHelmet("Mask");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Shoes");

    hero.setDefaultScale(8.0);
    hero.addPowers("nin:sam_x", "nin:throw");
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.5, 0);
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.40, 1);
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.1, 1);

    
    hero.addKeyBind("SHIELD", "Bo Staff", 1);  
    hero.addKeyBind("CHARGED_BEAM", "Dragon Breath", 1);
    hero.addKeyBind("SUPER_SPEED", "Super speed", 2);
    hero.addKeyBind("ENERGY_PROJECTION", "Spinjitzu", 3); 
    hero.addKeyBind("DRAGON", "Summon Dragon", 3);
    hero.addKeyBind("SLOW_MOTION", "Ninja Senses", 4);
    hero.addKeyBind("BLADE", "Sacred Flute", 5);


    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("STAFF", staffProfile);
    hero.addAttributeProfile("DRAGON", dragonProfile);
    hero.setAttributeProfile((entity) => {
        if (entity.getData("fiskheroes:shield")) {
            return "STAFF";
        }
        if (entity.getData("nin:dyn/dragon_timer") == 1) {
            return "DRAGON";
        }
        return null;
    });
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("ENERGY", {
        "types": {
            "ENERGY": 1.0
        }
    });
    hero.addDamageProfile("STAFF", {"types": {"SHARP": 1.0}});
    hero.setTickHandler((entity, manager) => {

        manager.incrementData(entity, "nin:dyn/spinstaff", 8, entity.getData("fiskheroes:shield_blocking"));

        manager.incrementData(entity, "nin:dyn/blade", 8, entity.getData("fiskheroes:shield_timer"));

        manager.incrementData(entity, "nin:dyn/nonblade", 8, entity.getData("fiskheroes:blade_timer"));

        spinjitzuAttack(hero, entity, manager);

    });
    
}
function spinjitzuAttack(hero, entity, manager) {
    if (entity.getData("fiskheroes:energy_projection")) {
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), 2.5);
        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other) && entity.world().isUnobstructed(entity.pos().add(0, 1, 0), other.pos().add(0, 1, 0))) {
                other.hurtByAttacker(hero, "ENERGY", "%s was ripped to shreads by %s's spinjitzu", 50, entity);
            }
        }
    }
}
function staffProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 20.0, 0);

}
function dragonProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 20.0, 0);    
}
function getProfile(entity) {
    return entity.getData("fiskheroes:shield") ? "STAFF" : null;
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
    var leap = entity.getData("fiskheroes:energy_projection")
    var dragon = entity.getData("nin:dyn/dragon_timer") == 1
    var transformation = entity.getData("nin:dyn/dragoned");
    var dont = !entity.exists()
    switch (modifier.name()) {
        case "fiskheroes:metal_skin":
            return transformation;
        case "fiskheroes:energy_projection":
            return entity.isSprinting() && !dragon;
        case "fiskheroes:leaping":
            return leap;
        case "fiskheroes:controlled_flight":
            return dragon || entity.isInWater();
        case "fiskheroes:charged_beam":
            return dragon
        default:
            return true;
    }
}
function isKeyBindEnabled(entity, keyBind) {
    var dragon = entity.getData("nin:dyn/dragon_timer") == 1
    switch (keyBind) {
        case "ENERGY_PROJECTION":
            return entity.isSprinting() && !dragon;
        case "CHARGED_BEAM":
            return dragon
        case "SHIELD":
            return !dragon
        case "DRAGON":
            return !entity.isSprinting()
        default:
            return true;
        }
    
}
