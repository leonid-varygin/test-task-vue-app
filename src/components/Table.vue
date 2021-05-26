<template>
  <b-container>
    <b-table striped hover :items="items" :fields="fields">

      <template v-slot:cell(title)="row">
        <b-form-input v-model="row.item.details.title" @blur="saveChanges"/>
      </template>

      <template v-slot:cell(options)="row">
        <b-form-select @select="saveChanges"
          :options="row.item.details.options"
          v-model="row.item.changeOption"
        />
      </template>
      <template v-slot:cell(aColon)="row">
        <b-form-input v-model="row.item.details.aColon" type="number" @blur="saveChanges"/>
      </template>

      <template v-slot:cell(bColon)="row">
        <b-form-input v-model="row.item.details.bColon" @blur="saveChanges" @keypress.enter="saveChanges"/>
      </template>

      <template v-slot:cell(description)="row">
        <b-form-input v-model="row.item.details.description" @blur="saveChanges" @keypress.enter="saveChanges"/>
      </template>
    </b-table>

    <pre>{{ items }}</pre>
    <pre>{{ selected }}</pre>
  </b-container>

</template>

<script>

export default {
  name: 'Table',
  data () {
    return {
      selected: null,
      items: this.$store.state.data,
      fields: ['title', 'Options', 'aColon', 'bColon', 'description']
    }
  },
  methods: {
    saveChanges () {
      this.$store.dispatch('saveChanges', this.$store.state)
    }
  },
  beforeCreate () {
    this.$store.dispatch('setDataToLS')
    this.$store.dispatch('getData')
  }
}
</script>
