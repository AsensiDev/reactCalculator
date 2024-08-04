import React, { useState } from 'react'
import Button from './Button'
import Display from './Display'
import './Calculator.css'

const Calculator = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('0') // Inicializa con '0'

  const handleClick = (value) => {
    if (value === '=') {
      if(output) {
        try {
          setInput(output)
          setOutput(eval(input))
        } catch {
          setOutput('Error')
        }
      } else {
        try {
          setOutput(eval(input)); // Nota: Usar eval puede ser peligroso en producción
        } catch (e) {
          setOutput('Error');
        }
        setInput(eval(input))
      }
      
      
    } else if (value === 'C') {
      setInput('');
      setOutput('0'); // Restablece el output a '0' cuando se limpia
    }else {
      if (input === '' && value === '0') return; // Evita que el input empiece con '0'
      setInput(input + value);
      if (value === '0' && input === '') {
        setOutput('0'); // Muestra '0' cuando el input está vacío
      } else {
        setOutput(input + value);
      }
    }
  };

  const buttons = [
    'C', '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '=', '+'
  ];

  return (
    <div className="calculator">
      <Display value={output} />
      <div className="buttons">
        {buttons.map(button => (
          <Button key={button} value={button} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;