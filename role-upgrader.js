/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role-upgrader');
 * mod.thing == 'a thing'; // true
 */
const roleHarvester = require('role-harvester')

function run(creep) {
  if(!creep.memory.working) {
    roleHarvester.run(creep)
  } else {
    const controller = creep.room.controller

    const result = creep.upgradeController(controller)

    if(result === ERR_NOT_IN_RANGE) {
      creep.moveTo(controller)
    }
  }
}

module.exports = {
  run
};
