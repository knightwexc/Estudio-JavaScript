document.addEventListener("DOMContentLoaded", function (){
    

    const email = {
        email: "",
        asunto: "",
        mensaje: "",
        cc : ""
    };

    console.log(email)

    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector("#formulario button[type='submit']");
    const btnReset = document.querySelector("#formulario button[type='reset']");
    const spinner = document.querySelector("#spinner");
    const inputCc = document.querySelector("#cc");

    //Asignar eventos
    inputEmail.addEventListener("input", validar);  
    inputAsunto.addEventListener("input", validar);  
    inputMensaje.addEventListener("input", validar);
    inputCc.addEventListener("input", validar);

    formulario.addEventListener("submit", enviarEmail);

    btnReset.addEventListener("click", function(e) {
        e.preventDefault();

        //reiniciar el objeto
        resetFormulario();
    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add("flex");
        spinner.classList.remove("hidden");

        setTimeout(() => {
            spinner.classList.remove("flex");
            spinner.classList.add("hidden");    

            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
            alertaExito.textContent = "Mensaje Enviado"

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    }

    function validar (e) { 
        console.log(e.target.name + "--d--" + e.target.value);
        
       if(e.target.value.trim() === "" && e.target.id != "cc"){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
       }

       if((e.target.id === "email" || e.target.id === "cc" ) && !validarEmail(e.target)){
            mostrarAlerta("El email no es valido", e.target.parentElement);
            email[e.target.name] = '';
            return;
       }

       limpiarAlerta(e.target.parentElement);
       //Asignar los valores
       email[e.target.name] = e.target.value.trim().toLowerCase();

       //Comprobar el objeto de email
       comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia) {
        //Comprueba si ya existe una alerta
        activarBoton(false);
        limpiarAlerta(referencia);

        //Generar alerta en HTML
        const error = document.createElement("P");
        error.textContent = mensaje;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center")

        //Inyectar el error al formulario
        referencia.appendChild(error);
    }
    
    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector(".bg-red-600");
        if(alerta){
            alerta.remove()
        }
    }

    function validarEmail(email){
        // if (email.id == "cc" && email.value.trim() == ""){
        //     return true;
        // } 
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email.value)
        console.log(resultado)
        return resultado;
    }

    function comprobarEmail(){
        console.log(email);
        //desactiva en base a si esta vacio alguno de los valores del objeto
        if(email.email.trim() == "" || email.asunto.trim() == "" || email.mensaje.trim() == ""){
            activarBoton(false);
            return
        }
        //activa cuando no se cumple la condicion
        activarBoton(true);
    }

    function activarBoton(status){
        console.log("Me llamaron----" + status);
        status ? btnSubmit.classList.remove("opacity-50") : btnSubmit.classList.add("opacity-50");
        btnSubmit.disabled = !status;
    }

    function resetFormulario() {
        email.email = "";
        email.asunto = "";
        email.mensaje = "";

        formulario.reset();
        comprobarEmail();
    }
});
