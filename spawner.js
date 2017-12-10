/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawner');
 * mod.thing == 'a thing'; // true
 */

const minimums = {
}

const maximums = {
  harvester: 3,
  upgrader: 5,
  builder: 0
}

function run(spawn) {
  removeDeadCreepsFromMemory();
  calculateNumberBuildersNeeded();

  const currentCreeps = {
    upgrader: 0,
    harvester: 0,
    builder: 0
  }

  for(let name in Game.creeps) {
    const creep = Game.creeps[name]

    currentCreeps[creep.memory.role] += 1
  }

  if(currentCreeps.harvester === 0) {
    spawn.createCreep([WORK, CARRY, MOVE], null, {role: 'harvester'});
  } else if(currentCreeps.harvester < maximums.harvester) {
   createCreep(spawn, 'harvester');
  } else if(currentCreeps.upgrader < maximums.upgrader) {
   createCreep(spawn, 'upgrader');
  } else if(currentCreeps.builder < maximums.builder) {
   createCreep(spawn, 'builder');
  }
}

function removeDeadCreepsFromMemory() {
  for(let name in Memory.creeps) {
    if(!Game.creeps[name]) {
      console.log(`creep ${name} with role ${Memory.creeps[name].role} died :(`);
      delete Memory.creeps[name]
    }
  }
}

function calculateNumberBuildersNeeded() {
  for(let i in Game.constructionSites) {
    maximums.builder += 1;
  }
}

function createCreep(spawn, role) {
  spawn.createCreep(calculateBody(spawn), null, {role});
}

function calculateBody(spawn) {
  const {energyCapacityAvailable} = spawn.room;
  const build = [WORK, CARRY, MOVE];
  const costOfBuild = calculateCostOfBuild(build);
  const iterations = Math.floor(energyCapacityAvailable / costOfBuild);
  const body = [];

  build.forEach(part => addToBody(body, iterations, part));

  return body;
}

function calculateCostOfBuild(build) {
  return build.reduce((cost, part) => cost + BODYPART_COST[part], 0);
}

function addToBody(body, iterations, part) {
  for(let i = 0; i < iterations; i += 1) {
    body.push(part);
  }
}

module.exports = {
  run
};
