<div>
    @if($uploaded)
        <p>Uploaded: {{ $filename }}</p>
    @else
        <input type="file" @change="livue.upload('photo', $event.target.files[0])">
        <button @click="savePhoto">Upload</button>
    @endif
</div>
