<template>
  <div>
    <h1 class="text-center">The Baby Schedule Maker</h1>
    <div>
      <h2 class="h4">Tell us about your baby</h2>
      <p>
        Once we know how old your baby is, we&rsquo;ll get a schedule that you
        can start with and customize according to your own needs.
      </p>
      <form id="babyInfoForm" method="GET" action="/schedule">
        <div class="grid-x grid-margin-x">
          <div class="cell small-8 medium-6">
            <label>
              When is your baby&rsquo;s birthday?
              <input
                data-cy="bdate"
                type="date"
                :max="new Date()"
                name="bdate"
                required
              />
            </label>
          </div>
        </div>
        <div class="grid-x">
          <div class="cell small-3">
            <input
              data-cy="submit"
              type="submit"
              class="button"
              value="Get a Schedule"
            />
          </div>
        </div>
      </form>
    </div>

    <div id="footer" class="tiny">
      <span>
        Inspired by
        <a href="/img/IMG_0746.jpg">Jeconiah</a> &hearts;
      </span>
      Hand-built by
      <span style="text-decoration:line-through">pandas</span>
      <a href="https://margret.pw">Pax.</a> 🐼
      <p>
        Favicon made by
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
          >Freepik</a
        >
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>
