<template>
  <div>
    <header>
      <h1>
        ctrl+money
      </h1>
      <p>
        Control your money flow
      </p>
    </header>
    <hr>
    <nuxt/>
  </div>
</template>

<style>
:root {
  --text-color: #35495e;
  --light-text-color: #526488;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  letter-spacing: 1px;
  color: var(--text-color);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6{
  font-weight: 400;
}

hr{
  margin: 1rem 0;
}
</style>
