import STC from './SingleTextClassification.vue';
import MTC from './MultipleTextClassification.vue';

export default {
  'single-text-classification': {
    name: 'Text Classification: Single Class',
    description: 'A text classification project where an example sentence is tagged with a single class.',
    image: require('../../assets/annotation/stc.jpg'), // eslint-disable-line global-require
    component: STC,
  },
  'multi-text-classification': {
    name: 'Text Classification: Multiple Class',
    description: 'A text classification project where an example sentence is tagged with multiple classes.',
    image: require('../../assets/annotation/mtc.jpg'), // eslint-disable-line global-require
    component: MTC,
  },
};
