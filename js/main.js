$(function() {
  // Existing code for night mode
  const d = new Date();
  const hours = d.getHours();
  const night = hours >= 19 || hours <= 7; // between 7pm and 7am
  const body = document.querySelector('body');
  const toggle = document.getElementById('toggle');
  const input = document.getElementById('switch');

  if (night) {
    input.checked = true;
    body.classList.add('night');
  }

  toggle.addEventListener('click', function() {
    const isChecked = input.checked;
    if (isChecked) {
      body.classList.remove('night');
    } else {
      body.classList.add('night');
    }
  });

  // Existing code for scroll-to-top button
  const introHeight = document.querySelector('.intro').offsetHeight;
  const topButton = document.getElementById('top-button');
  const $topButton = $('#top-button');

  window.addEventListener(
    'scroll',
    function() {
      if (window.scrollY > introHeight) {
        $topButton.fadeIn();
      } else {
        $topButton.fadeOut();
      }
    },
    false
  );

  topButton.addEventListener('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  // Existing code for wave hand animation
  const hand = document.querySelector('.emoji.wave-hand');

  function waveOnLoad() {
    hand.classList.add('wave');
    setTimeout(function() {
      hand.classList.remove('wave');
    }, 2000);
  }

  setTimeout(function() {
    waveOnLoad();
  }, 1000);

  hand.addEventListener('mouseover', function() {
    hand.classList.add('wave');
  });

  hand.addEventListener('mouseout', function() {
    hand.classList.remove('wave');
  });

  // Existing ScrollReveal initialization
  window.sr = ScrollReveal({
    reset: false,
    duration: 600,
    easing: 'cubic-bezier(.694,0,.335,1)',
    scale: 1,
    viewFactor: 0.3,
  });

  sr.reveal('.background');
  sr.reveal('.skills');
  sr.reveal('.experience', { viewFactor: 0.2 });
  sr.reveal('.featured-projects', { viewFactor: 0.1 });
  sr.reveal('.other-projects', { viewFactor: 0.05 });

  // New code for image popup functionality
  const modal = document.getElementById("image-popup-modal");
  const modalImg = document.getElementById("modal-image");
  const captionText = document.getElementById("caption");

  // Get all elements with class="image-popup"
  const popupLinks = document.querySelectorAll(".image-popup");

  // Loop through all popup links
  popupLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Check if this link contains multiple images (like the phone project)
      const images = this.querySelectorAll("img");
      
      if (images.length > 1) {
        // For projects with multiple images (like the phone screenshots)
        modalImg.src = images[0].src;
        captionText.innerHTML = images[0].alt;
        
        // Show the modal
        modal.style.display = "block";
        
        // Add navigation for multiple images
        let currentIndex = 0;
        
        // Create navigation buttons
        const prevBtn = document.createElement("div");
        prevBtn.className = "modal-nav modal-prev";
        prevBtn.innerHTML = "❮";
        prevBtn.onclick = function() {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          modalImg.src = images[currentIndex].src;
          captionText.innerHTML = images[currentIndex].alt;
        };
        
        const nextBtn = document.createElement("div");
        nextBtn.className = "modal-nav modal-next";
        nextBtn.innerHTML = "❯";
        nextBtn.onclick = function() {
          currentIndex = (currentIndex + 1) % images.length;
          modalImg.src = images[currentIndex].src;
          captionText.innerHTML = images[currentIndex].alt;
        };
        
        modal.appendChild(prevBtn);
        modal.appendChild(nextBtn);
        
        // Add keyboard navigation
        document.onkeydown = function(e) {
          e = e || window.event;
          if (e.keyCode == '37') {
            // Left arrow
            prevBtn.click();
          } else if (e.keyCode == '39') {
            // Right arrow
            nextBtn.click();
          }
        };
        
      } else {
        // For single image projects
        const img = this.querySelector("img");
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
        modal.style.display = "block";
      }
    });
  });

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() { 
    modal.style.display = "none";
    // Remove any navigation buttons that might have been added
    const buttons = modal.querySelectorAll(".modal-nav");
    buttons.forEach(button => button.remove());
    // Reset keyboard events
    document.onkeydown = null;
  }

  // When the user clicks anywhere outside of the modal, close it
  modal.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      // Remove any navigation buttons that might have been added
      const buttons = modal.querySelectorAll(".modal-nav");
      buttons.forEach(button => button.remove());
      // Reset keyboard events
      document.onkeydown = null;
    }
  }
});