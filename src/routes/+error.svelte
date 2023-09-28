<script>
    import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status || "404"} Error</title>
</svelte:head>

<div class="hero min-h-screen">
    <div class="hero-content flex-col">
        <h1 class="mb-6 text-7xl tracking-tight font-extrabold lg:text-9xl">{$page.status || "404"}</h1>
        <p class="mb-6 text-2xl tracking-tight font-bold">{$page.error.message || "Page not found"}</p> 
    
        <a href="{$page.error.link || "/"}" class="btn btn-primary">{$page.error.buttonText || "Back to Homepage"}</a>
    </div>
</div>