<script setup lang="ts">
import NavBarTop from './components/layout/NavBarTop.vue'
import SideBar from './components/layout/SideBar.vue'
</script>

<template>
  <SideBar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <NavBarTop />
    <main>
      <RouterView />
    </main>
    <footer></footer>
  </div>
</template>
