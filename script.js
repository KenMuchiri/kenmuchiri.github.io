document.addEventListener('DOMContentLoaded', function () {
    const profileImg = document.querySelector('.profile-img');

    // Function to start the walking animation
    function startWalking() {
        profileImg.classList.add('walking');
    }

    // Function to stop the walking animation
    function stopWalking() {
        profileImg.classList.remove('walking');
    }

    // Event listeners for mouse and touch events
    profileImg.addEventListener('mouseover', startWalking);
    profileImg.addEventListener('mouseout', stopWalking);
    profileImg.addEventListener('touchstart', startWalking);
    profileImg.addEventListener('touchend', stopWalking);
});



document.addEventListener('DOMContentLoaded', function () {
    const profileImg = document.querySelector('.profile-img-classical');

    // Function to start the dancing animation
    function startDancing() {
        profileImg.classList.add('dancing');
    }

    // Function to stop the dancing animation
    function stopDancing() {
        profileImg.classList.remove('dancing');
    }

    // Set up the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startDancing();
            } else {
                stopDancing();
            }
        });
    }, {
        threshold: 0.5 // Adjust the threshold to control when the animation starts
    });

    // Start observing the profile image
    observer.observe(profileImg);
});

