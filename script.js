'use strict';

/* ================= SLIDESHOW ================= */
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slideshow-container .slide');
  if (!slides.length) return;

  let current = 0;
  slides[current].classList.add('active');

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
});

/* ================= FIXED HEADER ================= */
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 50);
});

/* ================= FOOD FILTER ================= */
const dietFilter = document.getElementById('dietFilter');
const cuisineFilter = document.getElementById('cuisineFilter');

function filterMenu() {
  document.querySelectorAll('.menu-card').forEach(card => {
    const diet = card.dataset.diet || '';
    const cuisine = card.dataset.cuisine || '';

    const dietMatch = !dietFilter || dietFilter.value === 'All' || diet.includes(dietFilter.value);
    const cuisineMatch = !cuisineFilter || cuisineFilter.value === 'All' || cuisine === cuisineFilter.value;

    card.style.display = dietMatch && cuisineMatch ? 'block' : 'none';
  });
}

dietFilter?.addEventListener('change', filterMenu);
cuisineFilter?.addEventListener('change', filterMenu);

/* ================= PHOTOGRAPHY TABS ================= */
window.openCity = function (evt, tabId) {
  document.querySelectorAll('.photo-cards, .photobooth').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab button').forEach(b => b.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  evt.currentTarget.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.tab button')?.click();
});

/* ================= DINING TABS ================= */
document.querySelectorAll('.spaces li').forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.id;
    document.querySelectorAll('.spaces li').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    document.querySelectorAll('.content').forEach(c => {
      c.style.display = c.dataset.id === id ? 'block' : 'none';
    });
  });
});

/* ================= BEER FILTER ================= */
window.filterBeers = function () {
  const value = document.getElementById('filterType')?.value.toLowerCase() || 'all';
  document.querySelectorAll('.beer-card').forEach(card => {
    card.style.display =
      value === 'all' || card.dataset.type.toLowerCase() === value
        ? 'block'
        : 'none';
  });
};

document.addEventListener('DOMContentLoaded', filterBeers);

/* ================= BEVERAGE FILTER ================= */
window.filterBeverages = function () {
  const type = document.getElementById('beverageType').value;
  document.querySelectorAll('#beverageGrid .menu-card').forEach(card => {
    card.style.display = type === 'All' || card.dataset.type === type ? 'block' : 'none';
  });
};

/* ================= MENU TABS ================= */
window.showTab = function (evt, tabId) {
  document.querySelectorAll('.food, .beverages').forEach(tab => (tab.style.display = 'none'));
  document.querySelectorAll('.tabclick1').forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).style.display = 'block';
  evt.currentTarget.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.tabclick1')?.click();
});

/* ================= TABLE RESERVATION ================= */
document.getElementById('reservationForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;

  alert(
    `Reservation Confirmed!\n\nThank you, ${f.name.value}.\nYour reservation for ${f.guests.value} at ${f.time.value} on ${f.date.value} has been received.`
  );

  f.reset();
});

/* ================= EVENTS FILTER ================= */
function filterEvents() {
  const type = document.getElementById('eventType').value;
  const date = document.getElementById('eventDate').value;
  const inputDate = date ? new Date(date).toDateString() : null;

  document.querySelectorAll('.event-card').forEach(card => {
    const tag = card.querySelector('.tag')?.classList[1];
    let matchesDate = true;

    if (inputDate) {
      const match = card.textContent.match(/([A-Za-z]+)\s(\d{1,2}),\s(\d{4})/);
      if (match) {
        matchesDate =
          new Date(`${match[1]} ${match[2]}, ${match[3]}`).toDateString() === inputDate;
      } else {
        matchesDate = false;
      }
    }

    card.style.display =
      (type === 'all' || tag === type) && matchesDate ? 'block' : 'none';
  });
}

document.getElementById('eventType')?.addEventListener('change', filterEvents);
document.getElementById('eventDate')?.addEventListener('change', filterEvents);

/* ================= CONTACT FORM ================= */
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  alert(
    `Your message has been sent!\n\nName: ${name.value}\nEmail: ${email.value}\nMessage: ${message.value}`
  );
  e.target.reset();
});

/* ================= ROOM BOOKING ================= */
document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.getElementById('roomFilterForm');
  const guestSection = document.getElementById('guestInfoSection');
  const guestForm = document.getElementById('guestInfoForm');

  let selectedRoom = '';

  /* ---------- FILTER ROOMS ---------- */
  filterForm.addEventListener('submit', e => {
    e.preventDefault();

    const nights = +document.getElementById('nights').value;
    const adults = +document.getElementById('adults').value;
    const children = +document.getElementById('children').value;

    document.querySelectorAll('.room-card').forEach(room => {
      const maxAdults = +room.dataset.maxAdults;
      const maxChildren = +room.dataset.maxChildren;
      const minNights = +room.dataset.minNights;

      const match =
        adults <= maxAdults &&
        children <= maxChildren &&
        nights >= minNights;

      room.style.display = match ? 'block' : 'none';
    });

    guestSection.style.display = 'none';
  });

  /* ---------- BOOK NOW CLICK ---------- */
  document.querySelectorAll('.room-card a').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();

      selectedRoom = btn.closest('.room-card')
        .querySelector('h3').textContent;

      guestSection.style.display = 'block';
      guestSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- GUEST FORM SUBMIT ---------- */
  guestForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const phone = document.getElementById('guestPhone').value;

    const checkin = document.getElementById('checkin').value;
    const nights = document.getElementById('nights').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;

    alert(
`🏨 Booking Confirmed!

Room: ${selectedRoom}
Check-in: ${checkin}
Nights: ${nights}
Adults: ${adults}
Children: ${children}

Guest Name: ${name}
Email: ${email}
Phone: ${phone}`
    );

    guestForm.reset();
    filterForm.reset();
    guestSection.style.display = 'none';
  });
});


/* ================= PHOTO BOOKING ================= */
let selectedPackage = '';

document.querySelectorAll('.book-btn, .reserve-button').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    selectedPackage =
      btn.closest('.photo-card')?.querySelector('h3')?.textContent || 'Photobooth';
    document.getElementById('photoGuestInfoSection').style.display = 'block';
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const guestSection = document.getElementById('photoGuestInfoSection');
  const guestForm = document.getElementById('photoGuestForm');

  let selectedPackage = '';

  /* ---------- CLICK: BOOK NOW (PHOTOGRAPHY PACKAGES) ---------- */
  document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();

      const card = button.closest('.photo-card');
      selectedPackage = card.querySelector('h3').textContent;

      openGuestForm();
    });
  });

  /* ---------- CLICK: PHOTObooth ---------- */
  document.querySelector('.reserve-button')?.addEventListener('click', e => {
    e.preventDefault();
    selectedPackage = 'Self-Service Photobooth';
    openGuestForm();
  });

  /* ---------- SHOW & SCROLL ---------- */
  function openGuestForm() {
    guestSection.style.display = 'block';
    guestSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  /* ---------- SUBMIT GUEST INFO ---------- */
  guestForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('photoGuestName').value;
    const email = document.getElementById('photoGuestEmail').value;
    const phone = document.getElementById('photoGuestPhone').value;

    alert(
`📸 Photography Booking Confirmed!

Package: ${selectedPackage}

Name: ${name}
Email: ${email}
Phone: ${phone}`
    );

    guestForm.reset();
    guestSection.style.display = 'none';
  });
});

