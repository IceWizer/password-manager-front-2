<template>
    <header>
        <div class="navbar bg-base-100">
            <div class="navbar bg-base-100">
                <div class="flex-1">
                    <RouterLink to="/"><font-awesome-icon :icon="['fas', 'fingerprint']" size="2xl"
                            class=" text-primary" />
                    </RouterLink>
                </div>
                <div class="flex-none">
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                            <div class="w-10 rounded-full">
                                <font-awesome-icon :icon="['fas', 'bars']" size="xl" />
                            </div>
                        </div>
                        <ul tabindex="0"
                            class="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a>
                                    <font-awesome-icon :icon="['fas', 'user']" />Profil
                                </a>
                            </li>
                            <li>
                                <RouterLink to="/logout">
                                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" />Déconnexion
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>