<template>
  <div style="background-color: #121212">
    <file-explorer/>
    <system/>
  </div>
</template>

<script setup>
import FileExplorer from '@/components/FileExplorer.vue';
import System from '@/components/System/System.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Sans-Serif, sans-serif;
}

button {
  background: #1f252f;
  color: #eee;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 0.5em 1em;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,.4);
}

button.active {
  background: #eee;
  color: #1f252f;
}


input {
  height: 30px;
  padding-left: 0.5em;
  padding-right: 0.5em;
}

select {
  height: 30px;
  min-width: 60px;
}

/*
Uno css failed to generate pseudo rule.
https://github.com/unocss/unocss/issues/2371
*/
.hide-scroll-bar::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome, Safari and Opera */
}

table {
  /*border: 1px solid #ddd;*/
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
}

th, td {
  background-color: #1a1a22;
  height: 30px;
  padding: 0 16px;
  color: #ddd;
  border-bottom: thin solid hsla(0, 0%, 100%, .12);
  text-align: left;
}

tr:hover > td {
  background-color: #252531;
}

th {
  position: sticky;
  top: 0;
  color: #aaa;
  height: 48px;
}
</style>
