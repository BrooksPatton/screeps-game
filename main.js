const roleHarvester = require('role-harvester')
const spawner = require('spawner')
const roleUpgrader = require('role-upgrader')
const roleBuilder = require('role-builder')

module.exports.loop = function () {
  const spawn = Game.spawns.Spawn1

  for(let name in Game.creeps) {
    const creep = Game.creeps[name]
    const role = creep.memory.role

    if(role === 'harvester') {
      roleHarvester.run(creep, spawn)
    } else if(role === 'upgrader') {
      roleUpgrader.run(creep)
    } else if(role === 'builder') {
      roleBuilder.run(creep)
    }
  }

  spawner.run(spawn)
}
