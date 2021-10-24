<template>
    <div style={background-color: {{ tag.color }}} class="box">
        <p>{{ tag.id }}</p>
    </div>
</template>

<script lang="ts">
import { Prop, Vue } from "vue-property-decorator";
import { Tag } from "@/types/garnbarn/Tag";

// binded value are at $attrs not tag prop.
// TODO: set inheritattrs: false
export default class TagBox extends Vue {
    @Prop({ required: true }) readonly tag!: Tag;
}
</script>

<style scoped>
.box {
    display: flex;
    justify-self: center;
    width: 80px;
    height: 50px;
    margin: 0px 20px;
    border-radius: 20px;
}
</style>