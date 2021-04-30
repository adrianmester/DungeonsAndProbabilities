<script lang="ts">
    import {NewDice, parseDiceInputString} from "./Dice";
    import Chart from 'svelte-frappe-charts';

    let diceRollInput = "1d20";
    let targetRollInput = "10";

    let chartOptions = {xIsSeries: 1}
    let chartColors = ["red", "green"]

    $: parseResult = parseDiceInputString(diceRollInput)
    $: dice = parseResult.dice;
    $: error = (diceRollInput ==="") ? "Input a dice roll (for example 2d20+5)" : parseResult.error;
    $: displayedDice = (dice === null) ? NewDice(20) : dice;
    $: chartContainerClass = (dice === null) ? "blurred" : "";
    $: targetChance = (dice == null) ? null : (dice.targetChance(parseInt(targetRollInput)) * 100).toPrecision(4)
</script>

<main>
    <section class="hero is-link">
        <div class="hero-body">
            <div class="container has-text-centered">
                <p class="title">
                    Dungeons and Probabilities
                </p>
            </div>
        </div>
    </section>
    <div class="container" style="margin-top:60px">
        <div class="field">
            <label class="label">Dice Roll</label>
            <div class="control has-icons-left">
                <input class="input" type="text" bind:value={diceRollInput}>
                <span class="icon is-small is-left">
                    <i class="fas fa-check"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Target Value</label>
            <div class="control">
                <input class="input" type="number" bind:value={targetRollInput}>
            </div>
            <p class="help is-success">This username is available</p>
        </div>
    </div>
    <div class="container chartContainer {chartContainerClass}">
        <Chart data={displayedDice.chartData(parseInt(targetRollInput))} type="bar" axisOptions={chartOptions} colors={chartColors}/>
    </div>
</main>

<style>
</style>