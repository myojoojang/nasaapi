import 'vuetify/types/lib';
import type * as VuetifyComponents from 'vuetify/lib';

declare module 'vue' {
  export interface GlobalComponents {
    VAlert: typeof VuetifyComponents.VAlert;
    VApp: typeof VuetifyComponents.VApp;
    VBtn: typeof VuetifyComponents.VBtn;
    VCol: typeof VuetifyComponents.VCol;
    VDialog: typeof VuetifyComponents.VDialog;
    VIcon: typeof VuetifyComponents.VIcon;
    VImg: typeof VuetifyComponents.VImg;
    VMain: typeof VuetifyComponents.VMain;
    VProgressLinear: typeof VuetifyComponents.VProgressLinear;
    VRow: typeof VuetifyComponents.VRow;
    VSheet: typeof VuetifyComponents.VSheet;
    VTextField: typeof VuetifyComponents.VTextField;
    VCard: typeof VuetifyComponents.VCard;
    VCardText: typeof VuetifyComponents.VCardText;
  }
}
