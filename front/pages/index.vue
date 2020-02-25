<template>
  <div>
    <h1 class="text-center my-8">The Baby Schedule Maker</h1>
    <div>
      <h2 class="h4">Tell us about your baby</h2>
      <p>
        Once we know how old your baby is, we&rsquo;ll get a schedule that you
        can start with and customize according to your own needs.
      </p>
      <form id="babyInfoForm" method="GET" action="/schedule">
        <div class="grid-x grid-margin-x">
          <div class="cell small-8 medium-6">
            <v-text-field
              label="Your baby’s birthday"
              data-cy="bdate"
              :autofocus="true"
              :max="new Date()"
              type="date"
              name="bdate"
              required
            ></v-text-field>
          </div>
        </div>
        <div class="grid-x">
          <div class="cell small-3">
            <v-btn data-cy="submit" type="submit" color="primary" large
              >Get a Schedule</v-btn
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {}
</script>
