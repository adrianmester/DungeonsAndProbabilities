<script lang="ts">
	import {parseDiceInputString, NullDice, NewDice} from "./Dice";
	import Chart from 'svelte-frappe-charts';

	let inputRoll = "1d20";

	let chartOptions = {xIsSeries: 1}

	$: parseResult = parseDiceInputString(inputRoll)
	$: dice = parseResult.dice;
	$: error = (inputRoll==="") ? "Input a dice roll (for example 2d20+5)" : parseResult.error;
	$: displayedDice = (dice === null) ? NewDice(20) : dice;
	$: chartContainerClass = (dice === null) ? "blurred" : "";

</script>

<div class="counter">
	<input type="text" bind:value={inputRoll}/>
	<p>&nbsp;
		{#if error!= null}
			{error}
		{/if}
	</p>
</div>

<div class="chartContainer {chartContainerClass}">
	<Chart data={displayedDice.chartData()} type="bar" axisOptions={chartOptions}/>
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
