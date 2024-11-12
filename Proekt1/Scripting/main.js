function check_form_data(form_data) {
    if (!form_data.full_name || form_data.full_name.trim() == "") {
        alert("Please enter your full name");
        return false;
    }
    
    if (!form_data.email) {
        alert("Please enter a valid email address");
        return false;
    }
    
    if (!form_data.vehicle || form_data.vehicle.trim() == "") {
        alert("Please select a vehicle");
        return false;
    }
    
    if (!form_data.date) {
        alert("Please select a preferred date");
        return false;
    }
    
    return true;
}

function filter_new_vehicles() {
    var price_range = document.querySelector('#price-filter').value;
    var vehicle_type = document.querySelector('#type-filter').value;
    
    var vehicles = document.querySelectorAll('.vehicle-item');
    
    for (var i = 0; i < vehicles.length; i++) {
        var vehicle = vehicles[i];
        var price = parseInt(vehicle.getAttribute('data-price'));
        var type = vehicle.getAttribute('data-type');
        var show = true;
        
        if (price_range) {
            switch(price_range) {
                case 'under30':
                    show = (price < 30000);
                    break;
                case '30to50':
                    show = (price >= 30000 && price < 50000);
                    break;
                case '50to70':
                    show = (price >= 50000 && price < 70000);
                    break;
                case 'above70':
                    show = (price >= 70000);
                    break;
            }
        }
        
        if (show && vehicle_type) {
            show = (type == vehicle_type);
        }
        
        if (show)
            vehicle.style.display = 'block';
        else 
            vehicle.style.display = 'none';
    }
}

function filter_used_vehicles() {
    var price_range = document.querySelector('#price-filter').value;
    var vehicle_type = document.querySelector('#type-filter').value;
    
    var vehicles = document.querySelectorAll('.vehicle-item');
    
    for (var i = 0; i < vehicles.length; i++) {
        var vehicle = vehicles[i];
        var price = parseInt(vehicle.getAttribute('data-price'));
        var type = vehicle.getAttribute('data-type');
        var show = true;
        
        if (price_range) {
            switch(price_range) {
                case 'under15':
                    show = (price < 15000);
                    break;
                case '15to30':
                    show = (price >= 15000 && price < 30000);
                    break;
                case '30to45':
                    show = (price >= 30000 && price < 45000);
                    break;
                case 'above45':
                    show = (price >= 45000);
                    break;
            }
        }
        
        if (show && vehicle_type) {
            show = (type == vehicle_type);
        }
        
        if (show)
            vehicle.style.display = 'block';
        else 
            vehicle.style.display = 'none';
    }
}

function handle_test_drive_submit(event) {
    event.preventDefault();
    
    var form_element = event.target;
    var form_data = new FormData(form_element);
    var parsed_data = Object.fromEntries(form_data.entries());
    
    if (check_form_data(parsed_data)) {
        alert("Test drive scheduled! Check your email inbox for confirmaion.");
        form_element.reset();
    }
}

function show_test_drive_form(vehicle) {
    var vehicle_input = document.querySelector('#test-drive-form input[name="vehicle"]');
    if (vehicle_input) {
        vehicle_input.value = vehicle;
    }
    
    var modal = document.getElementById("test_drive_modal");
    modal.classList.add("show");
    modal.style.display = "block";
    document.body.classList.add("modal-open");

    var backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop fade show";
    document.body.appendChild(backdrop);
}

function hide_test_drive_form() {
    var modal = document.getElementById("test_drive_modal");
    modal.classList.remove("show");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");

    var backdrop = document.querySelector(".modal-backdrop");
    if(backdrop)
        backdrop.remove();
}

function handle_test_drive_click(event) {
    show_test_drive_form(event.target.getAttribute("data-vehicle"));
}

function initialize_event_listeners() {
    var test_drive_form = document.getElementById("test-drive-form");
    if (test_drive_form)
        test_drive_form.addEventListener("submit", handle_test_drive_submit);

    var test_drive_buttons = document.querySelectorAll('[data-action="test-drive"');
    for(var i = 0; i < test_drive_buttons.length; i++) {
        var button = test_drive_buttons[i];
        button.addEventListener("click", handle_test_drive_click);
    }

    var new_filter_button = document.querySelector("#apply-new-filter");
    if(new_filter_button)
        new_filter_button.addEventListener("click", filter_new_vehicles);
    
    var used_filter_button = document.querySelector("#apply-used-filter");
    if(used_filter_button)
        used_filter_button.addEventListener("click", filter_used_vehicles);
}

function startup_procedure() {
    if (document.readyState == "loading")
        document.addEventListener("DOMContentLoaded", initialize_event_listeners); 
    else
        initialize_event_listeners();
}

startup_procedure();