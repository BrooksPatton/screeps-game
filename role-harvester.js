/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role-harvester');
 * mod.thing == 'a thing'; // true
 */

 function run(creep, spawn) {
   if(creep.memory.working) {
     const building = determineDeliveryDestination(creep);
     const result = creep.transfer(building, RESOURCE_ENERGY);

     if(result === ERR_NOT_IN_RANGE) creep.moveTo(building);
   } else {
     const source = creep.pos.findClosestByPath(FIND_SOURCES)

     const result = creep.harvest(source)

     if(result === ERR_NOT_IN_RANGE) creep.moveTo(source)
   }
 }

 function determineDeliveryDestination(creep) {
   return creep.pos.findClosestByPath(FIND_STRUCTURES, {
     filter: structure => structure.energy < structure.energyCapacity
    });
 }

module.exports = {
  run
};
