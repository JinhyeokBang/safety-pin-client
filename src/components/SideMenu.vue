<template>
    <nav class="nav-container">
        <v-navigation-drawer stateless>
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
                    <v-list-tile-action>
                        <v-btn icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="signout">
                    <v-list-tile-action>
                        <v-btn icon>
                            <v-icon>lock_open</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-spacer></v-spacer>
        </v-navigation-drawer>
    </nav>
</template>

<script>
  import functions from "../js/functions";

  export default {
    name: "SideMenu",
    props: ['name', 'items'],
    methods: {
      signout: () => functions.signOut(this)
    }
  }
</script>

<style scoped>

</style>