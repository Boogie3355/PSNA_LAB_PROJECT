document.getElementById('lab-booking').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const lab = document.getElementById('lab').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const purpose = document.getElementById('purpose').value;
    const bookingData = {
        lab,
        date,
        time,
        purpose
    };

    console.log('Booking Details:', bookingData);
    alert('Lab booking request submitted successfully!');
    this.reset();
});
document.getElementById('date').min = new Date().toISOString().split('T')[0];

const labDetails = {
    'Ground Floor-lab': {
        name: 'Ground Floor Lab',
        image: '-----------------------.jpg',
        facilities: [
            'Air Conditioning',
            'High-Speed Internet',
            'UPS Backup',
            'Projector Screen'
        ],
        equipment: [
            '30 Dell Desktop Computers',
            'Cisco Networking Equipment',
            'Laser Printer',
            'Interactive Whiteboard'
        ],
        schedule: 'Available Monday to Friday, 9:00 AM to 5:00 PM'
    },
    'IOT-lab': {
        name: 'IOT Lab',
        image: '------------------.jpg',
        facilities: [
            'Air Conditioning',
            'Safety Equipment',
            'First Aid Kit',
            'Storage Cabinets'
        ],
        equipment: [
            'Oscilloscopes',
            'Wave Motion Apparatus',
            'Optical Benches',
            'Electrical Measurement Tools'
        ],
        schedule: 'Available Monday to Friday, 9:00 AM to 4:00 PM'
    },
    'First Floor-lab': {
        name: 'First Floor Lab',
        image: '----------------.jpg',
        facilities: [
            'Air Conditioning',
            'Fume Hoods',
            'Emergency Shower',
            'Eye Wash Station',
            'Chemical Storage Room'
        ],
        equipment: [
            'Analytical Balance',
            'pH Meters',
            'Spectrophotometer',
            'Distillation Setup',
            'Chemical Reagents'
        ],
        schedule: 'Available Monday to Friday, 9:00 AM to 4:00 PM'
    },
    'Second Floor-lab': {
        name: 'Secound Floor Lab',
        image: '-----------------.jpg',
        facilities: [
            'Air Conditioning',
            'Anti-static Workstations',
            'Power Supply Units',
            'Component Storage'
        ],
        equipment: [
            'Oscilloscopes',
            'Function Generators',
            'Digital Multimeters',
            'Soldering Stations',
            'PCB Design Tools'
        ],
        schedule: 'Available Monday to Friday, 8:00 AM to 6:00 PM'
    },
    'English-lab': {
        name: 'English Lab',
        image: '--------------------.jpg',
        facilities: [
            'Air Conditioning',
            'Specimen Storage',
            'Sterilization Room',
            'Dark Room',
            'Safety Equipment'
        ],
        equipment: [
            'Microscopes',
            'Incubators',
            'Centrifuges',
            'Water Bath',
            'Dissection Kits'
        ],
        schedule: 'Available Monday to Friday, 9:00 AM to 5:00 PM'
    },
    'digital-lab': {
        name: 'Digital Electronics Lab',
        image: 'images/digital-lab.jpg',
        facilities: [
            'Air Conditioning',
            'ESD Protection',
            'Workbenches',
            'Project Storage',
            'Testing Area'
        ],
        equipment: [
            'FPGA Development Boards',
            'Logic Analyzers',
            'Microcontroller Kits',
            'Digital IC Testers',
            'Programming Tools'
        ],
        schedule: 'Available Monday to Friday, 9:00 AM to 6:00 PM'
    },
    'robotics-lab': {
        name: 'Robotics Lab',
        image: 'images/robotics-lab.jpg',
        facilities: [
            'Air Conditioning',
            'Testing Arena',
            'Assembly Stations',
            'Programming Stations',
            'Component Storage'
        ],
        equipment: [
            'Robot Kits',
            'Arduino Sets',
            'Raspberry Pi Boards',
            'Sensors Collection',
            '3D Printer',
            'Testing Equipment'
        ],
        schedule: 'Available Monday to F=riday, 9:00 AM to 6:00 PM'
    },
    'CSE Main Hall-lab': {
        name: 'CSE Main Hall',
        image: 'images/language-lab.jpg',
        facilities: [
            'Air Conditioning',
            'Sound-proof Cubicles',
            'Audio Control Room',
            'Recording Studio',
            'Multimedia Center'
        ],
        equipment: [
            'Language Learning Software',
            'Headphones with Microphones',
            'Interactive Display',
            'Audio Recording Equipment',
            'Language Learning Materials'
        ],
        schedule: 'Available Monday to Friday, 8:00 AM to 7:00 PM'
    }
};


