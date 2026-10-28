import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { VCard, VCardText } from 'vuetify/lib/components/VCard';
import VAlert from 'vuetify/lib/components/VAlert/VAlert';
import VApp from 'vuetify/lib/components/VApp/VApp';
import VBtn from 'vuetify/lib/components/VBtn/VBtn';
import VCol from 'vuetify/lib/components/VGrid/VCol';
import VDialog from 'vuetify/lib/components/VDialog/VDialog';
import VIcon from 'vuetify/lib/components/VIcon/VIcon';
import VImg from 'vuetify/lib/components/VImg/VImg';
import VMain from 'vuetify/lib/components/VMain/VMain';
import VProgressLinear from 'vuetify/lib/components/VProgressLinear/VProgressLinear';
import VRow from 'vuetify/lib/components/VGrid/VRow';
import VSheet from 'vuetify/lib/components/VSheet/VSheet';
import VTextField from 'vuetify/lib/components/VTextField/VTextField';
import { Ripple } from 'vuetify/lib/directives';

Vue.use(Vuetify, {
  components: {
    VAlert,
    VApp,
    VBtn,
    VCol,
    VDialog,
    VIcon,
    VImg,
    VMain,
    VProgressLinear,
    VRow,
    VSheet,
    VTextField,
    VCard,
    VCardText,
  },
  directives: { Ripple },
});

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#39ff14',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});
