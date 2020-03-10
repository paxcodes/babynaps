<template>
  <div>
    <div>
      <h2 class="my-8">Tell us about your baby</h2>
      <p>
        Once we know how old your baby is, we&rsquo;ll get a schedule that you
        can start with and customize according to your own needs.
      </p>
      <v-form
        id="babyInfoForm"
        ref="form"
        v-model="isValid"
        method="GET"
        action="/schedule"
        @submit.prevent="submitForm"
        @keydown.native.enter.prevent="submitForm"
      >
        <div class="grid-x grid-margin-x">
          <div class="cell small-8 medium-6">
            <v-text-field
              v-model="bdate"
              label="Your baby’s birthday"
              data-cy="bdate"
              :autofocus="true"
              type="date"
              name="bdate"
              :rules="[validateBirthdate]"
              required
            ></v-text-field>
          </div>
        </div>
        <div class="grid-x mt-4">
          <div class="cell small-3">
            <v-btn
              data-cy="submit"
              type="submit"
              color="primary"
              large
              @click.prevent="submitForm"
              >Get a Schedule</v-btn
            >
          </div>
        </div>
      </v-form>
    </div>
    <div data-cy="welcome-section">
      <h2 class="mt-12 mb-8">Our story</h2>
      <p>
        <em>Every baby is different.</em> It sounds clich&eacute;&mdash;almost
        like a cop-out for my own parenting incompetence. But after reading
        <a
          href="https://www.todaysparent.com/baby/baby-sleep/the-2-3-4-nap-schedule-that-will-get-your-baby-to-sleep/"
          target="_blank"
          rel="noopener noreferrer"
          >article</a
        >
        after
        <a
          href="https://www.babycenter.com/0_naps-the-first-year_1506357.bc"
          target="_blank"
          rel="noopener noreferrer"
          >article</a
        >
        about schedules, looking at
        <span class="footnote">conflicting nap charts<sup>1</sup></span
        >, and making schedules from different generators, I am convinced that I
        cannot simply blindly follow a schedule generated for me by some random
        website. And yes, I learned that every baby is indeed different.
      </p>
      <p>
        Therefore, I built this schedule <em>maker</em>. It will generate an
        initial schedule that you can adjust according to your needs because
        <em> you</em> know your baby best. There will be a handy chart of nap
        needs based on different medical studies to guide you as you make your
        schedule. Have fun!
      </p>
      <ol class="caption">
        <li>
          One chart says maximum awake time for my 7 month old is 2 hours, and
          another says my baby can go as long as 3 hours. Yup.
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      bdate: null,
      isValid: true
    }
  },
  methods: {
    validateBirthdate() {
      if (this.bdate == null) {
        return true
      }

      const today = new Date()
      const minDate = new Date(today).setDate(today.getDate() - 85)
      const maxDate = new Date(today.setMonth(today.getMonth() - 30))
      const bdateString = this.bdate.match(/^(\d{4})-(\d{2})-(\d{1,2})$/)

      if (bdateString === null || bdateString.length !== 4) {
        return false
      }

      const bdate = new Date(bdateString[1], bdateString[2] - 1, bdateString[3])
      if (bdate > minDate) {
        return 'Your baby has to be at least 3 months old.'
      } else if (bdate < maxDate) {
        return 'Your baby has to be at most 30 months old.'
      }
      return true
    },
    submitForm() {
      this.isValid = this.$refs.form.validate()
      if (this.isValid) {
        this.$router.push('/schedule?bdate=' + this.bdate)
      }
    }
  }
}
</script>
