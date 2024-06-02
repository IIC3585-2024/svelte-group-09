<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
</script>

<header class="flex p-3">
	<div class="w-1/4 pl-20">
		<a href="/">
			<img class="w-10 h-10" src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav class="w-2/4 content-center">
		<ul class="flex justify-evenly">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
		</ul>
	</nav>

	<div class="w-1/4 content-center">
		<p>Logged in as <strong>user</strong></p>
	</div>

</header>
