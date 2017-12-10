/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role-builder');
 * mod.thing == 'a thing'; // true
 */

const roleHarvester = require('role-harvester')

function run(creep) {
  if(creep.memory.working) {
    const site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
    const result = creep.build(site)

    if(result === ERR_NOT_IN_RANGE) creep.moveTo(site)
  } else {
    roleHarvester.run(creep)
  }
}

module.exports = {
  run
};
