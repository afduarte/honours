<template lang="pug">
  .new-dataset
    h3 Add dataset
    .name
      p Name
      input(type="text", v-model="name")
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
                button(type="submit", @click.prevent="sendForm", :disabled="!submitEnabled") Submit
</template>
<script>
import Vue from 'vue';
import selectColumn from '@/components/SelectColumn.vue';
import { transformers, readSomeLines } from '@/utils';

export default {
  name: 'dataset-form',
  components: { selectColumn },
  props: { existing: { type: Array } },
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
      return (
        (fields.IDIdx || fields.IDIdx === 0)
        && (fields.UserIdx || fields.UserIdx === 0)
      );
    },
  },
  methods: {
    fileFieldChanged(evt) {
      const { files } = evt.target;
      files.forEach((file) => {
        this.fileAdded(file);
      });
    },
    fileAdded(file) {
      Vue.set(this.files, file.name, file);
      Vue.set(this.previews, file.name, []);
      Vue.set(this.fileFields, file.name, {
        IDIdx: null,
        UserIdx: null,
        ResponseIdx: null,
      });
      if (!this.selectedFile) {
        this.selectedFile = file.name;
      }
      if (!this.name) {
        this.name = 'Untitled Dataset';
        let counter = 1;
        while (this.existing.find(d => d.Name === this.name)) {
          this.name = `Untitled Dataset (${counter})`;
          counter += 1;
        }
      }
      readSomeLines(
        file,
        10,
        (line) => {
          this.previews[file.name].push(line.replace(/\r\n|\n/, ''));
        }, // forEachLine(line)
        () => {},
      ); // done()
    },
    headerClicked(idx) {
      Vue.set(this.editing, idx, !this.editing[idx]);
    },
    fieldMarked(value, idx) {
      Vue.set(this.fileFields[this.selectedFile], value, idx);
    },
    sendForm() {
      if (!this.name) {
        this.name = 'Untitled Dataset';
      }
      this.$emit('submit', {
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
};
</script>
<style lang="scss" scoped>

// Table styles
// Heavily inspired on https://codepen.io/alico/pen/bpLgOL
table {
  padding: 10px;
  border-spacing: 1;
  border-collapse: collapse;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  position: relative;

  * {
    position: relative;
  }

  td,
  th {
    padding-left: 8px;
    border-right: solid 2px #333333;
    border-left: solid 2px #333333;
  }

  thead tr {
    height: 60px;
    font-size: 16px;
  }

  tbody tr {
    height: 48px;
    border-bottom: 1px solid #d6d6d6;
    &:last-child {
      border: 0;
    }
  }

  td,
  th {
    text-align: left;
    &.l {
      text-align: right;
    }
    &.c {
      text-align: center;
    }
    &.r {
      text-align: center;
    }
  }
}
</style>
