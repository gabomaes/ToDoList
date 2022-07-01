const CLAVE_LOCALSTORAGE = "lista_tareas";
document.addEventListener("DOMContentLoaded", () => {
	let tareas = [];


	const $contenedorTareas = document.querySelector("#contenedorTareas");
	$btnGuardarTarea = document.querySelector("#btnAgregarTarea");
	$inputNuevaTarea = document.querySelector("#inputNuevaTarea");


	$inputNuevaTarea.onkeyup = () => {
		if ($inputNuevaTarea.value == ""){
			$btnGuardarTarea.disabled = true;
		} else{
			$btnGuardarTarea.disabled = false;
		}

	}

	$btnGuardarTarea.onclick = () => {
		const tarea = $inputNuevaTarea.value;
		if (!tarea) {
			return;
		}
		tareas.push({
			tarea: tarea,
			terminada: false,
		});
	    $inputNuevaTarea.value = ("");
		$btnGuardarTarea.disabled = true;
		guardarTareasEnAlmacenamiento();
		refrescarListaDeTareas();
	};


	const obtenerTareasDeAlmacenamiento = () => {
		const posibleLista = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE));
		if (posibleLista) {
			return posibleLista;
		} else {
			return [];
		}
	};

	const guardarTareasEnAlmacenamiento = () => {
		localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(tareas));
	};

	const refrescarListaDeTareas = () => {
		$contenedorTareas.innerHTML = "";
		for (const [indice, tarea] of tareas.entries()) {

			const $enlaceParaEliminar = document.createElement("a");
			$enlaceParaEliminar.classList.add("enlace-eliminar");
			$enlaceParaEliminar.innerHTML = "&times;";
			$enlaceParaEliminar.href = "";
			$enlaceParaEliminar.onclick = (evento) => {
				evento.preventDefault();
				if (!confirm("¿Eliminar tarea?")) {
					return;
				}
				tareas.splice(indice, 1);

				guardarTareasEnAlmacenamiento(tareas);
				refrescarListaDeTareas();
			};

			const $checkbox = document.createElement("input");
			$checkbox.type = "checkbox";
			$checkbox.onchange = function () {
				if (this.checked) {
					tareas[indice].terminada = true;
				} else {
					tareas[indice].terminada = false;
				}
				guardarTareasEnAlmacenamiento(tareas);
				refrescarListaDeTareas();
			}


			const $span = document.createElement("span");
			$span.textContent = tarea.tarea;

			const $li = document.createElement("li");

			if (tarea.terminada) {
				$checkbox.checked = true;
				$span.classList.add("tachado");
				$enlaceParaEliminar.innerHTML = "";
			}
			$li.appendChild($checkbox);
			$li.appendChild($span);
			$li.appendChild($enlaceParaEliminar);
			$contenedorTareas.appendChild($li);
		}
	};

	tareas = obtenerTareasDeAlmacenamiento();
	refrescarListaDeTareas();


	if ($inputNuevaTarea.value == ""){
		$btnGuardarTarea.disabled = true;
	} 
});