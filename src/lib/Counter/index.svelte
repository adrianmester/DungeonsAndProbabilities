<script lang="ts">
	import {addDice, NewConstant, NewDice, advantage, disadvantage} from "./Dice";
	import Chart from 'svelte-frappe-charts';

	let inputRoll = "6";

	$: dice = addDice(
			disadvantage(NewDice(20)),
			NewDice(4)
	);
</script>

<div class="counter">
	<input type="text" bind:value={inputRoll}/>
</div>

<Chart data={dice.chartData()} type="bar" />

<style>
	.counter {
	}
</style>
