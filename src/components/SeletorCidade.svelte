<script>
	import { onDestroy } from 'svelte'
	import { estado, cidade } from '../stores/dimensionamento'

	async function fetchMunicipios(id) {
		$cidade = ''
		const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
		return await res.json()
	}

	let lista_cidade
	const unsubscribe = estado.subscribe(v => {
		lista_cidade = fetchMunicipios(v.id)
	})
	onDestroy(unsubscribe)
</script>

<style>
	select {
		font-size: 16px;
		width: 250px;
		font-weight: bold;
		padding: .6em 1.4em .5em .8em;
		margin: 0;
		border: 1px solid #aaa;
		box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
		border-radius: .5em;
		background-color: #A0A0A022;
	}

	/* CSS do triângulo lateral do select */
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
		background-repeat: no-repeat;
		background-position-x: 100%;
		background-position-y: 5px;
	}

	select:focus {
		outline: none;
	}
</style>

<h2>Muito bem. Agora precisamos saber o nome da sua cidade</h2>
<select bind:value="{$cidade}">
	<option value="">Cidade</option>
	{#await lista_cidade}
		<option value="">buscando...</option>
	{:then municipios}
		{#each municipios as municipio}
			<option value="{municipio.id}">{municipio.nome}</option>
		{/each}
	{:catch err}
		<option value="">Erro buscando municípios</option>
	{/await}
</select>
