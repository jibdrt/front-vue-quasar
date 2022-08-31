import { boot } from 'quasar/wrappers';
import Vuelidate from 'vuelidate';

export default boot(({ app }) => {
  app.use(Vuelidate);
});