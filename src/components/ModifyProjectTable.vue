<template>

  <q-form style="width: 600px" class="q-pa-md q-mx-auto" >

    <q-input label="Project name" v-model="project.name"></q-input>
    <q-select label="Category" v-model="project.category"></q-select>
    <q-input label="Year" v-model="project.year"></q-input>
    <q-input label="Description of project" v-model="project.projectDescription" type="textarea"></q-input>

    <!-- Main photo -->
    <div class="row q-py-xs">
      <q-input label="Main photo URL" v-model="project.photoUrl" class="col-10 q-pr-sm" filled>
        <template v-if="project.photoUrl" v-slot:append>
          <q-icon name="cancel" @click.stop.prevent="project.photoUrl = ''" class="cursor-pointer" />
        </template>
      </q-input>
      <q-img :src="project.photoUrl" :ratio="16/9" width="80px" class="q-ml-sm" loading="lazy" @load="console.log('loading')" @error="console.log('cannot load')" ></q-img>
    </div>

    <q-input label="Participants' countries" v-model="project.countries"></q-input>

    <!-- Gallery photos -->
    <div class="h5-text q-pt-md q-pb-md text-center ">Photos (paste the text from imgur here below)</div>

    <q-input type="textarea" v-model="project.photos"></q-input>

    <!-- Buttons -->
    <div class="row justify-start ">
      <q-btn label="Add Photo" @click="project.photos.length++" class="q-mt-md bg-blue-2 text-black"></q-btn>
    </div>
    <div class="row justify-center ">
      <q-btn label="Confirm Changes" @click="handleSubmit" class="q-mt-md bg-green-2 text-black"></q-btn>
    </div>

  </q-form>
</template>

<script setup>

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import useProject from 'src/composables/useProject'

const props = defineProps({
  project: Object
})

const router = useRouter()
const $q = useQuasar()

const project = ref({
  name: props.project.name,
  category: props.project.category,
  year: props.project.year,
  projectDescription: props.project.projectDescription,
  photoUrl: props.project.photoUrl,
  countries: props.project.countries,
  photos: props.project.photos
})

project.value.photos = project.value.photos.join('\n')

if (!project.value.photos) project.value.photos = []

const formatedLinks = computed(() => {
  return project.value.photos.split(/\r?\n|\r|\n/g)
})

// supabase

const { updateProject, errorMess } = useProject()

async function handleSubmit () {
  console.log(project.value.photos)

  await updateProject(project.value.name, project.value.category, project.value.year, project.value.projectDescription, project.value.photoUrl, project.value.countries, formatedLinks.value)

  console.log(errorMess.value)
  if (errorMess.value) {
    alert(errorMess.value)
  } else {
    // notify pop up message
    $q.notify({
      message: 'Project has been successfully modified',
      color: 'green',
      textColor: 'white'
    })

    // redirect to Member page
    setTimeout(() => router.push({ path: '/Projects' }), 1500)
  }

  //  push the data
}

</script>

<style scoped>
.q-form {
width: 700px;
border: 0.1rem solid black;
box-shadow: 2px 2px #8a8989;
border-radius: 10px;
}
h5 {
  margin: 0;
}
.q-field {
  min-width: 150px;
}
</style>
