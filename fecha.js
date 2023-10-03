
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById("current_date").innerHTML = new Date().toLocaleDateString('es-ES', options);