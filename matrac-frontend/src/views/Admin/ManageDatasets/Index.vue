<template lang="pug">
  .manage-datasets
    .dataset-list
      template(v-for="(d, i) in datasetList")
        .dataset
          p ID: {{d.Name}}
          p Type: {{d.Type}}
          p ID Field: {{d.IDIdx}}
          p User Field: {{d.UserIdx}}
          p Response Field: {{d.ResponseIdx}}

    .manage
      .new-dataset
        h3 Add dataset
        p Name
        input(type="text", v-model="name")
        vue-dropzone(ref="datasetUpload",
          id="datasetUpload",
          :options="dzOpts",
          @vdropzone-file-added="fileAdded"
        )
        button(v-for="(v,k) in files",@click="selectedFile=k") {{k}}
        template(v-if="selectedFile && previews[selectedFile]")
          table
            thead
              tr
                th(v-for="(c,i) in formattedLines.head",@click="headerClicked(c,i)") {{c}}
            tbody
              tr(v-for="row in formattedLines.tail")
                td(v-for="c in row") {{c}}

</template>

<script>
import Vue from 'vue';
import { mapActions, mapState, mapGetters } from 'vuex';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { transformers, readSomeLines } from '@/utils';

export default {
  components: { vueDropzone: vue2Dropzone },
  name: 'ManageDatasets',
  data() {
    return {
      name: '',
      tags: '',
      upload: null,
      selectedFile: null,
      files: {},
      previews: {},
    };
  },
  computed: {
    ...mapState('dataset', ['datasetList']),
    ...mapGetters('user', ['getToken']),
    dzOpts() {
      return {
        url: '/api/dataset/file/new',
        thumbnailWidth: 150,
        headers: { Authorization: `Bearer ${this.getToken}` },
        autoProcessQueue: false,
        maxFilesize: 2048,
      };
    },
    selectedFileType() {
      if (!this.selectedFile) return '';
      const [, ext] = this.selectedFile.split('.');
      switch (ext) {
        case 'csv':
          return 'csv';
        case 'tsv':
        case 'tbl':
          return 'tsv';
        case 'json':
        case 'jsonl':
          return 'json';
        default:
          return null;
      }
    },
    formattedLines() {
      if (!this.selectedFile) return [];
      if (!this.previews[this.selectedFile]) return [];
      if (!this.selectedFileType) return [];
      const f = transformers[this.selectedFileType];
      if (!f || typeof f !== 'function') return [];
      const lines = f(this.previews[this.selectedFile]);
      return {
        head: lines[0],
        tail: lines.slice(1),
      };
    },
  },
  methods: {
    ...mapActions('dataset', ['fetchDatasets', 'newDataset']),
    ...mapActions('app', ['error']),
    fileAdded(file) {
      Vue.set(this.files, file.name, file);
      Vue.set(this.previews, file.name, []);
      if (!this.selectedFile) {
        this.selectedFile = file.name;
      }
      readSomeLines(file, 10,
        (line) => { this.previews[file.name].push(line.replace(/\r\n|\n/, '')); }, // forEachLine(line)
        () => {}); // done()
    },
    async sendForm() {
      await this.newDataset({ name: this.name, tags: this.tags });
      this.name = '';
      this.tags = '';
    },
  },
  async mounted() {
    await this.fetchDatasets();
  },
};
</script>

<style lang="scss" scoped>
.manage-datasets {
  display: flex;
  flex-direction: column;
  .dataset-list,
  .manage {
    flex-grow: 1;
  }
  .dataset-list {
    display: flex;
    flex-direction: column;
    .dataset {
      display: flex;
      flex-direction: row;
      justify-content:space-around;
    }
  }
}
</style>
