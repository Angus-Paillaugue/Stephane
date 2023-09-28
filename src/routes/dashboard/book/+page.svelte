<script>
    import { formatDuration, formatPrice, formatDate } from "$lib/helpers";
    import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
    import { onMount } from "svelte";

    onMount(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXBhaWxsIiwiYSI6ImNreXI0dXVuczBxcGcycm1tcGJqdTMxaDMifQ.V4CpygVlur0d2ioTjVIWRg';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v11',
            center: [-0.5009122524921432, 43.89311586402989],
            zoom: 16,
            cooperativeGestures: false,
        });
        
        new mapboxgl.Marker({ color: 'black' }).setLngLat([-0.5009122524921432, 43.89311586402989]).addTo(map);
        map.addControl(new mapboxgl.NavigationControl());
    });

    export let data;

    const { coiffeurs, prestations, ratings } = data;
    let selectedPrestation = prestations[5];
    let ratingsTabIndex = 0;
    let ratingsOffset = 0;
    let mainTabsSmallScreenIndex = 0;
</script>

{#if selectedPrestation !== undefined}
    <section class="max-w-screen-xl mx-auto w-full lg:p-6 p-2 mt-5 space-y-6">
        <div>
            <h4><span class="text-primary-700">1.</span> Prestation sélectionnée</h4>
            <div class="card">
                <div class="flex flex-row items-start justify-between">
                    <div class="flex flex-col">
                        <h6>{selectedPrestation.name}</h6>
                        <div class="flex flex-row gap-2 items-center">
                            <span class="text-neutral-500">{formatDuration(selectedPrestation.duration)}</span>
                            <span class="w-1 h-1 bg-neutral-300 rounded-full"></span>
                            {formatPrice(selectedPrestation.price)}
                        </div>
                        <h6 class="mt-2 font-medium">Avec qui ?</h6>
                    </div>
                    <button class="no-scale link" on:click={() => {selectedPrestation = undefined}}>Supprimer</button>
                </div>

                <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-4">
                    <li>
                        <label for="sansPreference" class="inline-flex items-center justify-between w-full p-5 bg-white border border-neutral-200 rounded-lg cursor-pointer group-checked:border-blue-600 group-checked:text-blue-600 hover:bg-neutral-100">
                            <div class="flex flex-row gap-2 items-center">
                                <div class="w-8 h-8 rounded-full flex flex-col items-center justify-center bg-neutral-800 text-neutral-100">S</div>
                                <p>Sans préférence</p>
                            </div>
                            <input type="radio" name="withWho" value="sansPreference" id="sansPreference" class="group" checked>
                        </label>
                    </li>
                    {#each coiffeurs as coiffeur}
                        <li>
                            <label for="{coiffeur.prenom}" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-neutral-200 rounded-lg cursor-pointer group-checked:border-blue-600 group-checked:text-blue-600 hover:bg-neutral-100">
                                <div class="flex flex-row gap-2 items-center">
                                    <div class="w-8 h-8 rounded-full flex flex-col items-center justify-center bg-neutral-800 text-neutral-100">{coiffeur.prenom[0]}</div>
                                    <p>{coiffeur.prenom}</p>
                                </div>
                                <input type="radio" name="withWho" value="{coiffeur.prenom}" id="{coiffeur.prenom}" class="group">
                            </label>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </section>
{:else}
    <header class="w-full md:hidden grid grid-cols-3 bg-white">
        <button class="no-scale border-b-2 py-4 {mainTabsSmallScreenIndex === 0 ? "border-neutral-800" : "border-transparent"}" on:click={() => {mainTabsSmallScreenIndex = 0}}>Prendre RDV</button>
        <button class="no-scale border-b-2 py-4 {mainTabsSmallScreenIndex === 1 ? "border-neutral-800" : "border-transparent"}" on:click={() => {mainTabsSmallScreenIndex = 1}}>Avis</button>
        <button class="no-scale border-b-2 py-4 {mainTabsSmallScreenIndex === 2 ? "border-neutral-800" : "border-transparent"}" on:click={() => {mainTabsSmallScreenIndex = 2}}>À-propos</button>
    </header>
    <section class="grid lg:grid-cols-3 grid-cols-1 gap-6 max-w-screen-xl mx-auto w-full lg:p-6 p-2 mt-5">
        <div class="flex flex-col gap-6 lg:col-span-2 max-lg:order-2">
            
            <div class="{mainTabsSmallScreenIndex !== 0 && "max-md:hidden"}">
                <h3>Toutes les prestations</h3>
                <h4 class="mt-5">Femme</h4>
                <div class="px-6 rounded-lg shadow-shadow border bg-white border-neutral-200 py-0 text-neutral-600">
                    {#each prestations.filter(prestation => prestation.sexe === "femme") as prestation, index}
                        <div class="flex flex-row gap-2 justify-between items-center py-4 {index !== prestations.filter(prestation => prestation.sexe === "femme").length -1 && "border-b border-neutral-200"}">
                            <p>{prestation.name}</p>
                            <div class="flex sm:flex-row flex-col items-center gap-2">
                                {formatDuration(prestation.duration)}
                                <span class="w-1 h-1 bg-neutral-300 rounded-full"></span>
                                {formatPrice(prestation.price)}
                                <button class="button-primary button-sm ml-2" on:click={() => {selectedPrestation = prestations[prestation.id]}}>
                                    Choisir
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="{mainTabsSmallScreenIndex !== 0 && "max-md:hidden"}">
                <h4 class="mt-5">Homme & Enfant</h4>
                <div class="px-6 rounded-lg shadow-shadow border bg-white border-neutral-200 py-0 text-neutral-600">
                    {#each prestations.filter(prestation => prestation.sexe === "homme") as prestation, index}
                        <div class="flex flex-row gap-2 justify-between items-center py-4 {index !== prestations.filter(prestation => prestation.sexe === "homme").length - 1  && "border-b border-neutral-200"}">
                            <p>{prestation.name}</p>
                            <div class="flex sm:flex-row flex-col items-center gap-2">
                                {formatDuration(prestation.duration)}
                                <span class="w-1 h-1 bg-neutral-300 rounded-full"></span>
                                {formatPrice(prestation.price)}
                                <button class="button-primary button-sm ml-2" on:click={() => {selectedPrestation = prestations[prestation.id]}}>
                                    Choisir
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="{mainTabsSmallScreenIndex !== 0 && "max-md:hidden"}">
                <h4 class="mt-5">Coloration Végétal</h4>
                <div class="px-6 rounded-lg shadow-shadow border bg-white border-neutral-200 py-0 text-neutral-600">
                    {#each prestations.filter(prestation => prestation.sexe === "cv") as prestation, index}
                        <div class="flex flex-row gap-2 justify-between items-center py-4 {index !== prestations.filter(prestation => prestation.sexe === "cv").length - 1  && "border-b border-neutral-200"}">
                            <p>{prestation.name}</p>
                            <div class="flex sm:flex-row flex-col items-center gap-2">
                                {formatDuration(prestation.duration)}
                                <span class="w-1 h-1 bg-neutral-300 rounded-full"></span>
                                {formatPrice(prestation.price)}
                                <button class="button-primary button-sm ml-2" on:click={() => {selectedPrestation = prestations[prestation.id]}}>
                                    Choisir
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="{mainTabsSmallScreenIndex !== 0 && "max-md:hidden"}">
                <h4 class="mt-5">Coloration Végétal A Emporter</h4>
                <p>Nous appliquons votre coloration végétal au salon, et vous pouvez repartir avec afin de la rincer vous-même chez vous et ainsi optimiser le temps de pause.</p>
                <p>Venez avec un foulard.</p>
                <div class="px-6 rounded-lg shadow-shadow border bg-white border-neutral-200 py-0 text-neutral-600">
                    {#each prestations.filter(prestation => prestation.sexe === "cve") as prestation, index}
                        <div class="flex flex-row gap-2 justify-between items-center py-4 {index !== prestations.filter(prestation => prestation.sexe === "cve").length -1  && "border-b border-neutral-200"}">
                            <p>{prestation.name}</p>
                            <div class="flex sm:flex-row flex-col items-center gap-2">
                                {formatDuration(prestation.duration)}
                                <span class="w-1 h-1 bg-neutral-300 rounded-full"></span>
                                {formatPrice(prestation.price)}
                                <button class="button-primary button-sm ml-2" on:click={() => {selectedPrestation = prestations[prestation.id]}}>
                                    Choisir
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="{mainTabsSmallScreenIndex !== 2 && "max-md:hidden"}">
                <h4 class="mt-5">Où se situe le salon ?</h4>
                <a href="https://www.google.com/maps/dir/?api=1&destination=42%20Rue%20Victor%20Hugo%2040000%20Mont-de-Marsan" class="link no-anim flex flex-row gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline-block">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    42 Rue Victor Hugo, 40000 Mont-de-Marsan
                </a>
                <div id="map" class="w-full aspect-video mt-2 rounded-lg"></div>
            </div>
            <div class="{mainTabsSmallScreenIndex !== 2 && "max-md:hidden"}">
                <h4 class="mt-5">Collaborateurs</h4>
                <div class="card grid grid-cols-1 sm:grid-cols-2 {coiffeurs.length >= 4 &&"lg:grid-cols-4"} gap-2 lg:gap-6">
                    {#each coiffeurs as coiffeur}
                        <div class="border p-4 lg:p-8 rounded-lg border-neutral-200 flex flex-col items-center justify-center gap-2">
                            <div class="w-16 h-16 rounded-full flex flex-col items-center justify-center bg-neutral-800 text-neutral-100">{coiffeur.prenom[0]}</div>
                            <p>{coiffeur.prenom}</p>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="{mainTabsSmallScreenIndex !== 2 && "max-md:hidden"}">
                <h4 class="mt-5">À-propos</h4>
                <div class="card space-y-4">
                    <p><b>Installé non loin du parc Jean Rameau, le salon de coiffure Stéphane Paillaugue est un havre de paix, au cœur de Mont-de-Marsan. Et dans ce salon de coiffure bio, les plantes sont forcément à l’honneur : vous les retrouverez dans le joli patio végétalisé, mais aussi dans vos cheveux avec des colorations 100 % naturelles !</b></p>
                    <p>Les habitué.e.s vous le diront : on se sent bien chez Stéphane Paillaugue sitôt la porte poussée. L’ambiance zen y est certainement pour quelque chose, mais également l’accueil sympathique de son équipe de coiffeurs : Justin, Maxime et Anaïs.</p>
                    <p>Vos cheveux risquent aussi de vous dire merci après leur passage dans ce salon de coiffure : ici exit les produits chimiques, toutes les colorations sont végétales. Un peu de henné, d’hibiscus, de brou de noix, un soupçon d’indigo, une pincée de brahmi… Comme un magicien, Stéphane mélange les poudres colorées avec dextérité pour préparer la nuance de vos rêves. Les soins utilisés sont, bien sûr, eux aussi naturels. L’adresse a d’ailleurs créé son propre shampoing solide nommé « Esprit végétal ».</p>
                    <p>Les autres atouts du lieu : le fauteuil massant… et les prix raisonnables pour ces soins confectionnés sur mesure. Réservez votre rendez-vous !</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-6 {mainTabsSmallScreenIndex !== 1 && "max-md:hidden"}">
            <div class="rounded-lg shadow-shadow border bg-white border-neutral-200">
                <div class="grid grid-cols-2 w-full">
                    <button class="no-scale border-b-2 py-4 {ratingsTabIndex === 0 ? "border-neutral-800" : "border-transparent"}" on:click={() => {ratingsTabIndex = 0}}>Note globale</button>
                    <button class="no-scale border-b-2 py-4 {ratingsTabIndex === 1 ? "border-neutral-800" : "border-transparent"}" on:click={() => {ratingsTabIndex = 1}}>Avis</button>
                </div>
                <div class="px-6 py-8 ">
                    {#if ratingsTabIndex === 0}
                        <div class="flex flex-row rounded-lg border border-neutral-200 w-full overflow-hidden items-center gap-4">
                            <h3 class="bg-neutral-800 text-neutral-100 p-2">
                                {(ratings.map(rating => rating.rating).reduce((accumulator, currentValue) => {return accumulator + currentValue},0)/ratings.length).toFixed(1).toString().replace(".", ",")}
                            </h3>
                            <p><b>{ratings.length}</b> clients ont donné leur avis</p>
                        </div>
                    {:else}
                        <div class="flex flex-col gap-2">
                            {#each ratings.slice(ratingsOffset, ratingsOffset+5) as rating}
                                <div class="border-b border-neutral-200 py-4">
                                    <div class="flex flex-row items-center justify-between">
                                        <p class="flex flex-row gap-2 items-center font-bold">
                                            {rating.rating} / 5
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 tex-neutral-800 fill-neutral-800">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        </p>
                                        {formatDate(rating.date, false)}
                                    </div>
                                    {#if rating.comment}
                                        <p>{rating.comment}</p>
                                    {/if}
                                </div>
                            {/each}
                            <div class="flex flex-row items-center justify-between">
                                <button class="no-scale flex flex-row gap-1 items-center {(ratingsOffset - 5) < 0 && "text-neutral-400 cursor-default"}" disabled={(ratingsOffset - 5) < 0} on:click={() => {if((ratingsOffset - 5) >= 0) ratingsOffset = ratingsOffset - 5}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                    Previous page
                                </button>
                                <button class="no-scale flex flex-row gap-1 items-center {(ratingsOffset + 5) >= ratings.length && "text-neutral-400 cursor-default"}" disabled={(ratingsOffset + 5) >= ratings.length} on:click={() => {if((ratingsOffset + 5) < ratings.length) ratingsOffset = ratingsOffset + 5}}>
                                    Next page
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>

            <div>
                <h4>Horaires d'ouverture</h4>
                <div class="card mt-2">
                    <ul>
                        <li class="border-b border-neutral-200 flex flex-row justify-between items-center pb-2">
                            <p class="text-lg {new Date().getDay() === 1 && "font-bold"}">Lundi</p>
                            <p class="text-lg {new Date().getDay() === 1 ? "font-bold" : "font-semibold"} text-neutral-500">Fermé</p>
                        </li>
                        <li class="border-b border-neutral-200 flex flex-row justify-between items-center py-2">
                            <p class="text-lg {new Date().getDay() === 2 && "font-bold"}">Mardi</p>
                            <p class="text-lg {new Date().getDay() === 2 ? "font-bold" : "font-semibold"} text-neutral-500">Fermé</p>
                        </li>
                        <li class="border-b border-neutral-200 flex flex-row justify-between items-center py-2">
                            <p class="text-lg {new Date().getDay() === 3 && "font-bold"}">Mercredi</p>
                            <p class="text-lg {new Date().getDay() === 3 ? "font-bold" : "font-semibold"}">07:30 - 18:00</p>
                        </li>
                        <li class="border-b border-neutral-200 flex flex-row justify-between items-center py-2">
                            <p class="text-lg {new Date().getDay() === 4 && "font-bold"}">Jeudi</p>
                            <p class="text-lg {new Date().getDay() === 4 ? "font-bold" : "font-semibold"}">07:30 - 18:00</p>
                        </li>
                        <li class="border-b border-neutral-200 flex flex-row justify-between items-center py-2">
                            <p class="text-lg {new Date().getDay() === 5 && "font-bold"}">Vendredi</p>
                            <p class="text-lg {new Date().getDay() === 5 ? "font-bold" : "font-semibold"}">07:30 - 18:00</p>
                        </li>
                        <li class="border-b border-neutral-200 flex flex-row justify-between items-center py-2">
                            <p class="text-lg {new Date().getDay() === 6 && "font-bold"}">Samedi</p>
                            <p class="text-lg {new Date().getDay() === 6 ? "font-bold" : "font-semibold"}">07:30 - 18:00</p>
                        </li>
                        <li class="flex flex-row justify-between items-center pt-2">
                            <p class="text-lg {new Date().getDay() === 7 && "font-bold"}">Dimanche</p>
                            <p class="text-lg {new Date().getDay() === 7 ? "font-bold" : "font-semibold"} text-neutral-500">Fermé</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
{/if}