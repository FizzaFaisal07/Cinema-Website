// Sample movie data
const movies = [
    {
        id: 1,
        title: "The Legend of Maula Jatt",
        genre: "Action",
        duration: 170,
        rating: 8.5,
        releasedate: "2022-10-13",
        image: "https://i.tribune.com.pk/media/images/Copy-of-Untitled-(59)1727849935-0/Copy-of-Untitled-(59)1727849935-0.png",
        description: "A reboot of the 1979 cult classic, this film follows the legendary rivalry between Maula Jatt and Noori Natt."
    },
    {
        id: 2,
        title: "Jawani Phir Nahi Ani 2",
        genre: "Comedy",
        duration: 145,
        rating: 7.8,
        releasedate: "2018-08-22",
        image: "https://www.brandsynario.com/wp-content/uploads/2018/08/jawani-phir-nahi-ani-2-review.jpg",
        description: "A group of friends embark on a bachelor trip to Bangkok that turns into a series of hilarious misadventures."
    },
    {
        id: 3,
        title: "Teefa in Trouble",
        genre: "Action-Comedy",
        duration: 130,
        rating: 7.4,
        releasedate: "2018-07-20",
        image: "https://i.dawn.com/primary/2018/07/5b54ec97a4107.jpg",
        description: "A small-time crook is hired to kidnap a politician's daughter but ends up falling for her instead."
    },
    {
        id: 4,
        title: "Punjab Nahi Jaungi",
        genre: "Romantic-Comedy",
        duration: 140,
        rating: 7.5,
        releasedate: "2017-09-01",
        image: "https://m.media-amazon.com/images/M/MV5BZjFlZjI5NWEtMmY0MC00MmM5LWJiY2QtNjg5NjY4MTBmNmU5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "A love story that transcends social barriers between a feudal lord's son and a modern city girl."
    }
];

// Sample showtimes data
const showtimes = {
    today: [
        { movieId: 1, time: "10:00 AM", auditorium: "A1", price: 800 },
        { movieId: 2, time: "12:30 PM", auditorium: "B2", price: 700 },
        { movieId: 3, time: "3:00 PM", auditorium: "C3", price: 750 },
        { movieId: 4, time: "6:00 PM", auditorium: "A1", price: 850 },
        { movieId: 1, time: "9:00 PM", auditorium: "B2", price: 900 }
    ],
    tomorrow: [
        { movieId: 2, time: "11:00 AM", auditorium: "A1", price: 700 },
        { movieId: 3, time: "2:00 PM", auditorium: "B2", price: 750 },
        { movieId: 4, time: "5:00 PM", auditorium: "C3", price: 850 },
        { movieId: 1, time: "8:00 PM", auditorium: "A1", price: 900 }
    ],
    week: [
        { movieId: 1, time: "10:00 AM", auditorium: "A1", price: 800, day: "Monday" },
        { movieId: 2, time: "1:00 PM", auditorium: "B2", price: 700, day: "Tuesday" },
        { movieId: 3, time: "4:00 PM", auditorium: "C3", price: 750, day: "Wednesday" },
        { movieId: 4, time: "7:00 PM", auditorium: "A1", price: 850, day: "Thursday" },
        { movieId: 1, time: "9:30 PM", auditorium: "B2", price: 900, day: "Friday" },
        { movieId: 2, time: "11:00 AM", auditorium: "A1", price: 700, day: "Saturday" },
        { movieId: 3, time: "2:30 PM", auditorium: "B2", price: 750, day: "Saturday" },
        { movieId: 4, time: "6:00 PM", auditorium: "C3", price: 850, day: "Sunday" },
        { movieId: 1, time: "9:00 PM", auditorium: "A1", price: 900, day: "Sunday" }
    ]
};

