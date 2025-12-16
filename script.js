// --- BOOT SEQUENCE (STRICT 2 SECONDS) ---
const bootText = document.getElementById('boot-text');
const bootBar = document.getElementById('boot-bar');
const mainInterface = document.getElementById('main-interface');
const bootScreen = document.getElementById('boot-screen');

const strings = [
    "Initializing kernel...",
    "Loading modules...",
    "Bypassing firewalls...",
    "Access Granted."
];

// Start loading bar immediately
setTimeout(() => { 
    if(bootBar) bootBar.style.width = "100%"; 
}, 100);

// Fast typing effect
let stringIndex = 0;
let charIndex = 0;

function typeWriter() {
    if (stringIndex < strings.length) {
        if (charIndex < strings[stringIndex].length) {
            bootText.innerHTML += strings[stringIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 20); // Very fast typing
        } else {
            bootText.innerHTML += "<br>";
            stringIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 100);
        }
    }
}

typeWriter();

// HARD CUT at 2000ms
setTimeout(() => {
    if(bootScreen) {
        bootScreen.style.opacity = '0';
        mainInterface.style.opacity = '1';
        setTimeout(() => { bootScreen.style.display = 'none'; }, 500);
    }
}, 2000);



// --- IMAGE EXPAND ON CLICK ---
const htbImages = document.querySelectorAll('.htbpic');

htbImages.forEach(img => {
    img.addEventListener('click', function(e) {
        // This stops the click from triggering other things
        e.stopPropagation(); 
        
        // Toggle the class that makes it big
        this.classList.toggle('expanded');
        
        // Stacking issues of glass-shards
        const parentCard = this.closest('.cert-card');
        if(parentCard) {
            parentCard.classList.toggle('viewing-image');
        }
    });
});

// Click anywhere else to close the image
document.addEventListener('click', function() {
    const expandedImg = document.querySelector('.htbpic.expanded');
    
    if (expandedImg) {
        expandedImg.classList.remove('expanded');
        const parentCard = expandedImg.closest('.cert-card');
        if(parentCard) {
            parentCard.classList.remove('viewing-image');
        }
    }
});
// --- CONTACT FORM HANDLING (Formspree) ---

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const systemAlert = document.getElementById('system-alert');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 
        
        const data = new FormData(event.target);
        
        // Visual feedback: Change button text
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "ENCRYPTING...";
        submitBtn.style.opacity = "0.7";
        
        // Helper function to show alert
        const showAlert = (message, isError = false) => {
            systemAlert.innerText = message;
            systemAlert.classList.remove('hidden');
            
            if (isError) {
                systemAlert.classList.add('error');
            } else {
                systemAlert.classList.remove('error');
            }

            // Hide after 3 seconds
            setTimeout(() => {
                systemAlert.classList.add('hidden');
            }, 3000);
        };

        try {
            const response = await fetch(event.target.action, {
                method: contactForm.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                // SUCCESS
                showAlert(">> TRANSMISSION SUCCESSFUL <<");
                contactForm.reset(); 
            } else {
                // FORM ERROR
                const errorData = await response.json();
                let errMsg = "TRANSMISSION FAILED";
                if (Object.hasOwn(errorData, 'errors')) {
                    errMsg = errorData["errors"].map(error => error["message"]).join(", ");
                }
                showAlert(">> ERROR: " + errMsg.toUpperCase(), true);
            }
        } catch (error) {
            // NETWORK ERROR
            showAlert(">> CRITICAL ERROR: OFFLINE", true);
        } finally {
            // Reset button immediately
            submitBtn.innerText = originalBtnText;
            submitBtn.style.opacity = "1";
        }
    });
}