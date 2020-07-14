<script>
	import { fade } from 'svelte/transition'
	import dadosCliente from './stores/cliente'
	import { estado, cidade, concessionaria, preco } from './stores/dimensionamento'
	import Mapa from './components/mapa.svelte'
	import SeletorCidade from './components/SeletorCidade.svelte'
	import SeletorConcessionaria from './components/SeletorConcessionaria.svelte'
	import SeletorPreco from './components/SeletorPreco.svelte'
	import FormDadosCliente from './components/FormDadosCliente.svelte'
	import Resultado from './components/Resultado.svelte'

	const scrollIntoView = node => node.scrollIntoView({ behavior: 'smooth' })
	const centerInScreen = node => node.style.marginBottom = `${window.innerHeight / 2}px`
</script>

<style>
	.container {
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
	}

	.container > * {
		margin-bottom: 70px;
	}
</style>

<div class="container" use:centerInScreen>
	<div use:scrollIntoView>
		<h1>Olá! Bem-vindo(a) ao simulador do Canal Solar</h1>
		<p>Nós vamos te ajudar a economizar na sua conta de energia. Nossa ferramenta gratuita vai analisar sua conta de energia e dimensionar o sistema de energia solar ideal para sua residência</p>
		<h2 style="margin-top: 30px;">Em qual estado você mora?</h2>
		<Mapa on:click="{event => estado.set(event.detail)}" />
	</div>

	{#if $estado.id}
		<div in:fade use:scrollIntoView>
			<SeletorCidade />
		</div>
	{/if}

	{#if $cidade}
		<div in:fade use:scrollIntoView>
			<SeletorConcessionaria />
		</div>
	{/if}

	{#if $concessionaria}
		<div in:fade use:scrollIntoView>
			<SeletorPreco />
		</div>
	{/if}

	{#if $preco}
		<div in:fade="{{delay: 100}}" use:scrollIntoView>
			<FormDadosCliente />
		</div>
	{/if}

	{#if $dadosCliente.email}
	<div in:fade use:scrollIntoView>
		<Resultado />
	</div>
	{/if}
</div>
