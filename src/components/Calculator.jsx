import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import './Calculator.css';

export default function Calculator  ()  {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('0')
  const [isCalculated, setIsCalculated] = useState(false) // Estado para manejar si ya se ha calculado algo

  const handleClick = (value) => {
    if (value === '=') {
      try {
        const result = eval(input)
        setOutput(String(result)) // Mostrar el resultado
        setInput(String(result)) // Usar el resultado como nuevo input
        setIsCalculated(true); // Marcar que ya se ha calculado
      } catch (e) {
        setOutput('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setOutput('0');
      setIsCalculated(false); // Restablecer el estado del cálculo
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (isCalculated) {
        // Si se presiona un operador justo después de un cálculo
        const newInput = output + value;
        setInput(newInput);
        setOutput(newInput); // Mostrar el operador inmediatamente
        setIsCalculated(false);
      } else {
        // Continuar con la operación normalmente
        const newInput = input + value;
        setInput(newInput);
        setOutput(newInput); // Mostrar el operador inmediatamente
      }
    } else {
      if (isCalculated) {
        // Si se presiona un número justo después de un cálculo
        setInput(value);
        setOutput(value);
        setIsCalculated(false);
      } else {
        // Continuar agregando al input
        const newInput = input + value;
        setInput(newInput);
        setOutput(newInput);
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


