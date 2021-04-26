<script lang="ts">
	import { NewDice} from "./Dice";
	import Chart from 'svelte-frappe-charts';

	let inputRoll = "6";

	$: dice = NewDice(parseInt(inputRoll));
</script>

<div class="counter">
	<input type="text" bind:value={inputRoll}/>
</div>

<Chart data={dice.chartData()} type="bar" />

<style>
	.counter {
	}
</style>
