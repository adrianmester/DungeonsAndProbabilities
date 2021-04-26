import {NewConstant, NewDice} from "./Dice";

test('creates d6 and d100', () => {
    let d6 = NewDice(6);
    expect(d6.slots.length).toBe(6);
    expect(d6.slots.reduce((a, b)=>a+b)).toBeCloseTo(1, 5)

    let d100 = NewDice(100);
    expect(d100.slots.length).toBe(100);
    expect(d100.slots.reduce((a, b)=>a+b)).toBeCloseTo(1, 5)
    expect(d100.start).toBe(1);
});

test('creates constant', () => {
    let c4 = NewConstant(4);
    expect(c4.start).toBe(4);
    expect(c4.slots.length).toBe(1);
    expect(c4.slots[0]).toBe(1)
});

test('add two d6', () => {
    let d1 = NewDice(6);
    let d2 = NewDice(6);
    let s = d1.addDice(d2);

    expect(s.start).toBe(2);
    expect(s.slots.length).toBe(12);
    expect(s.slots.reduce((a, b)=>a+b)).toBeCloseTo(1, 5);
    expect(s.slots[0]*100).toBeCloseTo(2.78);
    expect(s.slots[1]*100).toBeCloseTo(5.56);
    expect(s.slots[2]*100).toBeCloseTo(8.33);
    expect(s.slots[3]*100).toBeCloseTo(11.11);
    expect(s.slots[4]*100).toBeCloseTo(13.89);
    expect(s.slots[5]*100).toBeCloseTo(16.67);
})

test('add a constant to a dice', () => {
    let d6 = NewDice(6);
    let c4 = NewConstant(4);
    let s = d6.addDice(c4);

    expect(s.start).toBe(5);
    expect(s.slots.reduce((a, b)=>a+b)).toBeCloseTo(1, 5);
    expect(s.slots[0]).toBeCloseTo(1/6, 5);
    expect(s.slots.length).toBe(6);
})