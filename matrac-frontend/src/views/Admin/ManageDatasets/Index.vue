<template lang="pug">
  .manage-datasets
    .dataset-list
      template(v-for="(d, i) in datasetList")
        .dataset
          p ID: {{d.Name}}
          p Type: {{d.Type}}
          p Unique Field: {{d.IDIdx}}
          p Annotation Target: {{d.UserIdx}}
          p Context Field: {{d.ResponseIdx}}

    .manage
      .new-dataset
        h3 Add dataset
        .name
          p Name
          input(type="text", v-model="name")
        //- vue-dropzone(ref="datasetUpload",
        //-   id="datasetUpload",
        //-   :options="dzOpts",
        //-   @vdropzone-file-added="fileAdded"
        //- )
        .file-input
          input(type="file",@change="fileFieldChanged")
        .preview
          button(v-for="(v,k) in files",@click="selectedFile=k") {{k}}
          template(v-if="selectedFile && previews[selectedFile]")
            table
              thead
                tr
                  th(v-for="(c,i) in formattedLines.head", @click="headerClicked(i)")
                    select-column(
                      :text="c",
                      :options="fields",
                      :editing="editing[i]",
                      @selected="fieldMarked($event,i)")
              tbody
                tr(v-for="row in formattedLines.tail")
                  td(v-for="c in row") {{c}}
              tfoot
                tr
                  td
                    button(type="submit",
                      @click.prevent="sendForm",
                      :disabled="!submitEnabled") Submit

</template>

<script>
import Vue from 'vue';
import { mapActions, mapState, mapGetters } from 'vuex';
import { transformers, readSomeLines } from '@/utils';
import selectColumn from '@/components/SelectColumn.vue';

export default {
  components: { selectColumn },
  name: 'ManageDatasets',
  data() {
    return {
      name: '',
      selectedFile: null,
      files: {},
      previews: {},
      editing: {},
      fileFields: {},
      fields: {
        IDIdx: 'Unique Field',
        UserIdx: 'Annotation Target',
        ResponseIdx: 'Context Field',
      },
    };
  },
  computed: {
    ...mapState('dataset', ['datasetList']),
    ...mapGetters('user', ['getToken']),
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
    submitEnabled() {
      const fields = this.fileFields[this.selectedFile];
      return (fields.IDIdx || fields.IDIdx === 0) && (fields.UserIdx || fields.UserIdx === 0);
    },
  },
  methods: {
    ...mapActions('dataset', ['fetchDatasets', 'newDataset']),
    ...mapActions('app', ['error']),
    fileFieldChanged(evt) {
      const { files } = evt.target;
      files.forEach((file) => {
        this.fileAdded(file);
      });
    },
    fileAdded(file) {
      Vue.set(this.files, file.name, file);
      Vue.set(this.previews, file.name, []);
      Vue.set(this.fileFields, file.name, { IDIdx: null, UserIdx: null, ResponseIdx: null });
      if (!this.selectedFile) {
        this.selectedFile = file.name;
      }
      if (!this.name) {
        this.name = 'Untitled Dataset';
        let counter = 1;
        while (this.datasetList.find(d => d.Name === this.name)) {
          this.name = `Untitled Dataset (${counter})`;
          counter += 1;
        }
      }
      readSomeLines(file, 10,
        (line) => { this.previews[file.name].push(line.replace(/\r\n|\n/, '')); }, // forEachLine(line)
        () => {}); // done()
    },
    headerClicked(idx) {
      Vue.set(this.editing, idx, !this.editing[idx]);
    },
    fieldMarked(value, idx) {
      Vue.set(this.fileFields[this.selectedFile], value, idx);
    },
    async sendForm() {
      if (this.submitDisabled) {
        this.error('Can\'t upload file until all fields are selected in table');
        return;
      }
      if (!this.name) {
        this.name = 'Untitled Dataset';
      }
      await this.newDataset({
        name: this.name,
        type: this.selectedFileType,
        files: Object.values(this.files),
        ...this.fileFields[this.selectedFile],
      });
      this.name = '';
      this.files = {};
      this.selectedFile = null;
      this.previews = {};
      this.editing = {};
      this.fileFields = {};
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
  .manage{
    table {
      th {
        padding: 0 5px;
      }
    }
  }
}
</style>
