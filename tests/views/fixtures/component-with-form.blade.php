<div>
    <form>
        <input type="text" v-model="form.title" placeholder="Title">
        <textarea v-model="form.content" placeholder="Content"></textarea>
        <input type="text" v-model="form.tags" placeholder="Tags">
        <label>
            <input type="checkbox" v-model="form.published">
            Published
        </label>
        <button type="button" @click="save">Save</button>
    </form>

    @if($saved)
        <div class="success">Post saved successfully!</div>
    @endif
</div>
