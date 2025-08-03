import { useContext, useRef, useState, useEffect } from 'react';
import { ColorSchemeContext } from '../../Context/ColorSchemeProvider';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import us from '../../assets/snow2.jpg';

import './App.css';

const Email = () => {
  const form = useRef();
  const [formValues, setFormValues] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const isFormValid = () => {
    return formValues.user_name && formValues.user_email && formValues.message;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setErrorMessage('Por favor llena los campos');
      setShowError(true);
      return;
    }

    emailjs
      .sendForm('service_hsvkjua', 'template_dng1yma', form.current, 'ZUpCSmwiCyTvl-B8J')
      .then(
        () => {
          console.log('Correo enviado!');
          setIsSubmitted(true);
          setErrorMessage('');
          setShowError(false);
          e.target.reset();
          setFormValues({
            user_name: '',
            user_email: '',
            message: '',
          });
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 6000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
    }
  }, [isSubmitted]);
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 6000); // 6 seconds

      return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
    }
  }, [showError]);


  const colorScheme = useContext(ColorSchemeContext);

  return (
    <div className={`form-background ${colorScheme}`}>
      <div className={`contact ${colorScheme}`}>
        <div className={`contact-form ${colorScheme}`}>
          <StyledContactForm>
            <div id='contact' className='contact-form_inputs'>
              <form ref={form} onSubmit={sendEmail}>
                <label>Nombre</label>
                <input type="text" name="user_name" value={formValues.user_name} onChange={handleInputChange} />
                <label>Correo</label>
                <input type="email" name="user_email" value={formValues.user_email} onChange={handleInputChange} />
                <label>Mensaje</label>
                <textarea name="message" value={formValues.message} onChange={handleInputChange} />
                <input type="submit" value="Contáctanos" />
              </form>
              {isSubmitted && <p className="reply-message success">Tu correo ha sido enviado ✅</p>}
              {showError && <p className="reply-message error">{errorMessage}</p>}
            </div>
          </StyledContactForm>
        </div>
        <div className='contact-img'>
          <img src={us} alt="Hombre y robot" />
        </div>
      </div>
    </div>
  );
};

export default Email;

// Styles
const StyledContactForm = styled.div`
  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 500px;
    min-width: 300px;
    font-size: 1rem;

    input {
      color: black;
      width: 95%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      color: black;
      max-width: 95%;
      min-width: 95%;
      width: 95%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      padding-left: 1rem;
      margin-top: 1rem;
      text-align: left;
      width: 100%;
    }

    input[type="submit"] {
      margin-top: 2rem;
      margin-bottom: 2rem;
      cursor: pointer;
      background: #9e8912;
      color: white;
      border: none;
    }
    input[type="submit"]:hover {
      background: #3f340d;
    }
    input[type="submit"]:active {
      background: #0E446A;
    }
  }

  .reply-message {
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }

  .success {
    color: green;
  }

  .error {
    color: #F22A0A;
  }
`;

