import moment from 'moment';

/*
 * filter: {{ datetime_data | dateformat('YYYY-MM-DD HH:mm:ss')}}
 * $moment: this.$moment(datetime_data).format('YYYY-MM-DD HH:mm:ss')
 */
export default ({ Vue }) => {
    Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
        if (dataStr) {
            return moment(dataStr).format(pattern);
        }
        else {
            return '';
        }
    })
    Vue.prototype.$moment = moment;
};