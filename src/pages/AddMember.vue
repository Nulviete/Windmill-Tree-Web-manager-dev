<template>
  <q-page padding>
    <h2 class="q-mx-auto text-center">Add new Membo :-)</h2>
    <div style="width: 700px" class="q-mx-auto">

      <q-form action="" @submit.prevent="handleSubmit" class="q-gutter-xs" >
        <q-input filled v-model="newMember.name" label="Name" :dense="dense" required />
        <q-select filled v-model="newMember.country" :options="countryOpts" label="Country" />
        <q-select filled v-model="newMember.position" :options="positionOpts" label="Position" />
        <q-input filled v-model="newMember.positionDescription" label="Description of position" :dense="dense" class="" required />
        <div class="h3-text q-pt-md">Start of cooperation (Only for volunteers)</div>
          <div class="row">
            <q-select filled v-model="month" :options="monthSel" label="Month" class="col-2"></q-select>
            <q-select filled v-model="year" :options="yearSel" label="Year" class="col-2"></q-select>

          </div>

    <q-btn class="glossy q-mt-md" color="teal" label="Add Membo" type="submit" />
    </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import useMember from 'src/composables/useMember'

// import { supabase } from 'src/config/supabaseClient'

const router = useRouter()
const $q = useQuasar()

const datum = new Date()
const curYear = datum.getFullYear()
const year = ref(curYear)
const curMonth = datum.getMonth()

const monthSel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec']
const yearSel = ref([])
for (let i = curYear - 5; i < curYear + 5; i++) {
  yearSel.value.push(i)
}

const { addMember, data, errorMess } = useMember()

const month = ref(monthSel[curMonth])

const countryOpts = ref([
  { label: 'Poland', value: 'pl' },
  { label: 'Ukraine', value: 'ua' },
  { label: 'Czech republic', value: 'cz' },
  { label: 'Spain', value: 'sp' },
  { label: 'Italy', value: 'it' },
  { label: 'Morocco', value: 'mo' }
])
const positionOpts = ref([
  { label: 'Root Member', value: 'Root Member' },
  { label: 'Volunteer', value: 'Volunteer' }
])

const newMember = ref({
  name: ref(''),
  country: ref(null),
  dateSince: ref(''),
  position: ref(null),
  positionDescription: ref('')

})

const dense = ref(false)

// testing

// function handleSubmit () {
//   if (newMember.value.country === null) return alert('country must be selected')
//   else {
//     newMember.value.dateSince = month.value + ' of \'' + (year.value)
//     newMember.value.country = newMember.value.country.value
//     console.log(newMember.value)
//     $q.notify('Member has been successfully modified')
//     setTimeout(() => router.push({ path: '/Members' }), 1500)
//   }
// }

// supabase insert

async function handleSubmit () {
  if (newMember.value.country === null) return alert('country must be selected')
  else {
    newMember.value.dateSince = month.value + ' of ' + (year.value)
    newMember.value.country = newMember.value.country.value
    newMember.value.position = newMember.value.position.value
    console.log(newMember.value)

    $q.notify('Member has been successfully added')
    setTimeout(() => router.push({ path: '/Members' }), 1500)

    addMember(newMember.value)

    if (data.value) {
      $q.notify('Member has been successfully added')
      setTimeout(() => router.push({ path: '/Members' }), 1500)
    }
    if (errorMess.value) {
      alert(errorMess.value)
    }
    // const { data, error } = await supabase
    //   .from('members')
    //   .insert(newMember.value)
    //   .select()

    // if (data) {
    //   $q.notify('Member has been successfully added')
    //   setTimeout(() => router.push({ path: '/Members' }), 1500)
    // }
    // if (error) alert('error')
  }
}

</script>
