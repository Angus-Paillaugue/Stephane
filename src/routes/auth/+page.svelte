<script>
    import { enhance } from '$app/forms';

    export let form;

    let formType = "login";
</script>

<section class="w-full grid max-md:grid-rows-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen">
    <div class="h-full w-full bg-no-repeat bg-cover bg-center lg:col-span-2 brightness-75" style="background-image: url(https://res.cloudinary.com/planity/image/upload/q_auto,f_auto/vmioufacjepz6uffokwl);"></div>
    <div class="h-full w-full flex flex-col md:items-start md:justify-center items-center justify-start">
        {#if formType === "login"}
            <form action="?/login" use:enhance method="POST" class="max-w-sm w-full h-fit p-6 flex flex-col gap-4">
                <h3>Se connecter</h3>
                <label for="email">
                    E-mail
                    <input type="email" name="email" id="email" placeholder="E-mail" class="block" value="{form?.logIn?.formData?.email ?? ""}">
                </label>
                <label for="password">
                    Mot de passe
                    <input type="password" name="password" id="password" placeholder="Mot de passe" class="block" value="{form?.logIn?.formData?.password ?? ""}">
                </label>
                <button class="button-primary" type="submit">Se connecter</button>

                {#if form?.logIn?.success === false}
                    <div class="w-full bg-red-200 border border-red-500 p-4 rounded-lg text-red-800">
                        {form?.logIn?.message}
                    </div>
                {/if}

                <p>Pas encore de compte? <button class="link no-anim" on:click={() => {formType = "register"}}>En créer un</button></p>
            </form>
        {:else}
            <form action="?/register" use:enhance method="POST" class="max-w-sm w-full h-fit p-6 flex flex-col gap-4">
                <h3>Créer un compte</h3>
                <label for="email">
                    E-mail
                    <input type="email" name="email" id="email" placeholder="E-mail" class="block" value="{form?.register?.formData?.email ?? ""}">
                </label>
                <label for="firstName">
                    Prénom
                    <input type="text" name="firstName" id="firstName" placeholder="Prénom" class="block" value="{form?.register?.formData?.firstName ?? ""}">
                </label>
                <label for="name">
                    Nom
                    <input type="text" name="name" id="name" placeholder="E-mail" class="block" value="{form?.register?.formData?.name ?? ""}">
                </label>
                <label for="password">
                    Mot de passe
                    <input type="password" name="password" id="password" placeholder="Mot de passe" class="block" value="{form?.register?.formData?.password ?? ""}">
                </label>
                <button class="button-primary" type="submit">Créer</button>

                {#if form?.register?.success === false}
                    <div class="w-full bg-red-200 border border-red-500 p-4 rounded-lg text-red-800">
                        {form?.register?.message}
                    </div>
                {/if}

                <p>Deja un compte? <button class="link no-anim" on:click={() => {formType = "login"}}>Se connecter</button></p>
            </form>
        {/if}
    </div>
</section>