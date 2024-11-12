var gallery_items = [];

function load_gallery_from_storage() {
    var stored = localStorage.getItem("gallery_items");
    if (stored)
        gallery_items = JSON.parse(stored);
}

function save_gallery_from_storage() {
    localStorage.setItem("gallery_items", JSON.stringify(gallery_items));
}

function create_gallery_from_storage(item, index) {
    var div = document.createElement("div");
    div.className = "col-md-4 mb-4";
    
    var commentsHtml = "";
    for (var i = 0; i < item.comments.length; i++) {
        commentsHtml += '<p class="small mb-1">' + item.comments[i] + '</p>';
    }
    
    div.innerHTML = `
        <div class="card">
            <img src="${item.imageUrl}" class="card-img-top" alt="Gallery image">
            <div class="card-body">
                <p class="card-text">${item.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <button class="btn btn-sm btn-outline-primary like-btn" onclick="handle_like(${index})">
                        Like ${item.likes}
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="handle_delete(${index})">
                        Delete
                    </button>
                </div>
                <div class="comments mt-3">
                    ${commentsHtml}
                </div>
                <form class="comment-form mt-2" onsubmit="handle_comment_submit(event, ${index})">
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" placeholder="Add a comment">
                        <div class="input-group-append">
                            <button class="btn btn-sm btn-primary" type="submit">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
    return div;
}

function refresh_gallery_from_storage() {
    var container = document.getElementById("gallery-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    for (var i = 0; i < gallery_items.length; i++) {
        var galleryItem = create_gallery_from_storage(gallery_items[i], i);
        container.appendChild(galleryItem);
    }
}

function handle_image_upload(event) {
    event.preventDefault();
    
    var fileInput = event.target.querySelector('input[type="file"]');
    var descInput = event.target.querySelector('input[type="text"]');
    
    var file = fileInput.files[0];
    if (!file) {
        alert("Please select an image to upload");
        return;
    }
    
    var imageUrl = URL.createObjectURL(file);
    
    var newItem = {
        imageUrl: imageUrl,
        description: descInput.value || "No description",
        likes: 0,
        comments: []
    };
    
    gallery_items.push(newItem);
    save_gallery_from_storage();
    refresh_gallery_from_storage();
    event.target.reset();
}

function handle_like(index) {
    if (index >= 0 && index < gallery_items.length) {
        gallery_items[index].likes += 1;
        save_gallery_from_storage();
        refresh_gallery_from_storage();
    }
}

function handle_comment_submit(event, index) {
    event.preventDefault();
    
    if (index >= 0 && index < gallery_items.length) {
        var input = event.target.querySelector('input[type="text"]');
        var comment = input.value.trim();
        
        if (comment) {
            gallery_items[index].comments.push(comment);
            save_gallery_from_storage();
            refresh_gallery_from_storage();
            input.value = '';
        }
    }
}

function handle_delete(index) {
    if (index >= 0 && index < gallery_items.length) {
        if (confirm("Are you sure you want to delete this image?")) {
            gallery_items.splice(index, 1);
            save_gallery_from_storage();
            refresh_gallery_from_storage();
        }
    }
}

function initialize_gallery() {
    load_gallery_from_storage();
    refresh_gallery_from_storage();
    
    var uploadForm = document.getElementById("upload-form");
    if (uploadForm)
        uploadForm.addEventListener("submit", handle_image_upload);
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", initialize_gallery);
} else {
    initialize_gallery();
}