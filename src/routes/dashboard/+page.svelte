<script>
    import { enhance } from '$app/forms';
    import { formatDate, formatDuration, formatPrice } from "$lib/helpers";

    export let data;
    export let form;

    const { user, bookings } = data;

    const pastBookings = bookings.filter(booking => booking.start < new Date);
    const upcomingBookings = bookings.filter(booking => booking.start > new Date);
    let pageIndex = 0;
    let logOutModal = false;
</script>

<div class="md:hidden w-full grid grid-cols-2 bg-white border-b border-neutral-200">
    <button on:click={() => {pageIndex = 0}} class="py-4 border-b-2 no-scale {pageIndex === 0 ? "font-semibold border-neutral-800" : "border-transparent"}">Mes rendez-vous</button>
    <button on:click={() => {pageIndex = 1}} class="py-4 border-b-2 no-scale {pageIndex === 1 ? "font-semibold border-neutral-800" : "border-transparent"}">Mes informations</button>
</div>
<div class="w-full flex md:flex-row flex-col gap-10 max-w-screen-xl mx-auto lg:p-6 p-2 mt-5">
    <div class="card max-w-sm w-full h-fit max-md:hidden">
        <h4 class="mb-8">Mon compte</h4>

        <button class="block no-scale" on:click={() => {pageIndex = 0}}>
            <h5 class="{pageIndex === 0 &&"font-semibold"}">Mes rendez-vous</h5>
        </button>
        <button class="mt-4 block no-scale" on:click={() => {pageIndex = 1}}>
            <h5 class="{pageIndex === 1 &&"font-semibold"}">Mes informations</h5>
        </button>
    </div>

    {#if pageIndex === 0}
        <div class="card w-full">
            {#if upcomingBookings.length > 0}
                <h4 class="mb-4">Mes prochains rendez-vous</h4>
                {#each upcomingBookings as booking}
                    <div class="rounded-lg w-full bg-neutral-100 border border-neutral-300 p-6 flex md:flex-row flex-col items-center gap-6">
                        <a href="/dashboard/book">
                            <img src="https://res.cloudinary.com/planity/image/upload/c_thumb,g_center,h_128,w_128,f_auto/oxuvifkqajtuohqeswc7" alt="" class="rounded-lg">
                        </a>
                        <div class="flex flex-col">
                            <h6 class="font-medium">{formatDate(booking.start)}</h6>
                            <ul class="text-neutral-500 mt-1 space-y-1">
                                <li class="flex flex-row">
                                    <a href="https://www.google.com/maps/dir/?api=1&destination=42%20Rue%20Victor%20Hugo%2040000%20Mont-de-Marsan" class="link no-anim flex flex-row gap-2 justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline-block">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        42 Rue Victor Hugo, 40000 Mont-de-Marsan
                                    </a>
                                </li>
                                <li class="flex flex-row gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>
                                    {booking.prestation.name}
                                </li>
                                <li class="flex flex-row items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {formatDuration(booking.prestation.duration)}
                                    <span class="w-1 h-1 bg-neutral-400 rounded-full"></span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                    </svg>
                                    {formatPrice(booking.prestation.price)}
                                </li>
                            </ul>
                        </div>
                    </div>
                {/each}
            {/if}
            {#if pastBookings.length > 0}
                <h4 class="mb-4">Mes rendez-vous passés</h4>
                {#each pastBookings as booking}
                    <div class="rounded-lg w-full bg-neutral-100 border border-neutral-300 p-6 flex md:flex-row flex-col items-center gap-6">
                        <a href="/dashboard/book">
                            <img src="https://res.cloudinary.com/planity/image/upload/c_thumb,g_center,h_128,w_128,f_auto/oxuvifkqajtuohqeswc7" alt="" class="rounded-lg">
                        </a>
                        <div class="flex flex-col">
                            <h6 class="font-medium">{formatDate(booking.start)}</h6>
                            <ul class="text-neutral-500 mt-1 space-y-1">
                                <li class="flex flex-row">
                                    <a href="https://www.google.com/maps/dir/?api=1&destination=42%20Rue%20Victor%20Hugo%2040000%20Mont-de-Marsan" class="link no-anim flex flex-row gap-2 justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline-block">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        42 Rue Victor Hugo, 40000 Mont-de-Marsan
                                    </a>
                                </li>
                                <li class="flex flex-row gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>
                                    {booking.prestation.name}
                                </li>
                                <li class="flex flex-row items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {formatDuration(booking.prestation.duration)}
                                    <span class="w-1 h-1 bg-neutral-400 rounded-full"></span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                    </svg>
                                    {formatPrice(booking.prestation.price)}
                                </li>
                            </ul>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    {:else}
        <div class="w-full flex flex-col">
            <form use:enhance={() => {return (returnProps) => {returnProps.update({ reset: false });};}} method="POST" action="?/save" class="card w-full">
                <h4 class="mb-4">Mes coordonnés</h4>
                <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <label for="firstName">
                        Prénom
                        <input type="text" name="firstName" id="firstName" value="{form?.formData?.firstName ?? user.firstName}" class="clear" placeholder="Prénom">
                    </label>
                    <label for="name">
                        Nom
                        <input type="text" name="name" id="name" value="{form?.formData?.name ?? user.name}" class="clear" placeholder="Nom">
                    </label>
                    <label for="email">
                        E-mail
                        <input type="text" name="email" id="email" value="{form?.formData?.email ?? user.email}" class="clear" placeholder="E-mail">
                    </label>
                </div>
                <button class="button-secondary button-sm mt-6" type="submit">
                    Enregistrer
                </button>
            </form>

            <div class="py-4">
                <button class="w-full button-danger" on:click={() => {logOutModal = true;}}>Se déconnecter</button>
            </div>
        </div>
    {/if}
</div>

<!-- Log-out modal -->
<div class="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-neutral-600/50 transition-all p-2 {logOutModal ? "opacity-100 z-50" : "-z-10 opacity-0"}">
    <div class="p-6 bg-white rounded-lg border border-neutral-200 max-w-md w-full space-y-4">
        <div class="flex w-full justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:w-1/4 w-1/3 text-neutral-800">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
        </div>
        <div>
            <h4>Se déconnecter</h4>
            <p>Voulez vous vraiment vous déconnecter?</p>
        </div>
        <div class="flex flex-col lg:flex-row gap-4 w-full">
            <button class="button-secondary" on:click={() => {logOutModal = false;}}>
                Non, rester connecter
            </button>
            <a href="/log-out" class="button-primary">
                Oui, se déconnecter
            </a>
        </div>
    </div>
</div>