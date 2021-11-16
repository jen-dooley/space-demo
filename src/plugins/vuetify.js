import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false, // set default to light
    themes: {
      light: {
        primary: colors.indigo.darken1, // #3949AB
        secondary: colors.deepPurple.accent1, // #B388FF
        accent: colors.green.lighten2, // #81C784
      },
      dark: {
        primary: colors.teal.darken2, // #00796B
        secondary: colors.green.lighten2, // #81C784
        accent: colors.deepPurple.accent1, // #B388FF
      },
    },
  },
});
