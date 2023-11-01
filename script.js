document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessages = document.querySelectorAll(".welcome-text");
    let currentIndex = 0;

    function fadeInNextMessage() {
        if (currentIndex < welcomeMessages.length) {
            let currentMessage = welcomeMessages[currentIndex];
            currentMessage.style.display = "block";
            currentMessage.style.opacity = 0;

            // Fade in
            let fadeInInterval = setInterval(function () {
                currentMessage.style.opacity = (parseFloat(currentMessage.style.opacity) + 0.05).toString();
                if (parseFloat(currentMessage.style.opacity) >= 1) {
                    clearInterval(fadeInInterval);
                    setTimeout(fadeOutCurrentMessage, 100); // Show each message for 2 seconds
                }
            }, 100);

            currentIndex++;
        } else {
            // All messages displayed, hide the overlay
            document.getElementById("overlay").style.display = "none";
            document.getElementById("main-content").style.display = "block"; // Show the main content
        }
    }

    function fadeOutCurrentMessage() {
        let currentMessage = welcomeMessages[currentIndex - 1];

        // Fade out
        let fadeOutInterval = setInterval(function () {
            currentMessage.style.opacity = (parseFloat(currentMessage.style.opacity) - 0.05).toString();
            if (parseFloat(currentMessage.style.opacity) <= 0) {
                clearInterval(fadeOutInterval);
                setTimeout(fadeInNextMessage, 1000); // Wait for 1 second before the next message
            }
        }, 100);
    }

    fadeInNextMessage(); // Start the animation
});


/*scroll-button-news-section*/
const container = document.querySelector('.scrollable-container');
const subSections = document.querySelector('.sub-sections');
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');
scrollLeftBtn.addEventListener('click', () => {
    container.scrollBy({
        left: -300, // Set the scroll width based on your sub-section width
        behavior: 'smooth',
    });
});
scrollRightBtn.addEventListener('click', () => {
    container.scrollBy({
        left: 300, // Set the scroll width based on your sub-section width
        behavior: 'smooth',
    });
});


/*sidebar*/
var sidebar = document.getElementById("mySidebar");
sidebar.style.width = "0";
function openNav() {
    sidebar.style.width = "250px";
}
function closeNav() {
    sidebar.style.width = "0";
}


/*submenu*/
const submenu = document.querySelector('.submenu');
submenu.addEventListener('click', () => {
    submenu.classList.toggle('active');
});


var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};



document.addEventListener("DOMContentLoaded", function() {
    const currentDate = new Date();
    const currentMonthYearElement = document.getElementById("current-month-year");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const prevYearButton = document.getElementById("prev-year");
    const nextYearButton = document.getElementById("next-year");
    const calendarDateElement = document.querySelector(".calendar__date");

    // Function to update the calendar with the specified date
    function updateCalendar(date) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const year = date.getFullYear();
        const month = date.getMonth();
        currentMonthYearElement.textContent = months[month] + " " + year;

        // Clear the existing calendar days and numbers
        calendarDateElement.innerHTML = '';

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay();

        // Generate and display the days of the month
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("calendar__number");
            calendarDateElement.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const calendarDay = document.createElement("div");
            calendarDay.classList.add("calendar__number");
            calendarDay.textContent = day;
            calendarDateElement.appendChild(calendarDay);
        }
    }

    // Initialize the calendar with the current date
    updateCalendar(currentDate);

    // Event listeners to switch to the previous or next month or year
    prevMonthButton.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar(currentDate);
    });

    nextMonthButton.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar(currentDate);
    });

    prevYearButton.addEventListener("click", function() {
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        updateCalendar(currentDate);
    });

    nextYearButton.addEventListener("click", function() {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        updateCalendar(currentDate);
    });
});

// JavaScript to handle FAQ animations
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    question.classList.toggle('active');

    // Toggle answer visibility with animation
    const answer = question.querySelector('.answer');
    if (question.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      question.querySelector('.toggle-button').textContent = '1';
    } else {
      answer.style.maxHeight = 0;
      question.querySelector('.toggle-button').textContent = '0';
    }
  });
});

function animateNumbersWhenVisible() {
  const numbers = document.querySelectorAll('.number');

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // Adjust this threshold value as needed
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const number = entry.target;
        const finalCount = parseInt(number.getAttribute('data-count'));
        let count = 0;
        const increment = finalCount / 1000; // Adjust this increment value

        const updateCount = () => {
          if (count < finalCount) {
            count += increment;
            number.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            number.innerText = finalCount;
          }
        };

        updateCount();
        observer.unobserve(number);
      }
    });
  }, options);

  numbers.forEach((number) => {
    observer.observe(number);
  });
}

animateNumbersWhenVisible();

