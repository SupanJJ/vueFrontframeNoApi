import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
export default ({ Vue }) => {
    Vue.use(VCalendar, {
        componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
        navVisibility: "hidden", 
      });
};