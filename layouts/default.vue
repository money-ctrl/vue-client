<template>
  <div class="container">
    <header>
      <h1>
        money ctrl
      </h1>
      <p>
        Control your money flow
      </p>
    </header>
    <hr>
    <nuxt/>
    <hr>
    <footer>
      <div>
        Icons made by
        <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">
          Eucalyp
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
        is licensed by
        <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
          CC 3.0 BY
        </a>
      </div>
    </footer>
  </div>
</template>

<style>
</style>

<script>
export default {
  head: {
    meta: [
      { name: "apple-mobile-web-app-title", content:"Money Ctrl" },
      { name: "application-name", content:"Money Ctrl" },
      { name: "msapplication-TileColor", content:"#00aba9" },
      { name: "theme-color", content:"#f7fff7" },
    ],
    link: [
      { rel:"apple-touch-icon", sizes:"180x180", href:"/apple-touch-icon.png" },
      { rel:"icon", type:"image/png", sizes:"16x16", href:"/favicon-16x16.png" },
      { rel:"icon", type:"image/png", sizes:"32x32", href:"/favicon-32x32.png" },
      { rel:"mask-icon", href:"/safari-pinned-tab.svg", color:"#0966a5" },
      { rerel:"manifest", href:"/site.webmanifest" },
    ],
  }
}
</script>
