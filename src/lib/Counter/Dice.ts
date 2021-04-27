export class Dice {
    start: number;
    slots: number[];

    chartData() {
        let labels: string[] = [];
        for (let i=0;i<this.slots.length;i++) {
            labels[i] = (i+this.start).toString();
        }
        return {
            labels: labels,
            datasets: [
                {
                    values: this.slots.map(x=>x*100)
                }
            ]
        }
    }
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
    result.start=d.start
    result.slots = [];
    // initialize slots
    for (let i=0;i<d.slots.length;i++) {
        result.slots[i] = 0
    }

    const value = 1/(d.slots.length*d.slots.length);

    for (let i=0;i<d.slots.length;i++) {
        for (let j=0;j<d.slots.length;j++) {
            result.slots[fnc(i, j)] += value;
        }
    }

    return result;
}

export function addDice(d1: Dice, d2: Dice): Dice {
    let result = new Dice();
    result.start = d1.start + d2.start;

    // if one of the dice is a constant, just return the other's
    // slots but this the start value summed up
    if (d2.slots.length==1) {
        result.slots = d1.slots;
        return result
    }
    if (d1.slots.length==1) {
        result.slots = d2.slots;
        return result
    }
    result.slots = [];
    // initialize slots
    for (let i=0;i<(d1.slots.length+d2.slots.length);i++) {
        result.slots[i] = 0
    }

    for (let i=0;i<d1.slots.length;i++) {
        for (let j=0;j<d2.slots.length;j++) {
            result.slots[i+j] += (d1.slots[i]*d2.slots[j])
        }
    }

    return result;
}

export function NewDice(n: number): Dice {
    const value = 1/n;
    let slots: number[] = [];
    for (let i=0; i<n; i++) {
        slots[i] = value;
    }
    let d = new Dice();
    d.start = 1;
    d.slots = slots;
    return d;
}

export function NewConstant(value: number): Dice {
    let d = new Dice();
    d.start = value;
    d.slots = [1];
    return d;
}