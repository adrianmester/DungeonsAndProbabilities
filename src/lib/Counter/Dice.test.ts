import {NewConstant, NewDice, addDice, advantage, disadvantage} from "./Dice";

test('create d6 and d100', () => {
    let d6 = NewDice(6);
    expect(d6.slots.length).toBe(6);
    expect(d6.slots.reduce((a, b)=>a+b)).toBeCloseTo(1, 5)

    let d100 = NewDice(100);
    expect(d100.slots.length).toBe(100);
    expect(d100.slots.reduce((a, b)=>a+b)).toBeCloseTo(1, 5)
    expect(d100.start).toBe(1);
});

test('create constant', () => {
    let c4 = NewConstant(4);
    expect(c4.start).toBe(4);
    expect(c4.slots.length).toBe(1);
    expect(c4.slots[0]).toBe(1)
});

test('add two d6', () => {
    let d1 = NewDice(6);
    let d2 = NewDice(6);
    let s = addDice(d1, d2);

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
    let s = addDice(d6, c4);

    expect(s.start).toBe(5);
    expect(s.slots.reduce((a, b)=>a+b)).toBeCloseTo(1, 5);
    expect(s.slots[0]).toBeCloseTo(1/6, 5);
    expect(s.slots.length).toBe(6);
})

test('advantage d2', () => {
    let d2a = advantage(NewDice(2));

    expect(d2a.start).toBe(1)
    expect(d2a.slots.reduce((a, b)=>a+b)).toBeCloseTo(1, 5);
    expect(d2a.slots.length).toBe(2)
    expect(d2a.slots[0]).toBe(0.25)
    expect(d2a.slots[1]).toBe(0.75)
})

test('advantage d4', () => {
    let d4a = advantage(NewDice(4));

    expect(d4a.start).toBe(1)
    expect(d4a.slots.reduce((a, b)=>a+b)).toBeCloseTo(1, 5);
    expect(d4a.slots.length).toBe(4)
    expect(d4a.slots[0]).toBe(0.0625)
    expect(d4a.slots[1]).toBe(0.1875)
    expect(d4a.slots[2]).toBe(0.3125)
    expect(d4a.slots[3]).toBe(0.4375)
})

test('advantage d20', () => {
    let d20a = advantage(NewDice(20));

    expect(d20a.start).toBe(1)
    expect(d20a.slots.reduce((a, b)=>a+b)).toBeCloseTo(1, 5);
    expect(d20a.slots.length).toBe(20);
    expect(d20a.slots[0]).toBeCloseTo(0.0025, 4);
    expect(d20a.slots[1]).toBeCloseTo(0.0075, 4);
    expect(d20a.slots[2]).toBeCloseTo(0.0125, 4);
    expect(d20a.slots[18]).toBeCloseTo(0.0925, 4);
    expect(d20a.slots[19]).toBeCloseTo(0.0975, 4);
})

test('disadvantage d20', () => {
    let d20d = disadvantage(NewDice(20));

    expect(d20d.start).toBe(1)
    expect(d20d.slots.reduce((a, b)=>a+b)).toBeCloseTo(1, 5);
    expect(d20d.slots.length).toBe(20)
    expect(d20d.slots[19]).toBeCloseTo(0.00263, 2);
    expect(d20d.slots[18]).toBeCloseTo(0.00749, 2);
    expect(d20d.slots[1]).toBeCloseTo(0.09270, 2);
    expect(d20d.slots[0]).toBeCloseTo(0.09802, 2);
})
