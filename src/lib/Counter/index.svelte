<script lang="ts">
	import {parseDiceInputString, NullDice, NewDice} from "./Dice";
	import Chart from 'svelte-frappe-charts';

	let inputRoll = "1d20";
	let targetRoll = "10";

	let chartOptions = {xIsSeries: 1}
	let chartColors = ["red", "green"]

	$: parseResult = parseDiceInputString(inputRoll)
	$: dice = parseResult.dice;
	$: error = (inputRoll==="") ? "Input a dice roll (for example 2d20+5)" : parseResult.error;
	$: displayedDice = (dice === null) ? NewDice(20) : dice;
	$: chartContainerClass = (dice === null) ? "blurred" : "";
	$: targetChance = (dice == null) ? null : (dice.targetChance(parseInt(targetRoll)) * 100).toPrecision(4)

</script>

<div class="counter">
	<input type="text" bind:value={inputRoll}/>
	<input type="number" bind:value={targetRoll}/>
	{targetChance}%
	<p>&nbsp;
		{#if error!= null}
			{error}
		{/if}
	</p>
</div>

<div class="chartContainer {chartContainerClass}">
	<Chart data={displayedDice.chartData(parseInt(targetRoll))} type="bar" axisOptions={chartOptions} colors={chartColors}/>
</div>

<style>
    .chartContainer {
		transition-property: filter;
		transition-duration: 0.5s;
	}
	.chartContainer.blurred {
		filter: blur(10px);
	}
</style>
