<script lang="ts">
    import {NewDice, parseDiceInputString} from "./Dice";
    import Chart from 'svelte-frappe-charts';

    let diceRollInput = "1d20";
    let targetRollInput = "10";

    let chartOptions = {xIsSeries: 1}
    let chartColors = ["red", "green"]
    let tooltipOptions = {
        formatTooltipX: d => (d + '').toUpperCase(),
        formatTooltipY: d => d + ' pts',
    }
    let examples = [
        ["d20+5", "Normal attack roll +5"],
        ["d20d", "Attack with disadvantage"],
        ["d20a+1d4", "Attack roll with advantage and Bless"],
        ["5d20", "Just pretty"],
    ]

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
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label" for="rollInput">Dice Roll</label>
                    <div class="control">
                        <input id="rollInput" class="input" type="text" bind:value={diceRollInput}>
                    </div>
                </div>
                <div class="field">
                    <label class="label" for="targetInput">Target Value</label>
                    <div class="control">
                        <input id="targetInput" class="input" bind:value={targetRollInput}>
                    </div>
                </div>
                <p class="help is-danger">
                    {#if error != null}
                        {error}
                    {/if}
                </p>
            </div>
            <div class="column">
                <div class="title is-5">Examples</div>
                <div class="buttons">
                    {#each examples as example}
                        <button class="button is-link" on:click={()=>diceRollInput=example[0]}>{example[1]}</button>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <div class="container chartContainer {chartContainerClass}">
        <Chart
                data={displayedDice.chartData(parseInt(targetRollInput))}
                type="bar"
                axisOptions={chartOptions}
                tooltipOptions={tooltipOptions}
                colors={chartColors}/>
    </div>
    <div class="container chartContainer {chartContainerClass}">
        <Chart
                data={displayedDice.chartData(parseInt(targetRollInput), true)}
                type="percentage"
                height="150"
                colors={chartColors}/>
    </div>
</main>

<style>
    .container{
        padding: 0 20px;
    }
    .chartContainer {
        transition-property: filter;
        transition-duration: 0.5s;
    }
    .chartContainer.blurred {
        filter: blur(10px);
    }
</style>