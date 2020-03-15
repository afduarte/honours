<template lang="pug">
  .new-dataset
    .fields
      .name
        p Name
        input(type="text", v-model="name")
      .file-input(v-if="!selectedFile")
        input#file(type="file",@change="fileFieldChanged")
        label(for="file") Select file
      .file-input(v-else)
        button.delete(v-if="selectedFile", @click="selectedFile=null")
          fa-icon(:icon="['far','trash-alt']")
          |  {{files[selectedFile].name}}
        button(type="submit", @click.prevent="sendForm", :disabled="!submitEnabled") Add Dataset
    .preview
      template(v-if="selectedFile && previews[selectedFile]")
        table
          thead
            tr
              th(v-for="(c,i) in formattedLines[0]", @click="headerClicked(i)")
                select-column(:options="fields", @selected="fieldMarked($event,i)")
          tbody
            tr(v-for="row in formattedLines")
              td(v-for="c in row") {{c}}
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
      return f(this.previews[this.selectedFile]);
    },
    submitEnabled() {
      const fields = this.fileFields[this.selectedFile];
      return fields.UserIdx || fields.UserIdx === 0;
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
      this.files = { [file.name]: file };
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
.fields {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10px;
  .name p{
    margin-block-end: 0.3em;
  }
}
.file-input {
  label {
    display: block;
    transition: 500ms;
    border: 2px solid #333333;
    border-radius: 5px;
    background-color: white;
    color: #333333;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background-color: #333333;
      color: #ffffff;
    }
  }
  button, label {
    margin-bottom: 5px;
    margin-left: 15px;
  }
  button.delete {
    &:hover {
      background-color: #ff5353;
      border: 2px solid #ff9b9b;
      color: #ffffff;
    }
  }
  input {
    display: none;
  }
}
// Table styles
// Heavily inspired on https://codepen.io/alico/pen/bpLgOL
table {
  font-size: 16px;
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
    padding-left: 10px;
  }

  thead tr {
    height: 50px;
    font-size: 16px;
  }

  tbody tr {
    height: 2.3em;
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
