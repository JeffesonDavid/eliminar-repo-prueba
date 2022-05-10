const templateProductos = document.querySelector('.templateProductos');
const footer = document.querySelector('footer');
const templateFactura = document.querySelector('.templateFactura');
const factura = document.querySelector('.factura');

const leyenda = document.querySelector('.leyenda');
const alertConfirm = document.querySelector('.container-accion');
let productos = [];

const AddToCart = (e) => {
	const constructor = {
		nombreProducto: e.target.dataset.producto,
		cantidad: 1,
		precio: parseFloat(e.target.dataset.precio).toFixed(2),
		marca: e.target.dataset.marca,
		descripcion: e.target.dataset.descripcion,
		img: e.target.dataset.img,
	};

	const indice = productos.findIndex(
		(item) => item.nombreProducto === constructor.nombreProducto
		// verifica si existe el objeto recien construido y dentro del array PRODUCTOS
		// ventajas: si no encuentra el objeto creado dentro del arrar, entonces devuelve -1
		//           y si lo encuentra devuelve el valor de la posición del objeto dentro del array
	);

	if (indice === -1) {
		productos.push(constructor);
	} else {
		productos[indice].cantidad++;
	}

	console.log(productos);
	mostrarCarrito();
	mostrarFactura();
};

const mostrarCarrito = () => {
	footer.textContent = '';
	const fragment = document.createDocumentFragment();

	productos.forEach((item) => {
		const clon = templateProductos.content.cloneNode(true);
		clon.querySelector('.contador').textContent = item.cantidad;
		clon.querySelector('.descripcionDelProducto').textContent = item.descripcion;
		clon.querySelector('.btnDinamicoEliminar').dataset.producto =
			item.nombreProducto;
		clon.querySelector('.btnDinamicoDisminuir').dataset.producto =
			item.nombreProducto;
		clon.querySelector('.btnDinamicoAumentar').dataset.producto =
			item.nombreProducto;

		clon.querySelector('.imgDinamica').src = item.img;
		clon.querySelector('.imgDinamica').alt = item.nombreProducto;

		fragment.appendChild(clon);
	});

	footer.appendChild(fragment);
};

const mostrarFactura = () => {
	factura.textContent = '';
	const precioUnitario = productos.map((item) => item.precio * item.cantidad);
	const precioSubtotal = precioUnitario.reduce(
		(acc, currentValue) => acc + currentValue
	);
	const iva = precioSubtotal * 0.12;

	const clon = templateFactura.content.cloneNode(true);
	clon.querySelector('.subtotal').textContent = `$${precioSubtotal.toFixed(2)}`;
	clon.querySelector('.iva').textContent = `$${iva.toFixed(2)}`;
	clon.querySelector('.final').textContent = `$${(precioSubtotal + iva).toFixed(2)}`;

	factura.appendChild(clon);
};

const eliminarDelCarrito = (e) => {
	productos = productos.filter(
		(item) => item.nombreProducto !== e.target.dataset.producto
	);

	mostrarCarrito();
	mostrarFactura();
	// console.log(productos);
};

const aumentarItems = (e) => {
	// console.log('diste click en aumentar de ', e.target.dataset.producto);
	productos = productos.map((item) => {
		if (item.nombreProducto === e.target.dataset.producto) {
			item.cantidad++;
		}

		return item;
	});
	mostrarCarrito();
	mostrarFactura();
	console.log(productos);
};

const disminuirItems = (e) => {
	// console.log('diste click en disminuir de ', e.target.dataset.producto);
	productos = productos.filter((item) => {
		if (item.nombreProducto === e.target.dataset.producto) {
			if (item.cantidad > 0) {
				item.cantidad--;
				if (item.cantidad === 0) return;
			}
			return item;
		}
		return item;
	});
	mostrarCarrito();
	mostrarFactura();
	console.log(productos);
};

const finalizarCompra = (e) => {
	const confimacion = confirm('Está seguro que desea finalizar su compra');

	if (confimacion) {
		// Al finalizar la compra se vacia el carrito
		productos.splice(0, productos.length);
	} else {
		productos = productos;
	}
	mostrarCarrito();
	mostrarFactura();
	console.log(productos);
};

// TODOS LOS EVENTOS CLICK DEL FOOTER

document.addEventListener('click', (e) => {
	if (e.target.matches('.btnComprar')) {
		console.log('diste click en comprar');
		AddToCart(e);
	}

	if (e.target.matches('.btnDinamicoEliminar')) {
		console.log('diste click en el boton eliminar');

		alertConfirm.style.display = 'flex';
	}

	if (e.target.matches('.btnDinamicoAumentar')) {
		aumentarItems(e);
	}

	if (e.target.matches('.btnDinamicoDisminuir')) {
		console.log('diste click en el boton disminuir');

		disminuirItems(e);
	}

	if (e.target.matches('.finalizarCompra')) {
		console.log('diste click en finalizar compra');
		finalizarCompra(e);
	}

	if (e.target.matches('.container-accion')) {
		console.log('diste click en lo oculto');
		alertConfirm.style.display = 'none';
	}

	if (e.target.matches('.btn-danger')) {
		console.log('diste click en confirmar');

		// alertConfirm.style.display = 'none';
		eliminarDelCarrito(e);
	}

	if (e.target.matches('.btn-primary')) {
		console.log('diste click en cancelar');
		alertConfirm.style.display = 'none';
	}
});
