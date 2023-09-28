<script>
    import "../app.css";

    export let data;

    let user;
    let navBarToggle = false;
    $: user = data.user;
</script>

<main class="min-h-screen flex flex-col">
    <nav class="{navBarToggle ? "bg-white" : "bg-white/50"} duration-500 w-full z-50 border-b border-gray-200 backdrop-blur-md h-16 transition-all">
        <div class="flex flex-row justify-between mx-auto max-w-4xl items-center h-full px-2 gap-2">
            <a href="/"><h3 class="max-md:text-xl select-none">Stephane Paillaugue</h3></a>

            {#if user}
                <div class="max-lg:hidden flex flex-row gap-4 items-center justify-center">
                    <a href="/dashboard/book" class="button-primary button-sm group">
                        <span class="transition-all duration-200 group-hover:-translate-y-full">
                            Prendre rendez-vous
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all duration-200 group-hover:top-1/2 group-hover:-translate-y-1/2 absolute top-full left-1/2 -translate-x-1/2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                        </svg>
                    </a>
                    <a href="/dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </a>
                </div>
            {:else}
                <a href="/auth" class="link max-lg:hidden">Se connecter</a>
            {/if}
            <button class="lg:hidden mr-4 text-gray-500 w-10 h-10 relative focus:outline-none {navBarToggle && "z-50"}" on:click={() => {navBarToggle = !navBarToggle}}>
                <span class="sr-only">Open main menu</span>
                <div class="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                    <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out {navBarToggle ? "rotate-45" : "-translate-y-1.5"}"></span>
                    <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current transform transition duration-500 ease-in-out {navBarToggle ? "opacity-0" : "opacity-100"}"></span>
                    <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out {navBarToggle ? "-rotate-45" : "translate-y-1.5"}"></span>
                </div>
            </button>
        </div>
    </nav>
    
    <div class="fixed top-16 left-0 bg-white/50 backdrop-blur-lg w-full h-full z-40 transition-all ease-in-out duration-500 p-2 text-xl font-semibold {!navBarToggle && "-translate-x-full"}">
        <div class="h-full w-full relative flex flex-col items-center justify-center gap-8">
            {#if user}
                <a href="/" on:click={() => {navBarToggle = false;}} class="link">
                    Accueil
                </a>
                <a href="/dashboard/book" on:click={() => {navBarToggle = false;}} class="link">
                    Prendre rendez-vous
                </a>
                <a href="/dashboard" on:click={() => {navBarToggle = false;}} class="link">
                    Mon compte
                </a>
            {:else}
                <a href="/auth" on:click={() => {navBarToggle = false;}} class="link">
                    Se connecter
                </a>
            {/if}
        </div>
    </div>

    <slot />
</main>