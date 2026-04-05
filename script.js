// Odotetaan, että DOM on täysin ladattu ennen skriptin suoritusta
document.addEventListener('DOMContentLoaded', () => {
    
    // Haetaan kaikki napit/linkit, jotka vaihtavat näkymää
    const triggers = document.querySelectorAll('.nav-trigger');
    const views = document.querySelectorAll('.view');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Estetään oletustoiminto (esim. jos kyseessä olisi a-tagi)
            e.preventDefault(); 
            
            // Haetaan data-target attribuutin arvo (esim. "home" tai "projects")
            const targetId = trigger.getAttribute('data-target');
            
            if (!targetId) return; // Turvatoimi, jos attribuutti puuttuu

            // Piilotetaan kaikki näkymät
            views.forEach(view => {
                view.classList.remove('active-view');
                view.classList.add('hidden-view');
            });

            // Näytetään haluttu näkymä
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.remove('hidden-view');
                targetView.classList.add('active-view');
                
                // Vieritetään sivun yläreunaan pehmeästi näkymän vaihtuessa
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                console.error(`Näkymää ID:llä ${targetId} ei löytynyt.`);
            }
        });
    });
});