function openLabDetails(labId) {
    const modal = document.getElementById('labDetailsModal');
    const lab = labDetails[labId];

    document.getElementById('modalLabName').textContent = lab.name;
    document.getElementById('modalLabImage').src = lab.image;
    
    const facilitiesList = document.getElementById('modalLabFacilities');
    facilitiesList.innerHTML = lab.facilities.map(item => `<li>${item}</li>`).join('');
    
    const equipmentList = document.getElementById('modalLabEquipment');
    equipmentList.innerHTML = lab.equipment.map(item => `<li>${item}</li>`).join('');
    
    document.getElementById('modalLabSchedule').textContent = lab.schedule;
    
    modal.style.display = 'block';
}

function closeLabDetails() {
    document.getElementById('labDetailsModal').style.display = 'none';
}

function proceedToBooking() {
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
    closeLabDetails();
}

window.onclick = function(event) {
    const modal = document.getElementById('labDetailsModal');
    if (event.target == modal) {
        closeLabDetails();
    }
}

document.getElementById('searchLab').addEventListener('input', function(e) {
    applyFilters();
});

document.getElementById('filterCapacity').addEventListener('change', function() {
    applyFilters();
});

document.getElementById('filterAvailability').addEventListener('change', function() {
    applyFilters();
});

function applyFilters() {
    const capacityFilter = document.getElementById('filterCapacity').value;
    const availabilityFilter = document.getElementById('filterAvailability').value;
    const searchTerm = document.getElementById('searchLab').value.toLowerCase();
    
    const labCards = document.querySelectorAll('.lab-card');
    
    labCards.forEach(card => {
        const labName = card.querySelector('h3').textContent.toLowerCase();
        const labDesc = card.querySelector('p').textContent.toLowerCase();
        const capacityText = card.querySelector('.lab-details span:first-child').textContent;
        const capacity = parseInt(capacityText.match(/\d+/)[0]); 
    
        const labId = card.querySelector('.book-btn').getAttribute('onclick').match(/'([^']+)'/)[1];
        const schedule = labDetails[labId].schedule;
        
        let showCard = true;
        if (capacityFilter) {
            const minCapacity = parseInt(capacityFilter);
            showCard = showCard && capacity >= minCapacity;
        }
        if (availabilityFilter) {
            let matchesTime = false;
            switch(availabilityFilter) {
                case 'morning':
                    matchesTime = schedule.toLowerCase().includes('9:00 am') || 
                                schedule.toLowerCase().includes('10:00 am') ||
                                schedule.toLowerCase().includes('11:00 am');
                    break;
                case 'afternoon':
                    matchesTime = schedule.toLowerCase().includes('12:00 pm') || 
                                schedule.toLowerCase().includes('1:00 pm') ||
                                schedule.toLowerCase().includes('2:00 pm') ||
                                schedule.toLowerCase().includes('3:00 pm') ||
                                schedule.toLowerCase().includes('4:00 pm');
                    break;
                case 'evening':
                    matchesTime = schedule.toLowerCase().includes('4:00 pm') || 
                                schedule.toLowerCase().includes('5:00 pm') ||
                                schedule.toLowerCase().includes('6:00 pm') ||
                                schedule.toLowerCase().includes('7:00 pm');
                    break;
            }
            showCard = showCard && matchesTime;
        }
        if (searchTerm) {
            const matchesSearch = labName.includes(searchTerm) || labDesc.includes(searchTerm);
            showCard = showCard && matchesSearch;
        }
        card.style.display = showCard ? 'block' : 'none';
    });
}
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    console.log('Login attempt:', { username, password });
    
    
    if (username && password) {
        alert('Login successful!');
        closeLoginModal();
        
        
        document.getElementById('booking-history').classList.remove('hidden');
        
        
        updateLoginState(true);
    } else {
        alert('Please enter both username and password');
    }
});


function updateLoginState(isLoggedIn) {
    const loginLink = document.querySelector('a[href="#login"]');
    if (isLoggedIn) {
        loginLink.textContent = 'Logout';
        loginLink.href = '#logout';
        loginLink.onclick = handleLogout;
    } else {
        loginLink.textContent = 'Login';
        loginLink.href = '#login';
        loginLink.onclick = openLoginModal;
    }
}


function handleLogout() {
    
    document.getElementById('booking-history').classList.add('hidden');
    updateLoginState(false);
    alert('Logged out successfully!');
}