// DOM Elements
const moviesContainer = document.getElementById('movies-container');
const todayShowtimes = document.getElementById('today-showtimes');
const tomorrowShowtimes = document.getElementById('tomorrow-showtimes');
const weekShowtimes = document.getElementById('week-showtimes');
const filterBtns = document.querySelectorAll('.filter-btn');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const bookingModal = document.getElementById('booking-modal');
const confirmationModal = document.getElementById('confirmation-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const contactForm = document.getElementById('contactForm');
const confirmBookingBtn = document.getElementById('confirm-booking');
const closeConfirmationBtn = document.getElementById('close-confirmation');
const seatsContainer = document.getElementById('seats-container');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load movies
    loadMovies();
    
    // Load showtimes
    loadShowtimes('today', todayShowtimes);
    loadShowtimes('tomorrow', tomorrowShowtimes);
    loadShowtimes('week', weekShowtimes);
    
    // Setup event listeners
    setupEventListeners();
});

// Load movies into the grid
function loadMovies() {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.genre}</span>
                    <span class="movie-rating">${movie.rating}/10</span>
                </div>
                <button class="btn btn-primary book-btn" data-id="${movie.id}" data-title="${movie.title}">Book Now</button>
            </div>
        `;
        moviesContainer.appendChild(movieCard);
    });
    
    // Add event listeners to book buttons
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const movieId = parseInt(this.getAttribute('data-id'));
            const movieTitle = this.getAttribute('data-title');
            openBookingModal(movieId, movieTitle);
        });
    });
}

// Load showtimes for a specific day
function loadShowtimes(day, container) {
    container.innerHTML = '';
    const dayShowtimes = showtimes[day];
    
    dayShowtimes.forEach(showtime => {
        const movie = movies.find(m => m.id === showtime.movieId);
        if (!movie) return;
        
        const showtimeItem = document.createElement('div');
        showtimeItem.className = 'showtime-item';
        
        if (day === 'week') {
            showtimeItem.innerHTML = `
                <div class="showtime-movie">
                    <h3>${movie.title}</h3>
                    <p>${movie.genre} • ${formatDuration(movie.duration)}</p>
                </div>
                <div class="showtime-details">
                    <div class="showtime-auditorium">Day: <span>${showtime.day}</span></div>
                    <div class="showtime-auditorium">Time: <span>${showtime.time}</span></div>
                    <div class="showtime-auditorium">Auditorium: <span>${showtime.auditorium}</span></div>
                    <button class="btn btn-primary book-showtime-btn" 
                            data-id="${movie.id}" 
                            data-title="${movie.title}" 
                            data-time="${showtime.day}, ${showtime.time}" 
                            data-auditorium="${showtime.auditorium}">
                        Book
                    </button>
                </div>
            `;
        } else {
            showtimeItem.innerHTML = `
                <div class="showtime-movie">
                    <h3>${movie.title}</h3>
                    <p>${movie.genre} • ${formatDuration(movie.duration)}</p>
                </div>
                <div class="showtime-details">
                    <div class="showtime-auditorium">Time: <span>${showtime.time}</span></div>
                    <div class="showtime-auditorium">Auditorium: <span>${showtime.auditorium}</span></div>
                    <button class="btn btn-primary book-showtime-btn" 
                            data-id="${movie.id}" 
                            data-title="${movie.title}" 
                            data-time="${showtime.time}" 
                            data-auditorium="${showtime.auditorium}">
                        Book
                    </button>
                </div>
            `;
        }
        
        container.appendChild(showtimeItem);
    });
    
    // Add event listeners to book buttons in showtimes
    container.querySelectorAll('.book-showtime-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const movieId = parseInt(this.getAttribute('data-id'));
            const movieTitle = this.getAttribute('data-title');
            const showtime = this.getAttribute('data-time');
            openBookingModal(movieId, movieTitle, showtime);
        });
    });
}

// Format duration in minutes to "Xh Ym" format
function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons for showtimes
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.showtimes-list').forEach(list => {
                list.classList.remove('active');
            });
            
            document.getElementById(`${this.dataset.day}-showtimes`).classList.add('active');
        });
    });
    
    // Modal open/close
    loginBtn.addEventListener('click', () => openModal(loginModal));
    registerBtn.addEventListener('click', () => openModal(registerModal));
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    contactForm.addEventListener('submit', handleContact);
    confirmBookingBtn.addEventListener('click', handleBooking);
    closeConfirmationBtn.addEventListener('click', () => closeModal(confirmationModal));
}

// Open modal
function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Open booking modal
function openBookingModal(movieId, movieTitle, showtime = '') {
    document.getElementById('booking-movie').value = movieTitle;
    if (showtime) {
        document.getElementById('booking-showtime').value = showtime;
    } else {
        // Default to first available showtime if none specified
        const firstShowtime = showtimes.today.find(st => st.movieId === movieId);
        if (firstShowtime) {
            document.getElementById('booking-showtime').value = firstShowtime.time;
        }
    }
    
    // Generate seats
    generateSeats();
    openModal(bookingModal);
}

// Generate seats for booking
function generateSeats() {
    seatsContainer.innerHTML = '';
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsPerRow = 10;
    
    rows.forEach(row => {
        for (let i = 1; i <= seatsPerRow; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.textContent = `${row}${i}`;
            
            // Randomly mark some seats as occupied (for demo)
            if (Math.random() < 0.2) {
                seat.classList.add('occupied');
            }
            
            seat.addEventListener('click', function() {
                if (!this.classList.contains('occupied')) {
                    this.classList.toggle('selected');
                }
            });
            
            seatsContainer.appendChild(seat);
        }
    });
}

// Form handlers
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real app, you would send this to a server
    console.log('Login attempt with:', { email, password });
    alert('Login successful! (This is a demo)');
    closeModal(loginModal);
}

function handleRegister(e) {
    e.preventDefault();
    const firstName = document.getElementById('register-firstname').value;
    const lastName = document.getElementById('register-lastname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    const phone = document.getElementById('register-phone').value;
    
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // In a real app, you would send this to a server
    console.log('Registration with:', { firstName, lastName, email, password, phone });
    alert('Registration successful! (This is a demo)');
    closeModal(registerModal);
}

function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real app, you would send this to a server
    console.log('Contact form submitted:', { name, email, subject, message });
    alert('Thank you for your message! We will get back to you soon. (This is a demo)');
    contactForm.reset();
}

function handleBooking(e) {
    e.preventDefault();
    const name = document.getElementById('booking-name').value;
    const email = document.getElementById('booking-email').value;
    const phone = document.getElementById('booking-phone').value;
    const tickets = document.getElementById('booking-tickets').value;
    const payment = document.getElementById('booking-payment').value;
    const movie = document.getElementById('booking-movie').value;
    const showtime = document.getElementById('booking-showtime').value;
    
    // Get selected seats
    const selectedSeats = Array.from(document.querySelectorAll('.seat.selected'))
        .map(seat => seat.textContent)
        .join(', ');
    
    // Validation
    if (!name || !email || !phone || !tickets || !payment || !selectedSeats) {
        alert('Please fill in all fields and select at least one seat');
        return;
    }
    
    if (selectedSeats.split(', ').length > parseInt(tickets)) {
        alert('You have selected more seats than the number of tickets');
        return;
    }
    
    // In a real app, you would send this to a server
    console.log('Booking details:', { 
        name, 
        email, 
        phone, 
        tickets, 
        payment, 
        movie, 
        showtime, 
        seats: selectedSeats 
    });
    
    // Show confirmation
    document.getElementById('confirmation-movie').textContent = movie;
    document.getElementById('confirmation-showtime').textContent = showtime;
    document.getElementById('confirmation-seats').textContent = selectedSeats;
    document.getElementById('confirmation-email').textContent = email;
    document.getElementById('confirmation-ref').textContent = `RS-${Math.floor(Math.random() * 1000000)}`;
    
    closeModal(bookingModal);
    openModal(confirmationModal);
    
    // Reset form
    document.querySelectorAll('.seat.selected').forEach(seat => {
        seat.classList.remove('selected');
    });
    document.getElementById('booking-name').value = '';
    document.getElementById('booking-email').value = '';
    document.getElementById('booking-phone').value = '';
    document.getElementById('booking-tickets').value = '';
    document.getElementById('booking-payment').value = '';
}
