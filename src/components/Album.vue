<template>
  <div class="pa-4">
    <profile />

    <v-row class="my-2">
      <v-col cols="12" lg="8" class="d-flex justify-space-around">
        <h3 class="uppercase ma-2">Select A Rover</h3>

        <template v-for="el of rovers">
          <v-card
            outlined
            width="30%"
            :class="
              el.value === selectedRover.value ? 'primary black--text' : ''
            "
            :key="el.value"
            class="px-4 pointer"
            @click="selRover(el)"
          >
            <div class="font-weight-bold">{{ el.name }}</div>
            <!-- <div class="small-text">{{el.desc}}</div> -->
          </v-card>
        </template>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card outlined height="100%" class="d-flex pa-2 align-center">
          <h3 class="uppercase text-left mr-2"><mark>SOL.Date</mark></h3>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="selDate"
                v-bind="attrs"
                type="number"
                v-on="on"
                hide-details
                dense
                outlined
                color="primary"
              />
            </template>
            <div style="width: 400px" class="small-text text-left">
              Mars Solar Days and 24-hr Clock Convention A Mars solar day has a
              mean period of 24 hours 39 minutes 35.244 seconds, and is
              customarily referred to as a "sol" in order to distinguish this
              from the roughly 3% shorter solar day on Earth.
            </div>
          </v-tooltip>

          <v-btn
            color="primary"
            class="black--text font-weight-bold mx-1"
            @click="setDate"
            >Search</v-btn
          >
        </v-card>
      </v-col>
    </v-row>

    <v-row class="ma-1">
      <v-col cols="12" lg="2" class="pa-0">
        <h3 class="uppercase">Select A Rover Camera</h3>
      </v-col>
      <v-col
        cols="12"
        lg="1"
        sm="6"
        v-for="el of roverTypes"
        :key="el.value"
        class="pa-0"
      >
        <v-card
          outlined
          height="100%"
          :class="
            el.value === selecetedRoverType.value ? 'primary black--text' : ''
          "
          class="px-4 pointer"
          @click="selRoverType(el)"
        >
          <div class="font-weight-bold">{{ el.name }}</div>
          <div class="small-text">{{ el.desc }}</div>
        </v-card>
      </v-col>
      <!-- </div> -->
    </v-row>
    <div class="d-flex justify-end my-4">
      <v-btn
        outlined
        width="100px"
        color="primary"
        :disabled="!data.length || page < 2"
        @click="clickPrev"
      >
        Previous
      </v-btn>
      <v-btn
        outlined
        width="100px"
        color="primary"
        :disabled="!data.length || data.length < 25"
        @click="clickNext"
        >Next</v-btn
      >
    </div>
    <v-row class="mt-2">
      <template v-for="photo of data">
        <data-box :photo="photo" :key="photo.id" />
      </template>
      <v-card
        outlined
        height="400px"
        width="100%"
        class="text-center ma-4"
        v-if="!data.length"
      >
        No Data to show
      </v-card>
    </v-row>
    <div class="text-right my-4">
      <v-btn
        outlined
        width="100px"
        color="primary"
        :disabled="!data.length || page < 2"
        @click="clickPrev"
      >
        Previous
      </v-btn>
      <v-btn
        outlined
        width="100px"
        color="primary"
        :disabled="!data.length || data.length < 25"
        @click="clickNext"
        >Next</v-btn
      >
    </div>
    <v-overlay
      class="text-center"
      z-index="9999"
      opacity="0.6"
      :value="showLoading"
    >
      <v-progress-circular color="primary" size="40" indeterminate />
    </v-overlay>
  </div>
</template>

<script>
import axios from "axios";
import DataBox from "./DataBox.vue";
import Profile from "./Profile";
import { API_KEY, API_PREFIX } from "@/GlobalVars";
// import moment from "moment";

export default {
  name: "CuriocityAlbum",

  components: {
    DataBox,
    Profile,
  },

  data: () => ({
    data: [],
    showLoading: false,
    // solFirstDate: moment("2012-08-06"),
    solQr: 2998,
    roverQr: "",
    page: 1,
    selDate: 2998,
    selecetedRoverType: {},
    roverTypes: [
      { name: "ALL", value: 0 },
      { name: "FHAZ", value: 1, desc: "Front Hazard Avoidance Camera" },
      { name: "RHAZ", value: 2, desc: "Rear Hazard Avoidance Camera" },
      { name: "MAST", value: 3, desc: "Mast Camera" },
      { name: "CHEMCAM", value: 4, desc: "Chemistry and Camera Complex" },
      { name: "MAHLI", value: 5, desc: "Mars Hand Lens Imager" },
      { name: "MARDI", value: 6, desc: "Mars Descent Imager" },
      { name: "NAVCAM", value: 7, desc: "Navigation Camera" },
      { name: "PANCAM", value: 9, desc: "Panoramic Camera" },
      {
        name: "MINITES",
        value: 10,
        desc: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
    ],
    selectedRover: { name: "Curiosity", value: 1 },
    rovers: [
      { name: "Curiosity", value: 1 },
      { name: "Opportunity", value: 2 },
      { name: "Spirit", value: 3 },
    ],
  }),
  beforeMount() {
    this.showLoading = true;
    this.getData();
  },

  methods: {
    getData() {
      axios({
        method: "get",
        url: `${API_PREFIX}/mars-photos/api/v1/rovers/${this.selectedRover.name}/photos?sol=${this.solQr}${this.roverQr}&page=${this.page}&api_key=${API_KEY}`,
      })
        .then((res) => {
          console.log(res);
          this.data = res.data.photos;
          this.showLoading = false;
        })
        .catch((err) => console.error(err));
    },
    selRoverType(el) {
      this.selecetedRoverType = el;
      if (!el.value) {
        this.roverQr = ``;
      } else {
        this.roverQr = `&camera=${this.selecetedRoverType.name}`;
      }
      this.getData();
    },

    selRover(el) {
      this.page = 1;
      this.roverQr = ``;
      this.selectedRover = el;
      this.getData();
      this.selecetedRoverType = { name: "ALL", value: 0 };
    },
    setDate() {
      this.roverQr = ``;
      this.solQr = this.selDate;
      this.page = 1;
      this.getData();
      this.selecetedRoverType = { name: "ALL", value: 0 };
    },

    clickPrev() {
      this.page--;
      this.getData();
    },
    clickNext() {
      this.page++;
      this.getData();
    },
  },
};
</script>

<style scoped>
.pointer:hover {
  font-weight: 700;
  transition: all 0.4s ease;
}

.sel-class {
  color: black !important;
}
</style>