document.querySelector('a[href="#login"]').onclick = function(e) {
    e.preventDefault();
    openLoginModal();
};


window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    if (event.target == loginModal) {
        closeLoginModal();
    }
};

function showBookingHistory() {
    document.getElementById('booking-history').classList.remove('hidden');
}

function showBookings(type) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    
    const bookingsList = document.querySelector('.bookings-list');
    if (type === 'upcoming') {
        bookingsList.innerHTML = `
            <div class="booking-item">
                <h3>Computer Lab</h3>
                <p>Date: 2024-03-25</p>
                <p>Time: 9:00 AM - 10:00 AM</p>
                <button class="cancel-btn">Cancel Booking</button>
            </div>
        `;
    } else {
        bookingsList.innerHTML = `
            <div class="booking-item">
                <h3>Physics Lab</h3>
                <p>Date: 2024-03-20</p>
                <p>Time: 11:00 AM - 12:00 PM</p>
                <span class="status completed">Completed</span>
            </div>
        `;
    }
}


let currentDate = new Date();
let selectedSlot = null;

function generateCalendar() {
    const daysGrid = document.getElementById('calendarDays');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    
    updateCurrentWeekDisplay();
    daysGrid.innerHTML = '';
    
    days.forEach(day => {
        const dayColumn = document.createElement('div');
        dayColumn.className = 'day-column';
        
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        
        const dayName = document.createElement('span');
        dayName.className = 'day-name';
        dayName.textContent = day;
        
        const dayDate = document.createElement('span');
        dayDate.className = 'day-date';
        dayDate.textContent = getDateForDay(day);
        
        dayHeader.appendChild(dayName);
        dayHeader.appendChild(dayDate);
        dayColumn.appendChild(dayHeader);
        
        timeSlots.forEach(time => {
            const slot = document.createElement('div');
            const isAvailable = Math.random() > 0.3; // Random availability for demo
            slot.className = `slot ${isAvailable ? 'available' : 'booked'}`;
            slot.dataset.day = day;
            slot.dataset.time = time;
            slot.onclick = handleSlotClick;
            
            // Add content to slot
            const slotContent = document.createElement('div');
            slotContent.className = 'slot-content';
            slotContent.textContent = isAvailable ? 'Available' : 'Booked';
            slot.appendChild(slotContent);
            
            dayColumn.appendChild(slot);
        });
        
        daysGrid.appendChild(dayColumn);
    });
}

function handleSlotClick(event) {
    const slot = event.currentTarget;
    if (slot.classList.contains('booked')) {
        alert('This slot is already booked');
        return;
    }
    
    
    if (selectedSlot) {
        selectedSlot.classList.remove('selected');
    }
    
    
    slot.classList.add('selected');
    selectedSlot = slot;
    
    
    const day = slot.dataset.day;
    const time = slot.dataset.time;
    const selectedLab = document.getElementById('calendarLab').value;
    
    if (selectedLab) {
        document.getElementById('lab').value = selectedLab;
    }
    
    
    const date = getDateForDay(day);
    document.getElementById('date').value = formatDateForInput(date);
    document.getElementById('time').value = convertTimeToSlot(time);
    
    
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
}

