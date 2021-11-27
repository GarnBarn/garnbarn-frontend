<template>
  <div class="flex-col detail full-screen">
    <div v-if="creationType === 'assignment'">
      <md-field :md-counter="false">
        <label>Assignment name:</label>
        <md-input v-model="apiData.name" maxlength="100" required></md-input>
      </md-field>

      <md-field>
        <label>Tag:</label>
        <md-select v-model="apiData.tagId">
          <md-option :value="item.id" v-for="item in tags" :key="item.id">{{
            item.name
          }}</md-option>
        </md-select>
      </md-field>

      <md-field :md-counter="false">
        <label>Description:</label>
        <md-textarea v-model="apiData.description" maxlength="1000"></md-textarea>
      </md-field>

      <label>Due Date:</label>
      <date-picker
        v-model="apiData.dueDate"
        type="datetime"
        value-type="timestamp"
        :minute-step="30"
        format="DD/MM/YY HH:mm"
      ></date-picker>
    </div>
    <div v-if="creationType === 'tag'" class="overflow">
      <div>
        <md-field :md-counter="false">
          <label>Tag name:</label>
          <md-input v-model="apiData.name" maxlength="20" required></md-input>
        </md-field>
      </div>

      <div>
        <label>Color:</label><br />
        <v-color-picker
          dot-size="25"
          hide-canvas
          hide-sliders
          mode="hexa"
          show-swatches
          hide-mode-switch
          swatches-max-height="100"
          :value="defaultColorCode"
          @update:color="updateApiColor"
        ></v-color-picker>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AssignmentApi } from "@/types/GarnBarnApi/AssignmentApi";
import { TagApi } from "@/types/GarnBarnApi/TagApi";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import firebase from "firebase/app";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import { Tag } from "@/types/garnbarn/Tag";

@Component({
  components: {
    DatePicker,
  },
})
export default class Create extends Vue {
  @Prop({ required: true }) creationType!: "assignment" | "tag";
  @Prop({ required: true }) apiData!: AssignmentApi | TagApi;
  @Prop({ required: true }) firebaseUser!: firebase.User;

  defaultColorCode: any = "";
  garnBarnApiCaller: GarnBarnApi | null = null;
  tags: Array<Tag> = [];
  isFirstSelectColor = true;

  mounted() {
    this.garnBarnApiCaller = new GarnBarnApi(this.firebaseUser);
    this.garnBarnApiCaller.v1.tags.all().then(async (apiResponse) => {
      this.tags = apiResponse.data.results;
      let nextFunction = apiResponse.data.next;
      while (typeof nextFunction === "function") {
        const response = await nextFunction();
        this.tags = this.tags.concat(response.data.results);
        nextFunction = response.data.next;
      }
    });
    this.defaultColorCode = (this.apiData as TagApi).color;
  }

  updateApiColor(color: any) {
    if (this.isFirstSelectColor) {
      this.isFirstSelectColor = false;
      return;
    }
    (this.apiData as TagApi).color = color.hex;
  }
}
</script>

<style scoped>
.detail {
  margin: 1rem 4rem;
}

.flex-col {
  flex: 1 1 0%;
  flex-direction: column;
}

.overflow {
  overflow: auto;
}
</style>
