function solve() {
    'use strict';

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };

    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }


        set name(value) {
            if (typeof value !== "string") {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            } else if (value.length < 2 || value.length > 20) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }
            this._name = value;
        }

        get name() {
            return this._name;
        }

        set manaCost(value) {
            if (value <= 0) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
            this._manaCost = value;
        }

        get manaCost() {
            return this._manaCost;
        }

        set effect(value) {
            if (typeof value !== "function" || value.length !== 1) {
                throw new Error(ERROR_MESSAGES.INVALID_EFFECT);
            }
            this._effect = value;
        }

        get effect() {
            return this._effect;
        }
    }

    class Unit {
        constructor(name, alignment) {
            this.name = name;
            this.alignment = alignment;
        }

        set name(value) {
            if (typeof value !== "string") {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            } else if (value.length < 2 || value.length > 20) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }
            this._name = value;
        }

        get name() {
            return this._name;
        }

        set alignment(value) {
            if (value.toLowerCase() !== "good" && value.toLowerCase() !== "neutral" && value.toLowerCase() !== "evil") {
                throw new Error("Alignment must be good, neutral or evil!");
            }
            this._alignment = value;
        }

        get alignment() {
            return this._alignment;
        }
    }

    class ArmyUnit extends Unit {
        constructor(name, alignment, speed, count, damage, health) {
            super(name, alignment);
            this.id = 0;
            this.speed = speed;
            this.count = count;
            this.damage = damage;
            this.health = health;
        }

        set id(value) {
            this._id = value;
        }

        get id() {
            return this._id;
        }

        set damage(value) {
            if (value < 0 || value > 100) {
                throw new Error(ERROR_MESSAGES.INVALID_DAMAGE);
            }
            this._damage = value;
        }

        get damage() {
            return this._damage;
        }

        set health(value) {
            if (value < 0 || value > 200) {
                throw new Error(ERROR_MESSAGES.INVALID_HEALTH);
            }
            this._health = value;
        }

        get health() {
            return this._health;
        }

        set count(value) {
            if (value <= 0) {
                throw new Error(ERROR_MESSAGES.INVALID_COUNT);
            }
            this._count = value;
        }

        get count() {
            return this._count;
        }

        set speed(value) {
            if (value <= 0 || value >= 100) {
                throw new Error(ERROR_MESSAGES.INVALID_SPEED);
            }
            this._speed = value;
        }

        get speed() {
            return this._speed;
        }
    }

    class Commander extends Unit {
        constructor(name, alignment, mana) {
            super(name, alignment);
            this.mana = mana;
            this.spellbook = [];
            this.army = [];
        }

        set mana(value) {
            if (value <= 0) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
            this._mana = value;
        }

        get mana() {
            return this._mana;
        }

        set spellbook(value) {
            this._spellbook = value;
        }

        get spellbook() {
            return this._spellbook;
        }

        set army(value) {
            this._army = value;
        }

        get army() {
            return this._army;
        }
    }

    class Battlemanager {

        constructor() {
            this.commandersCollection = [];
        }

        set commandersCollection(value) {
            this._commandersCollection = value;
        }

        get commandersCollection() {
            return this._commandersCollection;
        }


        getCommander(name, alignment, mana) {
            let commanderCreation = new Commander(name, alignment, mana);

            this.commandersCollection.push(commanderCreation);

            return commanderCreation;
        }

        getArmyUnit(options) {
            let armyUnitCreation = new ArmyUnit(options.name, options.alignment, options.speed,
                options.count, options.damage, options.health);

            return armyUnitCreation;
        }

        getSpell(name, manaCost, effect) {
            let spellCreation = new Spell(name, manaCost, effect);

            return spellCreation;
        }

        addCommanders(...commandersArray) {
            for (let i = 0; i < commandersArray[0].length; i += 1) {
                this.commandersCollection.push(new Commander(commandersArray[0][i].name, commandersArray[0][i].alignment, commandersArray[0][i].mana));
            }

            return this;
        }

        addArmyUnitTo(commanderName, armyUnit) {
            for (let i = 0; i < this.commandersCollection; i += 1) {
                if (this.commandersCollection[i].name === commanderName) {
                    this.commandersCollection[i].army.push(armyUnit);
                    break;
                }
            }

            return this;
        }

        addSpellsTo(commanderName, ...spellsArray) {
            for (let i = 0; i < this.commandersCollection; i += 1) {
                if (this.commandersCollection[i].name === commanderName) {
                    for (let j = 0; j < spellsArray.length; j += 1) {
                        this.commandersCollection[i].spellbook.push(spellsArray[j]);
                    }
                    break;
                }
            }

            return this;
        }

        findCommanders(query) {
            let matchingCommanders = [];

            for (let i = 0; i < this.commandersCollection.length; i += 1) {
                if (query.name && query.alignment) {
                    if (this.commandersCollection[i].name === query.name && this.commandersCollection[i].alignment === query.alignment) {
                        matchingCommanders.push(this.commandersCollection[i]);
                    }
                }
                else if (query.name) {
                    if (this.commandersCollection[i].name === query.name) {
                        matchingCommanders.push(this.commandersCollection[i]);
                    }
                }
                else if (query.alignment) {
                    if (this.commandersCollection[i].alignment === query.alignment) {
                        matchingCommanders.push(this.commandersCollection[i]);
                    }
                }
            }

            return matchingCommanders;
        }

        findArmyUnitById(id) {
            let matchingArmyUnit;

            return matchingArmyUnit;
        }

        findArmyUnits(query) {
            let matchingArmyUnits = [];

            return matchingArmyUnits;
        }

        spellcast(casterName, spellName, targetUnitId) {


            return this;
        }

        battle(attacker, defender) {


            return this;
        }
    }


    const battlemanager = new Battlemanager();

    // your implementation goes here
    //
    // let commanderCuki = battlemanager.getCommander("Cuki","Evil", 20);
    // console.log(battlemanager.commandersCollection);
    // battlemanager.addCommanders([
    //     { name: 'Tinky Winky', alignment: 'good', mana: 5 },
    //     { name: 'Gypsy', alignment: 'good', mana: 10 },
    //     { name: 'Bill Gates', alignment: 'evil', mana: 5 },
    // ]);
    //
    //
    // console.log(battlemanager.commandersCollection);
    // delete


    return battlemanager;
}
solve();
module.exports = solve;