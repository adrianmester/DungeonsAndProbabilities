<script lang="ts">
	import {addDice, NewConstant, NewDice, advantage, disadvantage, parseDiceInputString, NullDice} from "./Dice";
	import Chart from 'svelte-frappe-charts';

	let inputRoll = "1d20";

	$: dice = parseDiceInputString(inputRoll).dice;
	$: error = parseDiceInputString(inputRoll).error;
	$: displayedDice = (dice === null) ? NullDice() : dice;

</script>

<div class="counter">
	<input type="text" bind:value={inputRoll}/>
	{#if error!= null}
    <p>{error}</p>
	{/if}
</div>

<Chart data={displayedDice.chartData()} type="bar" />

<style>
	.counter {
	}
</style>
