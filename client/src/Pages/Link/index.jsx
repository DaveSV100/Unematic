import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
// import Layout from '../../Components/Layout';
import './styles.css';

const Link = () => {
  // State to decide whether to display the submission form or the confirmation message.
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  // Track only the inputs the user fills in:
  const [formData, setFormData] = useState({
    nombre: '',
    calleYNumero: '',
    fecha: '',
    aclaraciones: '',
    email: '',
  });

  // State for button loading and modal visibility.
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Ref for the signature canvas.
  const sigCanvas = useRef({});

  // On mount, check for the saleSubmitted flag.
  useEffect(() => {
    if (localStorage.getItem('saleSubmitted') === 'true') {
      setAlreadySubmitted(true);
    }
  }, []);

  // Update formData for the basic inputs.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form submission handler – include default values for missing backend fields.
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const signature = sigCanvas.current.isEmpty()
      ? null
      : sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');

    // Build complete data object with defaults for required backend fields.
    const dataToSubmit = {
      // Fields provided by the user:
      nombre: formData.nombre,
      calleYNumero: formData.calleYNumero,
      fecha: formData.fecha,
      firmadigital: signature,
      aclaraciones: formData.aclaraciones,
      email: formData.email,
      // Default values so that backend validation passes:
      ciudad: "", // Not provided by form; using an empty string
      estado: "", // Not provided by form; using an empty string
      products: [
        {
          producto: "Precio de promoción: $11,690",
          product_id: null,
          serial_number: "",
          quantity: 1,
          unitPrice: 11690,
          totalProductPrice: 11690,
        },
      ],
      formaDePago: "Contado",
      enganche: 0,
      precioNormal: 0,
      precioPromocion: 11690,
      discount: 0,
      plazo: "0 days",
      fechaVencimiento: formData.fecha,
      sucursal: "",
      agenteDeVentas: "",
      phone: null,
      status: "por entregar",
    };

    console.log('Data to be sent to the backend:', dataToSubmit);

    fetch('https://api.huastex.com/sales/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSubmit),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setIsLoading(false);
        // Mark the sale as submitted.
        localStorage.setItem('saleSubmitted', 'true');
        setShowModal(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  // Clear signature canvas.
  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  // Handler for modal close that then triggers a redirect.
  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = 'https://dev.huastex.com';
  };

  // If the sale was already submitted, show a confirmation message.
  if (alreadySubmitted) {
    return (
      <div>
        <h1>Órden #278</h1>
        <p>Tus datos han sido enviados correctamente ✅</p>
        <button
          onClick={() => {
            window.location.href = 'https://dev.huastex.com';
          }}
          className="page-button"
        >
          Ir a página informativa
        </button>
      </div>
    );
  }

  // Otherwise, render the form.
  return (
    <div>
      <div className="text-data">
        <h1>Órden #278</h1>
        <h2>Sistema:</h2>
        <p>WebApp de centro podológico</p>
        <h2>Descripción:</h2>
        <p>
          Base de datos de: Historial clínico, datos de pacientes, carta de consentimiento informado,
          bitácora de pacientes, bitácora de controles biológicos de esterilizador, bitácora de
          desinfección de superficies, bitácora de limpieza, bitácora de monitoreo de cloro residual.
          Las bases de datos estarán en el sitio y se podrá visualizar en cualquier dispositivo desde
          el navegador.
          <br />
          <br />
          Posibilidad de generar firmas, guardar firmas en formato de imagen y exportar en pdf carta de
          consentimiento para poder imprimirse.
          10 cuentas de usuarios para iniciar sesión, con permisos de “administador” y “personal de trabajo”.
          Servidor remoto para que los datos queden en la nube.
        </p>
        <h2>Términos y condiciones</h2>
        <ol>
          <li>
            - El pago inicial es de <strong>$5,000</strong> cuyo pago tendría que realizarse antes del
            17 de abril de 2025
          </li>
          <li>- El costo de entrega del proyecto es de <strong>$6,890</strong></li>
          <li>
            - Costo mensual por servidor remoto y soporte: <strong>$589</strong>
          </li>
          <li>
            - El costo mensual sería cada día 26 de mes a empezar en el mes de la entrega del proyecto
          </li>
          <li>- Después de cada 12 meses el costo mensual puede variar dependiendo del uso</li>
          <li>
            - El costo de renovación al año es de <strong>$3,950</strong>
          </li>
          <li>- Una vez dando el pago inicial, no es reembolsable</li>
          <li>- Se puede cancelar el servicio en cualquier mes sin penalización alguna</li>
          <li>
            - Si al cancelar requieren servicio de exporte de datos parcial en hojas de cálculo (excel o
            google sheets) para uso fuera de la nube, el costo será de $4,900
          </li>
          <li>
            *Los precios son sin IVA ya que se mencionó que no se requiere factura; en caso de necesitar
            facturación, favor de comunicarse a contacto@huastex.com
          </li>
        </ol>
      </div>

      <div className="final-data">
        <p>
          Fecha de entrega: <strong>12 de junio de 2025</strong>
        </p>
        <p>
          <strong>Resumen de total a pagar para empezar a usar en la fecha de entrega la WebApp:
            $11,690
          </strong>
        </p>
      </div>
      <form className="form-link" onSubmit={handleSubmit}>
        <p className="firm">
          Si estás de acuerdo con los términos y condiciones, favor de llenar los siguientes datos,
          firmar y dar click en guardar:
        </p>
        {/* Nombre Input */}
        <div className="form-group">
          <label>Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Calle y número Input */}
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="calleYNumero"
            value={formData.calleYNumero}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Fecha Input */}
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
            required
          />
        </div>

{/* Aclaraciones Input */}
<div className="form-group">
          <label>Razón social para comprobante:</label>
          <input
            name="aclaraciones"
            value={formData.aclaraciones}
            onChange={handleInputChange}
          />
        </div>

        {/* Email Input */}
        <div className="form-group">
          <label>Correo de contacto:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        

        {/* Firma Digital */}
        <div className="form-group">
          <label>Firma Digital</label>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ width: 300, height: 200, className: 'sigCanvas' }}
          />
          <button type="button" className="clear-button" onClick={clearSignature}>
            Limpiar Firma
          </button>
        </div>

        <button type="submit" className="save-button" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>

      {/* Modal Overlay */}
      {showModal && (
        <div className="modal-overlay" style={modalOverlayStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <p>Tus datos han sido enviados correctamente ✅</p>
            <p>Se te redirigirá a la página informativa 🚀</p>
            <button onClick={handleCloseModal} style={modalButtonStyle}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles for modal (you may also move these to styles.scss)
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  textAlign: 'center',
  maxWidth: '90%',
};

const modalButtonStyle = {
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  fontSize: '1rem',
};

export default Link;