function updateCurrentWeekDisplay() {
    const startDate = getWeekStartDate();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);
    
    const options = { 
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };

    const dateRange = `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
    document.getElementById('currentWeek').textContent = dateRange;
}

function prevWeek() {
    currentDate.setDate(currentDate.getDate() - 7);
    generateCalendar();
}

function nextWeek() {
    currentDate.setDate(currentDate.getDate() + 7);
    generateCalendar();
}


function getWeekStartDate() {
    const date = new Date(currentDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

function getDateForDay(day) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const startDate = getWeekStartDate();
    const dayIndex = days.indexOf(day);
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayIndex);
    
    
    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    };
    return date.toLocaleDateString('en-US', options);
}

function formatDateForInput(date) {
    return date.toISOString().split('T')[0];
}

function convertTimeToSlot(time) {
    const hour = parseInt(time);
    return `${hour}-${hour + 1}`;
}


generateCalendar();

document.getElementById('calendarLab').addEventListener('change', function() {
    generateCalendar();
});


let currentRating = 0;

document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('mouseover', function() {
        const rating = this.dataset.rating;
        highlightStars(rating);
    });
    
    star.addEventListener('click', function() {
        currentRating = this.dataset.rating;
        highlightStars(currentRating);
    });
});

document.querySelector('.star-rating').addEventListener('mouseleave', function() {
    highlightStars(currentRating);
});

function highlightStars(rating) {
    document.querySelectorAll('.star').forEach(star => {
        star.classList.toggle('active', star.dataset.rating <= rating);
    });
}

function submitFeedback() {
    const lab = document.getElementById('feedbackLab').value;
    const comment = document.getElementById('feedbackComment').value;
    
    if (!lab || !currentRating || !comment) {
        alert('Please fill in all fields');
        return;
    }
    
    
    const feedbackData = {
        lab,
        rating: currentRating,
        comment
    };
    
    console.log('Feedback:', feedbackData);
    alert('Thank you for your feedback!');
    
    
    document.getElementById('feedbackLab').value = '';
    document.getElementById('feedbackComment').value = '';
    currentRating = 0;
    highlightStars(0);
}


function populateLabSelectors() {
    const labSelectors = ['calendarLab', 'lab', 'feedbackLab'];
    
    const labOptions = Object.entries(labDetails).map(([value, lab]) => `
        <option value="${value}">${lab.name}</option>
    `).join('');

    labSelectors.forEach(selectorId => {
        const selector = document.getElementById(selectorId);
        if (selector) {
            
            const firstOption = selector.firstElementChild;
            selector.innerHTML = firstOption.outerHTML + labOptions;
        }
    });
}


populateLabSelectors();


function generateBookingQR(bookingId) {
    const qrData = {
        bookingId: bookingId,
        lab: document.getElementById('lab').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };
    
    
    const qr = new QRCode(document.getElementById("qrcode"), {
        text: JSON.stringify(qrData),
        width: 128,
        height: 128
    });
    
    return qr;
}

function sendBookingConfirmation(bookingDetails) {
    
    emailjs.send("service_id", "template_id", {
        to_email: userEmail,
        booking_id: bookingDetails.id,
        lab_name: bookingDetails.lab,
        date: bookingDetails.date,
        time: bookingDetails.time,
        qr_code: bookingDetails.qrCode
    }).then(
        (response) => {
            console.log("Email sent successfully");
        },
        (error) => {
            console.log("Failed to send email:", error);
        }
    );
}


const ws = new WebSocket('ws://your-server-url');

ws.onmessage = function(event) {
    const update = JSON.parse(event.data);
    updateLabStatus(update);
};

function updateLabStatus(status) {
    const labElement = document.querySelector(`[data-lab-id="${status.labId}"]`);
    if (labElement) {
        labElement.classList.remove('available', 'booked', 'maintenance');
        labElement.classList.add(status.status);
        labElement.querySelector('.status-text').textContent = status.statusText;
    }
}

function scheduleLabMaintenance(labId, date, duration) {
    const maintenanceData = {
        labId,
        date,
        duration,
        status: 'scheduled'
    };

    
    maintenanceSchedule.push(maintenanceData);
    
    
    updateLabAvailability(labId, date, duration);
    
    
    notifyAffectedBookings(labId, date, duration);
}


function filterLabs() {
    const capacityFilter = document.getElementById('capacity-filter').value;
    const availabilityFilter = document.getElementById('availability-filter').value;
    const labCards = document.querySelectorAll('.lab-card');

    labCards.forEach(card => {
        const capacity = parseInt(card.dataset.capacity);
        const isAvailable = card.dataset.available === 'true';
        
        let showCard = true;

        
        if (capacityFilter) {
            const minCapacity = parseInt(capacityFilter);
            if (capacity < minCapacity) {
                showCard = false;
            }
        }

        
        if (availabilityFilter !== 'all') {
            const shouldBeAvailable = availabilityFilter === 'available';
            if (shouldBeAvailable !== isAvailable) {
                showCard = false;
            }
        }

        
        card.style.display = showCard ? 'block' : 'none';
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const capacityFilter = document.getElementById('capacity-filter');
    const availabilityFilter = document.getElementById('availability-filter');

    if (capacityFilter) {
        capacityFilter.addEventListener('change', filterLabs);
    }

    if (availabilityFilter) {
        availabilityFilter.addEventListener('change', filterLabs);
    }
});


function resetFilters() {
    const capacityFilter = document.getElementById('capacity-filter');
    const availabilityFilter = document.getElementById('availability-filter');

    if (capacityFilter) capacityFilter.value = '';
    if (availabilityFilter) availabilityFilter.value = 'all';


    const labCards = document.querySelectorAll('.lab-card');
    labCards.forEach(card => {
        card.style.display = 'block';
    });
} 