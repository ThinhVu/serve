<script lang="tsx">
import dialog from '@/components/System/dialog.jsx';
import IcoFolder from '@/assets/images/folder.svg';
import {feAPI} from '@/api/index.js';
import File from './File.vue';
import Imgx from "./Imgx.vue";
import Preview from "./Preview.vue";

export default {
  components: {File},
  setup() {
    const folders = ref([])
    const items = ref([])
    const selectedFolder = ref();

    const loadFolderTree = async () => {
      const childs = await feAPI.folder.ls()
      folders.value = childs.filter(c => c.isFolder)
      items.value = childs.filter(c => !c.isFolder)
    }

    onMounted(loadFolderTree)

    const onFileClicked = async (file) => {
      console.log('onFileClicked', file)
      await dialog.show({component: Preview, data: file})
    }

    const selectCategory = async (e, item) => {
      e.preventDefault();
      e.stopPropagation();
      selectedFolder.value = item;
      if (item.isFolder) {
        if (item.folders.length === 0) {
          const childs = await feAPI.folder.ls(item.path)
          item.folders = childs.filter(c => c.isFolder)
          item.files = childs.filter(c => !c.isFolder)
          items.value = item.files
        }
      }
    }

    const renderFolderTree = (folders, isChild) => <div class="fc">
      {folders.map(folder => <><div
            class={['clickable py-1', isChild ? 'pr-1' : 'px-1']}
            style={['color: #fff', { background: selectedFolder.value === folder ? '#ffffff33' : 'transparent' }]}
            onClick={(e) => selectCategory(e, folder)}>
        {isChild && <span>-- </span>}
          <img src={IcoFolder} width="16"/>
          <span class="ml-1">{folder.name}</span>
        </div>
        {Array.isArray(folder.folders) ? <div class="rel" style="margin-left: 15px;">
          <div class="abs" style="margin-top: -10px; border-left: 1px dashed white; width: 1px; height: 100%"/>
          <div>
            {renderFolderTree(folder.folders, true)}
          </div>
        </div> : null }
      </>)}
    </div>

    return () => <div class="fr f1 h-100vh">
      <div class="h-100vh ovf-y-s hide-scroll-bar" style="width: 200px; min-width: 200px; border-right: 1px solid #575665">
        {renderFolderTree(folders.value, false)}
      </div>
      <div class="h-100vh ovf-y-s hide-scroll-bar px-1 py-1 grid"
          style="grid-template-columns: repeat(auto-fill, 300px); grid-template-rows: 340px; grid-auto-rows: 340px; gap: 0.5rem; width: calc(100% - 200px)">
        {items.value.map(v => <file key={v.name} {...v} onTrigger={() => onFileClicked(v)}/>)}
      </div>
    </div>
  }
}
</script>
