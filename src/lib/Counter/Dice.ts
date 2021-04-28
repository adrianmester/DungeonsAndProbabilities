export class Dice {
    start: number;
    slots: number[];
    negative: boolean;

    chartData() {
        let labels: string[] = [];
        for (let i = 0; i < this.slots.length; i++) {
            labels[i] = (i + this.start).toString();
        }
        return {
            labels: labels,
            datasets: [
                {
                    values: this.slots.map(x => x * 100)
                }
            ]
        }
    }
}

export function NullDice(): Dice {
    var result = new Dice();
    result.start = 0
    result.slots = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    result.negative = false
    return result
}

export function disadvantage(d: Dice): Dice {
    return advdis(d, false)
}

export function advantage(d: Dice): Dice {
    return advdis(d, true)
}

function advdis(d: Dice, advantage: boolean): Dice {
    let fnc = advantage ? Math.max : Math.min;
    let result = new Dice()
    result.negative = d.negative;
    result.start = d.start
    result.slots = [];
    // initialize slots
    for (let i = 0; i < d.slots.length; i++) {
        result.slots[i] = 0
    }

    const value = 1 / (d.slots.length * d.slots.length);

    for (let i = 0; i < d.slots.length; i++) {
        for (let j = 0; j < d.slots.length; j++) {
            result.slots[fnc(i, j)] += value;
        }
    }

    return result;
}

export function addDice(d1: Dice, d2: Dice): Dice {
    let result = new Dice();
    let subtract = d1.negative != d2.negative;

    result.start = subtract ? (d1.start - d2.slots.length) : (d1.start + d2.start);
    result.negative = d1.negative;

    // if one of the dice is a constant, just return the other's
    // slots but this the start value summed up
    if (d2.slots.length == 1) {
        result.slots = d1.slots;
        return result
    }
    if (d1.slots.length == 1) {
        result.slots = d2.slots;
        return result
    }
    result.slots = [];
    // initialize slots
    for (let i = 0; i < (d1.slots.length + d2.slots.length); i++) {
        result.slots[i] = 0
    }

    for (let i = 0; i < d1.slots.length; i++) {
        for (let j = 0; j < d2.slots.length; j++) {
            const newIndex = subtract ? (i - j) : (i + j)
            result.slots[i + j] += (d1.slots[i] * d2.slots[j])
        }
    }

    return result;
}

export function NewDice(n: number, negative?: boolean): Dice {
    const value = 1 / n;
    let slots: number[] = [];
    for (let i = 0; i < n; i++) {
        slots[i] = value;
    }
    let d = new Dice();
    d.start = 1;
    d.slots = slots;
    d.negative = (negative === true);
    return d;
}

export function NewConstant(value: number, negative?: boolean): Dice {
    let d = new Dice();
    d.start = value;
    d.slots = [1];
    d.negative = negative === true;
    return d;
}

let diceRegex = /^(-?)(\d*)d(\d+)([ad]?)$/
let numberRegex = /^-?\d+$/

export function parseSingleDice(input: string): Dice {
    if (numberRegex.exec(input) !== null) {
        let numericValue = parseInt(input)
        return NewConstant(Math.abs(numericValue), (numericValue < 0))
    }

    let matches = diceRegex.exec(input);
    if (matches === null) {
        throw Error(`invalid dice value: ${input}`)
    }
    if (matches[3] === "") {
        throw Error(`invalid dice value: ${input}`)
    }
    let negative = (matches[1] === "-");
    let count = matches[2] == "" ? 1 : parseInt(matches[2]);
    let diceType = parseInt(matches[3]);
    let modifier = matches[4];

    if (count < 1) {
        throw Error(`invalid dice value: ${input}`)
    }
    if (count > 20) {
        throw Error('please use less than 20 dice')
    }
    if (diceType > 100) {
        throw Error('please chose a dice with at most 100 sides :)')
    }

    let result = NewDice(diceType)
    for (let i = 1; i < count; i++) {
        result = addDice(result, NewDice(diceType))
    }

    if (modifier == 'a') {
        result = advantage(result);
    } else {
        if (modifier == 'd') {
            result = disadvantage(result);
        }
    }

    result.negative = negative;

    return result;
}

export type parsedResult = {
    dice: Dice
    error: string
}

export function parseDiceInputString(input: string): parsedResult {
    try {
        let sanitizedInput = input.toLowerCase().replace(/\s+/g, "")
        if (sanitizedInput.endsWith('+') || sanitizedInput.endsWith('-')) {
            sanitizedInput = sanitizedInput.substring(0, sanitizedInput.length-1)
        }
        sanitizedInput = sanitizedInput.replace("-", "+-")
        const parts = sanitizedInput.split("+")
        let result = parseSingleDice(parts[0]);
        for (let i = 1; i < parts.length; i++) {
            result = addDice(result, parseSingleDice(parts[i]))
        }
        return {
            dice: result,
            error: null,
        };
    }
    catch(e: unknown) {
        return {
            dice: null,
            error: e.toString(),
        }
    }

}