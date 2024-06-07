<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
</script>

<style>
	.active {
			border-bottom: 2px solid #000;
	}
</style>

<header class="flex p-3">
	<div class="w-1/4 pl-20">
			<a href="/">
					<img class="w-10 h-10" src={logo} alt="SvelteKit" />
			</a>
	</div>

	<nav class="w-2/4 content-center">
			<ul class="flex justify-evenly">
					<li>
							<a class={$page.url.pathname === '/' ? 'active' : ''} href="/">Home</a>
					</li>
					<li>
							<a class={$page.url.pathname === '/favourite' ? 'active' : ''} href="/favourite">Favoritos</a>
					</li>
			</ul>
	</nav>

</header>